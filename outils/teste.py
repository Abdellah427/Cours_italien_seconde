"""Teste toute l'application dans un navigateur à 390 px : chaque exercice de chaque chapitre (pièges, signe, bonne réponse),
l'entraînement et le contrôle recalculés à partir de l'énoncé affiché, la navigation, les langues, le débordement.
Usage : python3 outils/teste.py (après outils/assemble.py). Nécessite playwright et node.
Si le navigateur de playwright n'est pas à l'endroit habituel : CHROMIUM=/chemin/vers/chromium python3 outils/teste.py"""
import re, json, math, subprocess, sys, os, glob
from fractions import Fraction
from playwright.sync_api import sync_playwright
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(R, 'autonome', 'scolair-maths-seconde.html')
fails, errs, info = [], [], []
def chk(c, m):
    if not c: fails.append(m)
def norm(s): return s.replace('\u00a0', ' ').replace('\u202f', ' ').replace('\u2212', '-').strip()
def frnum(x, d):
    v = math.floor(abs(x) * 10 ** d + 0.5) / 10 ** d
    s = ('%.' + str(d) + 'f') % v
    if '.' in s: s = s.rstrip('0').rstrip('.')
    return ('-' if x < 0 and v != 0 else '') + s.replace('.', ',')
def dec(tol):
    for d, lim in ((0, .5), (1, .05), (2, .005), (3, .0005)):
        if tol >= lim: return d
    return 4
def num(s): return float(norm(s).replace(' ', '').replace(',', '.'))

# Données des exercices de tous les chapitres, lues avec Node
FICHIERS = sorted(f for f in glob.glob(os.path.join(R, 'src', 'ch*', '*.js')) if not f.endswith('chapitre.js'))
data = json.loads(subprocess.check_output(['node', '-e',
    "const fs=require('fs'),vm=require('vm');const c={EXOS:[]};vm.createContext(c);"
    "for(const f of " + json.dumps(FICHIERS) + "){vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f})}"
    "process.stdout.write(JSON.stringify(c.EXOS))"]))
for e in data: e.setdefault('ch', 'c10')

# ---------- Chapitre 10 : recalcul à partir de l'énoncé affiché ----------
def tr_c10(pg, card):
    fr = norm(card.query_selector('.qtext .fr').inner_text())
    v, s = tr_c10_valeur(fr)
    return None if v is None else ('nombre', v)

def tr_c10_valeur(fr):
    m = re.search(r"^(Augmenter|Diminuer) une quantité de ([\d,]+) % revient", fr)
    if m: t = num(m[2]) * (1 if m[1] == 'Augmenter' else -1); return 1 + t / 100, 'abs'
    m = re.search(r"^Multiplier une quantité par ([\d,]+) revient", fr)
    if m: return (num(m[1]) - 1) * 100, 'strict'
    m = re.search(r"^Un prix passe de ([\d ,]+) € à ([\d ,]+) €", fr)
    if m: a, b = num(m[1]), num(m[2]); return (b - a) / a * 100, 'strict'
    m = re.search(r"^Un article coûte ([\d ,]+) €\. Son prix (augmente|diminue) de ([\d,]+) %, puis (augmente|diminue) de ([\d,]+) %", fr)
    if m:
        c = (1 + num(m[3]) / 100 * (1 if m[2] == 'augmente' else -1)) * (1 + num(m[5]) / 100 * (1 if m[4] == 'augmente' else -1))
        return num(m[1]) * c, 'abs'
    m = re.search(r"TTC d’un objet est ([\d ,]+) €", fr)
    if m: return num(m[1]) / 1.2, 'abs'
    m = re.search(r"^Après une (baisse|hausse) de ([\d,]+) %, un article coûte ([\d ,]+) €", fr)
    if m: return num(m[3]) / (1 + num(m[2]) / 100 * (-1 if m[1] == 'baisse' else 1)), 'abs'
    rates = [(1 if w == 'augmente' else -1) * num(v) for w, v in re.findall(r"(augmente|diminue) de ([\d,]+) %", fr)]
    if 'réciproque' in fr: c = 1 + rates[0] / 100; return (1 / c - 1) * 100, 'strict'
    if 'revenir à sa valeur initiale' in fr: c = 1 + rates[0] / 100; return abs(1 / c - 1) * 100, 'abs'
    if 'global' in fr:
        c = 1
        for t in rates: c *= 1 + t / 100
        return (c - 1) * 100, 'strict'
    return None, None

def qcm_c10(pg, q, fr):
    fr = norm(fr)
    m = re.search(r"augmentation de (\d+) % suivie d’une diminution de (\d+) %", fr)
    if m: T = ((1 + int(m[1]) / 100) * (1 - int(m[2]) / 100) - 1) * 100; return ('+' if T > 1e-9 else '') + frnum(T, 2) + ' %'
    m = re.search(r"^Diminuer une quantité de (\d+) % revient", fr)
    if m: return frnum(1 - int(m[1]) / 100, 2)
    m = re.search(r"réciproque d’une augmentation de (\d+) %", fr)
    if m: tr = (1 / (1 + int(m[1]) / 100) - 1) * 100; return frnum(round(tr, 1), 1) + ' %'
    m = re.search(r"a diminué de (\d+) %\. Pour revenir", fr)
    if m: return frnum((1 / (1 - int(m[1]) / 100) - 1) * 100, 1) + ' %'
    m = re.search(r"^Après une (hausse|baisse) de (\d+) %, un prix vaut ([\d ,]+) €", fr)
    if m: return frnum(num(m[3]) / (1 + int(m[2]) / 100 * (1 if m[1] == 'hausse' else -1)), 2) + ' €'
    m = re.search(r"augmente de (\d+) %, puis diminue de (\d+) %, puis augmente de (\d+) %", fr)
    if m: return frnum((1 + int(m[1]) / 100) * (1 - int(m[2]) / 100) * (1 + int(m[3]) / 100), 4)
    if fr.startswith('Deux évolutions sont réciproques'): return 'leur coefficient multiplicateur global est égal à 1'
    m = re.search(r"^Un prix passe de ([\d ,]+) € à ([\d ,]+) €", fr)
    if m: a, b = num(m[1]), num(m[2]); t = (b - a) / a * 100; return ('+' if t > 0 else '') + frnum(t, 2) + ' %'
    m = re.search(r"^Multiplier une quantité par ([\d,]+) revient", fr)
    if m:
        c = num(m[1]); t = abs(c - 1) * 100
        return ('augmenter de ' if c > 1 else 'diminuer de ') + frnum(t, 2) + ' %'
    return None

# ---------- Chapitre 3 : recalcul à partir des formules affichées ----------
# Les formules sont en HTML. On les lit dans la page sous forme de texte : a/b devient ((a)/(b)), une racine sqrt(a),
# un exposant ^(n), une case à remplir #0, #1... (précédée de ± si elle a un bouton de signe). L'italien n'est pas lu.
LIN = """(root) => {
  function K(n){ return [...n.childNodes].map(L).join(''); }
  function L(n){
    if (n.nodeType === 3) return n.nodeValue;
    if (n.nodeType !== 1) return '';
    const c = n.classList;
    if (c.contains('it')) return '';
    if (n.tagName === 'SUP') return '^(' + K(n) + ')';
    if (c.contains('frac')) return '((' + L(n.children[0]) + ')/(' + L(n.children[1]) + '))';
    if (c.contains('sqrt')) return 'sqrt(' + K(n) + ')';
    if (n.tagName === 'INPUT') return '#' + n.dataset.b;
    if (n.tagName === 'BUTTON') return c.contains('sgn') ? '±' : '';
    return K(n);
  }
  return L(root);
}"""
def lin(pg, el):
    """Texte linéaire d'un élément : signes ASCII, plus d'espaces insécables (ni de séparateurs de milliers)."""
    s = pg.evaluate(LIN, el)
    s = re.sub(r'(?<=\d)[\u00a0\u202f](?=\d)', '', s)      # séparateur de milliers
    for a, b in (('\u00a0', ' '), ('\u202f', ' '), ('\u2212', '-'), ('×', '*'), ('÷', '/'), (',', '.')): s = s.replace(a, b)
    return re.sub(r'\s+', ' ', s).strip()
def clean(s): return s.replace(' ', '').replace('\u00a0', '').replace('\u2212', '-')

class Calcul:
    """Petit évaluateur d'expressions : + - * / ^, parenthèses, sqrt, multiplication implicite (3x, 2(x + 1), (a)(b))."""
    def __init__(self, s, x=None):
        s = s.replace('[', '(').replace(']', ')')        # dans un calcul, les crochets sont de grandes parenthèses
        self.t = re.findall(r'\d+(?:\.\d+)?|sqrt|[x()+\-*/^]', s)
        if ''.join(self.t) != s.replace(' ', ''): raise ValueError('expression illisible : ' + s)
        self.i = 0; self.x = x
    def peek(self): return self.t[self.i] if self.i < len(self.t) else None
    def take(self): self.i += 1; return self.t[self.i - 1]
    def expr(self):
        v = self.term()
        while self.peek() in ('+', '-'):
            v = v + self.term() if self.take() == '+' else v - self.term()
        return v
    def term(self):
        v = self.factor()
        while True:
            p = self.peek()
            if p == '*': self.take(); v = v * self.factor()
            elif p == '/': self.take(); v = v / self.factor()
            elif p is not None and (p == '(' or p == 'x' or p == 'sqrt' or p[0].isdigit()): v = v * self.power()
            else: return v
    def factor(self):
        if self.peek() == '-': self.take(); return -self.factor()
        if self.peek() == '+': self.take(); return self.factor()
        return self.power()
    def power(self):
        v = self.primary()
        if self.peek() == '^':
            self.take(); e = self.factor()
            if isinstance(e, Fraction) and e.denominator == 1 and isinstance(v, Fraction): v = v ** int(e)
            else: v = float(v) ** float(e)
        return v
    def primary(self):
        p = self.take()
        if p == '(':
            v = self.expr()
            if self.take() != ')': raise ValueError('parenthèse')
            return v
        if p == 'sqrt':
            if self.take() != '(': raise ValueError('racine')
            v = self.expr()
            if self.take() != ')': raise ValueError('parenthèse')
            r = math.isqrt(int(v)) if isinstance(v, Fraction) and v.denominator == 1 and v >= 0 else None
            return Fraction(r) if r is not None and r * r == v else math.sqrt(float(v))
        if p == 'x':
            if self.x is None: raise ValueError('x sans valeur')
            return Fraction(self.x)
        return Fraction(p)
def ev(s, x=None):
    c = Calcul(s, x); v = c.expr()
    if c.peek() is not None: raise ValueError('reste : ' + s)
    return v
def coefs(s):
    """Coefficients (a, b, c) de ax² + bx + c pour une expression du second degré au plus (vérifiés en un quatrième point)."""
    p0, p1, m1 = ev(s, 0), ev(s, 1), ev(s, -1)
    c = p0; a = (p1 + m1) / 2 - c; b = (p1 - m1) / 2
    if ev(s, 3) != 9 * a + 3 * b + c: raise ValueError('pas un polynôme de degré 2 : ' + s)
    return a, b, c
def racine_lin(s):
    """Solution de f(x) = 0 pour f du premier degré."""
    f0, f1 = ev(s, 0), ev(s, 1)
    return -f0 / (f1 - f0)
def meme(a, b): return abs(float(a) - float(b)) < 1e-9
SENS = {'<': '>', '>': '<', '≤': '≥', '≥': '≤'}
def resout_ineq(s):
    """« ax + b < c » : renvoie (symbole après résolution, valeur)."""
    m = re.match(r'^(.*?) ([<>≤≥]) (.*)$', s)
    f = '(%s) - (%s)' % (m[1], m[3]); a = ev(f, 1) - ev(f, 0); v = racine_lin(f)
    return (SENS[m[2]] if a < 0 else m[2]), v
def intervalle(sym, v):
    V = fnum(v)
    return {'<': ']-∞;%s[', '≤': ']-∞;%s]', '>': ']%s;+∞[', '≥': '[%s;+∞['}[sym] % V
def fnum(v):
    v = Fraction(v)
    return str(v.numerator) if v.denominator == 1 else None

def tr_c3(pg, card):
    typ = norm(card.query_selector('.qtype .fr').text_content())      # text_content : le texte tel qu'il est écrit, sans la mise en majuscules
    phrase = lin(pg, card.query_selector('.qtext p.fr'))
    mq = lin(pg, card.query_selector('.qtext .mq'))
    fexp = card.query_selector('.fexp')
    tpl = clean(lin(pg, fexp)) if fexp else ''
    if typ == 'Priorités': return ('nombre', ev(mq))
    if typ == 'Valeur d’une expression':
        xv = int(re.search(r'x = (-?\d+)', phrase)[1])
        return ('nombre', ev(mq, xv))
    if typ == 'Puissances':
        if phrase.startswith('Calcule'): return ('nombre', ev(mq))
        base = int(re.match(r'^=(\d+)\^\(±#0\)$', tpl)[1]); val = ev(mq)
        n = [k for k in range(-60, 61) if Fraction(base) ** k == val]
        return ('cases', [n[0]]) if len(n) == 1 else None
    if typ == 'Fractions':
        v = ev(mq)
        return ('cases', [v.numerator, v.denominator]) if tpl == '=±((#0)/(#1))' else None
    if typ == 'Écriture scientifique':
        v = ev(mq); e = 0
        while abs(v) >= 10: v /= 10; e += 1
        while abs(v) < 1: v *= 10; e -= 1
        return ('cases', [float(v), e]) if tpl == '=#0*10^(±#1)' else None
    if typ == 'Racines carrées':
        if 'forme a√b' in phrase:
            n = int(re.match(r'^sqrt\((\d+)\)$', mq)[1])
            a = max(k for k in range(1, 40) if n % (k * k) == 0)
            return ('cases', [a, n // (a * a)]) if tpl == '=#0sqrt(#1)' else None
        m = re.match(r'^=±#0sqrt\((\d+)\)$', tpl)
        if m:
            k = float(ev(mq)) / math.sqrt(int(m[1]))
            return ('cases', [round(k)]) if abs(k - round(k)) < 1e-9 else None
        v = ev(mq)
        return ('nombre', round(float(v))) if abs(float(v) - round(float(v))) < 1e-9 else None
    if typ in ('Développer', 'Identités remarquables', 'Réduire'):
        a, b, c = coefs(mq)
        if tpl == '=±#0x±#1': return ('cases', [b, c]) if a == 0 else None
        if tpl == '=x^(2)±#0x±#1': return ('cases', [b, c]) if a == 1 else None
        if tpl == '=x^(2)±#0': return ('cases', [c]) if a == 1 and b == 0 else None
        if tpl in ('=±#0x^(2)±#1x±#2', '=#0x^(2)±#1x±#2'): return ('cases', [a, b, c])
        return None
    if typ == 'Factoriser':
        a, b, c = coefs(mq)
        if tpl == '=#0(x±#1)': return ('cases', [b, c / b]) if a == 0 else None
        if tpl == '=#0(#1x±#2)':
            g = math.gcd(int(b), int(c)); return ('cases', [g, b / g, c / g]) if a == 0 else None
        if tpl == '=x(x±#0)': return ('cases', [b]) if a == 1 and c == 0 else None
        if tpl == '=#0x(x±#1)': return ('cases', [a, b / a]) if c == 0 else None
        if tpl == '=(x-#0)(x+#1)':
            r = math.isqrt(int(-c)); return ('cases', [r, r]) if a == 1 and b == 0 and r * r == -c else None
        if tpl == '=(#0x-#1)(#2x+#3)':
            p, q = math.isqrt(int(a)), math.isqrt(int(-c)); return ('cases', [p, q, p, q]) if b == 0 and p * p == a and q * q == -c else None
        if tpl == '=(x±#0)^(2)': return ('cases', [b / 2]) if a == 1 and (b / 2) ** 2 == c else None
        m = re.match(r'^=\((x[+-]\d+)\)\(±#0x±#1\)$', tpl)
        if m:
            p = ev(m[1], 0)                          # facteur commun (x + p)
            q0 = c / p
            return ('cases', [a, q0]) if b == a * p + q0 else None
        return None
    if typ == 'Équations':
        if phrase.startswith('Combien de solutions'):
            v = ev(re.match(r'^x\^\(2\) = (.*)$', mq)[1])
            return ('choix', 'Aucune solution' if v < 0 else 'Une seule solution' if v == 0 else 'Deux solutions')
        m = re.match(r'^\(([^()]*)\)\(([^()]*)\) = 0$', mq)
        if m: return ('cases', [racine_lin(m[1]), racine_lin(m[2])])
        m = re.match(r'^x\^\(2\) = (\d+)$', mq)
        if m: r = math.isqrt(int(m[1])); return ('cases', [r, -r]) if r * r == int(m[1]) else None
        g, d = mq.split(' = ')
        r = racine_lin('(%s) - (%s)' % (g, d))
        if 'fraction irréductible' in phrase: return ('cases', [r.numerator, r.denominator]) if tpl == 'x=±((#0)/(#1))' else None
        return ('nombre', r)
    if typ == 'Inéquations':
        if 'est-il solution' in phrase:
            t = int(re.search(r'Le nombre (-?\d+) est-il', phrase)[1])
            m = re.match(r'^(.*?) ([<>≤≥]) (.*)$', mq)
            g, d = ev(m[1], t), ev(m[3], t)
            return ('choix', 'Oui' if {'<': g < d, '≤': g <= d, '>': g > d, '≥': g >= d}[m[2]] else 'Non')
        sym, v = resout_ineq(mq)
        if 'ensemble des solutions' in phrase: return ('choix', intervalle(sym, v))
        return ('choix', 'x%s%s' % (sym, fnum(v)))
    if typ == 'Intervalles':
        if phrase.startswith('Que signifie'):
            m = re.match(r'^x ∈ ([\[\]])(-?\d+) ; (-?\d+)([\[\]])$', mq)
            return ('choix', '%s%sx%s%s' % (m[2], '≤' if m[1] == '[' else '<', '≤' if m[4] == ']' else '<', m[3]))
        m = re.match(r'^(-?\d+) ([<≤]) x ([<≤]) (-?\d+)$', mq)
        return ('choix', 'x∈%s%s;%s%s' % ('[' if m[2] == '≤' else ']', m[1], m[4], ']' if m[3] == '≤' else '['))
    return None

def qcm_c3(pg, q, fr):
    """Renvoie un test à appliquer à chaque réponse (sous forme linéaire) : une seule doit le passer, celle marquée juste."""
    s = lin(pg, q.query_selector('.qtext .fr'))
    s = re.sub(r'^\d+\.\s*', '', s)
    m = re.match(r'^(.*) est égal à :$', s) or re.match(r'^La forme factorisée de (.*) est :$', s)
    if m:
        e = m[1]
        if 'x' in e:
            vals = [ev(e, t) for t in (0, 1, 2, -3)]
            return ('test', lambda o: [ev(o, t) for t in (0, 1, 2, -3)] == vals)
        v = ev(e)
        return ('test', lambda o: meme(ev(o), v))
    m = re.match(r'^La solution de l’équation (.*) = (.*) est :$', s)
    if m:
        r = racine_lin('(%s) - (%s)' % (m[1], m[2]))
        return ('test', lambda o: ev(o) == r)
    m = re.match(r'^Les solutions de l’équation \(([^()]*)\)\(([^()]*)\) = 0 sont :$', s)
    if m:
        rs = sorted([racine_lin(m[1]), racine_lin(m[2])])
        return ('test', lambda o: sorted(Fraction(t) for t in re.findall(r'-?\d+', o)) == rs)
    m = re.match(r'^L’inéquation (.*) équivaut à :$', s)
    if m:
        sym, v = resout_ineq(m[1]); att = 'x%s%s' % (sym, fnum(v))
        return ('test', lambda o: clean(o) == att)
    m = re.match(r'^L’inégalité x ([<>≤≥]) (-?\d+) s’écrit aussi :$', s)
    if m:
        att = 'x∈' + intervalle(m[1], int(m[2]))
        return ('test', lambda o: clean(o) == att)
    m = re.match(r'^Pour x = (-?\d+)\. l’expression (.*) vaut :$', s)
    if m:
        v = ev(m[2], int(m[1]))
        return ('test', lambda o: ev(o) == v)
    return None

compte = {'lignes': 0, 'explications': 0}

def verifie_solution(pg, card, exp):
    """Relit la solution affichée d'une question d'entraînement du chapitre 3 : chaque ligne de calcul doit être une suite
    d'égalités vraies ; pour une équation, chaque étape doit garder exactement les mêmes solutions."""
    pb = []
    sb = card.query_selector('.sb')
    if not sb: return pb
    typ = norm(card.query_selector('.qtype .fr').text_content())
    phrase = lin(pg, card.query_selector('.qtext p.fr'))
    mq = lin(pg, card.query_selector('.qtext .mq'))
    sb.click()
    lignes = [lin(pg, p) for p in card.query_selector_all('.panel.sol .calc p')]
    if not lignes: return ['solution sans ligne de calcul']
    compte['lignes'] += len(lignes)
    pts = (0, 1, 2, -3)
    def egal(a, b): return meme(a, b)
    for s in lignes:
        try:
            if '⇔' in s:
                if exp[0] == 'nombre': racines = [Fraction(exp[1])]
                elif 'fraction irréductible' in phrase: racines = [Fraction(exp[1][0], exp[1][1])]
                else: racines = [Fraction(r) for r in exp[1]]
                def sat(e, r):
                    g, d = e.split(' = ')
                    return egal(ev(g, r), ev(d, r))
                for seg in s.split(' ⇔ '):
                    subs = seg.split(' ou ')
                    if not (all(any(sat(e, r) for e in subs) for r in racines) and all(any(sat(e, r) for r in racines) for e in subs)):
                        pb.append('étape « %s » : pas les mêmes solutions que %s' % (seg, [str(r) for r in racines]))
                    # une étape ne doit pas avoir d'autre solution : on essaie quelques autres nombres
                    for autre in (Fraction(17, 7), Fraction(-23, 5)):
                        if autre not in racines and any(sat(e, autre) for e in subs): pb.append('étape « %s » vraie pour n’importe quel nombre' % seg)
                continue
            parts = s.split(' = ')
            if len(parts) < 2: pb.append('ligne sans égalité : ' + s); continue
            if 'x' in s:
                vals = [[ev(p, t) for t in pts] for p in parts]
                if any(v != vals[0] for v in vals): pb.append('égalités fausses : ' + s)
                if typ in ('Développer', 'Identités remarquables', 'Réduire', 'Factoriser') and vals[0] != [ev(mq, t) for t in pts]: pb.append('la solution ne part pas de l’énoncé : ' + s)
            else:
                vals = [ev(p) for p in parts]
                if any(not egal(v, vals[0]) for v in vals): pb.append('égalités fausses : ' + s)
                if exp[0] == 'nombre' and not egal(vals[-1], exp[1]): pb.append('la solution ne finit pas sur la réponse : ' + s)
        except Exception as ex:
            pb.append('ligne de solution illisible : %s (%s)' % (s, ex))
    return pb

def verifie_explications(pg, zone):
    """Dans une explication (contrôle blanc), vérifie les suites d'égalités numériques écrites dans les formules."""
    pb = []
    for m in zone.query_selector_all('.fr .m'):
        s = lin(pg, m)
        if ' = ' not in s or 'x' in s or re.search(r'[<>≤≥∈;²³a-wyzA-Z]', s.replace('sqrt', '')): continue
        try:
            vals = [ev(p) for p in s.split(' = ')]
            compte['explications'] += 1
            if any(not meme(v, vals[0]) for v in vals): pb.append('égalités fausses dans une explication : ' + s)
        except Exception: pass
    return pb

# Par chapitre : recalcul de l'entraînement, recalcul du contrôle, thèmes de l'entraînement
RECALCUL = {'c10': (tr_c10, qcm_c10, ['cm', 'succ', 'recip', 'init', 'mix']),
            'c3': (tr_c3, qcm_c3, ['calc', 'rac', 'dev', 'fact', 'eq', 'ineq', 'mix'])}

def reponds(pg, card, exp):
    """Tape la réponse attendue dans une question d'entraînement. exp : nombre (un champ) ou liste (cases)."""
    if isinstance(exp, (list, tuple)):
        for i, v in enumerate(exp):
            box = card.query_selector('.bx[data-b="%d"]' % i)
            sg = card.query_selector('.sgn[data-b="%d"]' % i)
            box.fill(frnum(abs(float(v)), 4))
            if sg and (sg.get_attribute('data-s') == '-1') != (v < 0): sg.click()
            if not sg and v < 0: return False
    else:
        card.query_selector('input').fill(frnum(float(exp), 4))
    card.query_selector('.chk').click()
    return True

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get('CHROMIUM') or None)
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.on('pageerror', lambda e: errs.append('pageerror: ' + str(e)))
    pg.on('console', lambda m: errs.append('console: ' + m.text) if m.type == 'error' and 'ERR_' not in m.text and 'Failed to load' not in m.text else None)
    pg.goto(URL); pg.wait_for_timeout(300)
    pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(300)
    chaps = pg.evaluate("[...document.querySelectorAll('#home-list .chap')].map(a => a.dataset.ch)")
    info.append('chapitres : ' + ', '.join(chaps))
    chk(set(chaps) == set(e['ch'] for e in data), 'chapitres affichés %s, chapitres des données %s' % (chaps, sorted(set(e['ch'] for e in data))))
    chk(pg.is_hidden('.tabbar'), "la barre d'onglets doit être cachée sur l'accueil")
    for ch in chaps:
        exos = [e for e in data if e['ch'] == ch]
        V = '#v-exercices-' + ch
        info.append('%s : %d exercices, %d questions' % (ch, len(exos), sum(len(e['parts']) for e in exos)))
        # 1. Chaque question des exercices : pièges, puis bonne réponse
        pg.goto(URL + '#' + ch + '/exercices'); pg.wait_for_timeout(200)
        for e in exos:
            art = pg.query_selector('#x-' + e['id'])
            if not art: fails.append('carte absente ' + e['id']); continue
            art.query_selector('.exo-h').click()
            for j, part in enumerate(e['parts']):
                box = art.query_selector('.part[data-j="%d"]' % j)
                w = '%s q%d' % (e['id'], j + 1)
                if part['kind'] == 'num':
                    inp = box.query_selector('input')
                    for t in part.get('traps', []):
                        inp.fill(frnum(t['v'], 4)); box.query_selector('.chk').click()
                        fb = norm(box.query_selector('.fbw').inner_text())
                        chk(norm(t['fr'])[:25] in fb, '%s piège %s non reconnu : %s' % (w, t['v'], fb[:60]))
                    if part['sign'] == 'strict' and abs(part['ans']) > part['tol'] * 3:
                        inp.fill(frnum(-part['ans'], dec(part['tol']))); box.query_selector('.chk').click()
                        fb = norm(box.query_selector('.fbw').inner_text())
                        trap_hit = any(abs(-part['ans'] - t['v']) <= max(part['tol'], .006) for t in part.get('traps', []))
                        chk(trap_hit or 'signe' in fb, '%s signe non détecté : %s' % (w, fb[:60]))
                    inp.fill(frnum(part['ans'], dec(part['tol']))); box.query_selector('.chk').click()
                    chk('juste' in box.query_selector('.fbw').inner_text(), '%s bonne réponse %s refusée : %s' % (w, frnum(part['ans'], dec(part['tol'])), box.query_selector('.fbw').inner_text()[:60]))
                elif part['kind'] == 'choice':
                    goods = part['correct'] if isinstance(part['correct'], list) else [part['correct']]
                    btns = box.query_selector_all('.choice')
                    chk(len(btns) == len(part['choices']), w + ' : nombre de boutons')
                    for k in range(len(btns)):
                        if k in goods: continue
                        btns[k].click()
                        chk('ko' in (btns[k].get_attribute('class') or ''), '%s choix %d devrait être refusé' % (w, k))
                        if part.get('fb'): chk(len(norm(box.query_selector('.fbw .panel.why').inner_text())) > 10, '%s choix %d sans explication' % (w, k))
                    for n, k in enumerate(goods):
                        chk('solved' not in (box.get_attribute('class') or ''), w + ' réussi trop tôt')
                        btns[k].click()
                        if part.get('fb'): chk(len(norm(box.query_selector('.fbw .panel.why').inner_text())) > 10, '%s bonne réponse %d sans explication' % (w, k))
                    chk('juste' in box.query_selector('.fbw').inner_text().lower(), '%s choix correct refusé' % w)
                    chk('solved' in (box.get_attribute('class') or ''), w + ' pas marqué réussi')
                elif part['kind'] == 'self':
                    chk(box.query_selector('.panel.sol').is_hidden(), w + ' : la solution doit être cachée au départ')
                    if part.get('hint'):
                        box.query_selector('.hb').click()
                        chk(box.query_selector('.panel.hint').is_visible(), w + " : l'indice ne s'ouvre pas")
                    box.query_selector('.sb').click()
                    chk(box.query_selector('.panel.sol').is_visible(), w + " : la solution ne s'ouvre pas")
                    box.query_selector('.sok').click()
                    chk('done' in (art.get_attribute('class') or ''), w + ' pas marqué réussi')
                    box.query_selector('.sko').click()
                    chk('done' not in (art.get_attribute('class') or ''), w + ' : « À refaire » ne retire pas la réussite')
                    box.query_selector('.sok').click()
                else:
                    fails.append(w + ' : type de question inconnu du test : ' + str(part['kind']))
            chk('done' in (art.get_attribute('class') or ''), e['id'] + ' pas marqué réussi')
            ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
            chk(ov <= 0, 'débordement exercice %s : %s' % (e['id'], ov))
            art.query_selector('.exo-h').click()
        chk(pg.inner_text(V + ' .ex-count') == '%d / %d' % (len(exos), len(exos)), ch + ' compteur : ' + pg.inner_text(V + ' .ex-count'))
        pg.reload(); pg.wait_for_timeout(300)
        chk(pg.inner_text(V + ' .ex-count') == '%d / %d' % (len(exos), len(exos)), ch + ' progression non sauvegardée')
        if ch not in RECALCUL: fails.append('pas de recalcul prévu pour le chapitre ' + ch); continue
        tr_exp, qcm_exp, modes = RECALCUL[ch]
        # 2. Entraînement : questions recalculées à partir de l'énoncé affiché
        pg.goto(URL + '#' + ch + '/entrainement'); pg.wait_for_timeout(200)
        T = '#v-entrainement-' + ch
        n_ok = n_tr = 0
        shown = pg.evaluate("[...document.querySelectorAll('%s .tr-modes .chip')].map(c => c.dataset.m)" % T)
        chk(sorted(shown) == sorted(modes), '%s thèmes affichés %s, thèmes testés %s' % (ch, shown, modes))
        for mode in modes:
            pg.click(T + ' .tr-modes [data-m="%s"]' % mode)
            for _ in range((40 if mode != 'mix' else 60) * (2 if ch == 'c3' else 1)):
                n_tr += 1
                card = pg.query_selector(T + ' .tr-card')
                fr = norm(card.query_selector('.qtext').inner_text())
                try: exp = tr_exp(pg, card)
                except Exception as ex: exp = None; fails.append('%s entraînement, erreur de lecture : %s | %s' % (ch, fr[:80], ex))
                if exp is None: fails.append('%s entraînement non lu : %s' % (ch, fr[:90])); pg.click(T + ' .tr-next'); continue
                if exp[0] == 'choix':
                    btns = card.query_selector_all('.choice')
                    hits = [k for k, bt in enumerate(btns) if clean(lin(pg, bt.query_selector('.ct'))) == clean(exp[1])]
                    if len(hits) != 1: fails.append('%s entraînement, choix attendu « %s » introuvable : %s' % (ch, exp[1], fr[:70])); pg.click(T + ' .tr-next'); continue
                    btns[hits[0]].click()
                else:
                    # d'abord une réponse fausse : elle ne doit pas être acceptée
                    faux = [exp[1][0] + 1] + list(exp[1][1:]) if exp[0] == 'cases' else exp[1] + 1
                    if exp[0] == 'cases' and len(exp[1]) == 2 and sorted(faux) == sorted(exp[1]): faux = [exp[1][0] + 3, exp[1][1]]
                    reponds(pg, card, faux)
                    if card.query_selector('.fbw .fb.ok') or 'solved' in (card.query_selector('.tr-part').get_attribute('class') or ''): fails.append('%s entraînement, réponse fausse acceptée : %s | %s' % (ch, fr[:90], faux))
                    if not reponds(pg, card, exp[1]): fails.append('%s entraînement, case sans signe pour une valeur négative : %s' % (ch, fr[:70])); pg.click(T + ' .tr-next'); continue
                fb = card.query_selector('.fbw').inner_text()
                if card.query_selector('.fbw .fb.ok') and 'solved' in (card.query_selector('.tr-part').get_attribute('class') or ''):
                    n_ok += 1
                    if ch == 'c3' and exp[0] != 'choix':
                        for x in verifie_solution(pg, card, exp): fails.append('%s solution : %s | %s' % (ch, fr[:70].replace('\n', ' '), x))
                else: fails.append('%s entraînement refusé : %s | %s | %s' % (ch, fr[:90], exp[1], norm(fb)[:60]))
                ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
                chk(ov <= 0, '%s débordement entraînement : %s' % (ch, fr[:60]))
                pg.click(T + ' .tr-next')
        info.append('%s entraînement juste : %d / %d' % (ch, n_ok, n_tr))
        # 3. Contrôle blanc : 15 sujets, bonne réponse recalculée
        pg.goto(URL + '#' + ch + '/controle'); pg.wait_for_timeout(200)
        C = '#v-controle-' + ch
        n_q = 0
        for s in range(15):
            qs = pg.query_selector_all(C + ' .tq')
            chk(len(qs) == 10, '%s : le contrôle doit avoir 10 questions, il en a %d' % (ch, len(qs)))
            for q in qs: q.query_selector_all('.choice')[0].click()
            pg.click(C + ' .test-go'); pg.wait_for_timeout(50)
            for q in pg.query_selector_all(C + ' .tq'):
                fr = re.sub(r'^\d+\.\s*', '', norm(q.query_selector('.qtext .fr').inner_text()))
                try: exp = qcm_exp(pg, q, fr)
                except Exception as ex: exp = None; fails.append('%s contrôle, erreur de lecture : %s | %s' % (ch, fr[:80], ex))
                okb = q.query_selector('.choice.ok .ct .fr') or q.query_selector('.choice.ok .ct')
                got = norm(okb.inner_text())
                opts = [norm(o.inner_text()) for o in q.query_selector_all('.choice .ct')]
                chk(len(set(opts)) == len(opts), 'options en double : %s' % opts)
                if exp is None: fails.append('%s contrôle non lu : %s' % (ch, fr)); continue
                n_q += 1
                if ch == 'c3':
                    for x in verifie_explications(pg, q.query_selector('.fbw')): fails.append('%s contrôle : %s | %s' % (ch, norm(fr)[:70], x))
                if isinstance(exp, tuple):
                    # un test mathématique par réponse : une seule doit le passer, celle que l'application marque juste
                    lus = [lin(pg, o) for o in q.query_selector_all('.choice .ct')]
                    try: bons = [k for k, o in enumerate(lus) if exp[1](o)]
                    except Exception as ex: bons = None; fails.append('%s contrôle, réponse illisible : %s | %s | %s' % (ch, norm(fr)[:70], lus, ex))
                    marque = [k for k, bt in enumerate(q.query_selector_all('.choice')) if 'ok' in (bt.get_attribute('class') or '').split()]
                    if bons is not None: chk(bons == marque and len(bons) == 1, '%s contrôle : %s | réponses %s | justes par le calcul %s | marquée %s' % (ch, norm(fr)[:70], lus, bons, marque))
                else:
                    chk(norm(exp) == got.split(' · ')[0], '%s contrôle : %s | attendu %s | marqué %s' % (ch, norm(fr)[:70], exp, got))
            ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
            chk(ov <= 0, '%s débordement contrôle corrigé' % ch)
            pg.click(C + ' .test-new'); pg.wait_for_timeout(50)
        info.append('%s questions de contrôle vérifiées : %d' % (ch, n_q))
    # 4. Navigation : accueil, carte du chapitre, onglets, anciennes adresses
    pg.goto(URL + '#accueil'); pg.wait_for_timeout(150)
    for ch in chaps:
        pg.click('#home-list .chap[data-ch="%s"]' % ch); pg.wait_for_timeout(100)
        chk(pg.is_visible('.tabbar'), ch + " : barre d'onglets absente dans le chapitre")
        for v in ['cours', 'exercices', 'entrainement', 'controle']:
            pg.click('.tab[data-v="%s"]' % v); pg.wait_for_timeout(60)
            vis = pg.evaluate("[...document.querySelectorAll('main > .view')].filter(v => !v.hidden).map(v => v.id)")
            chk(vis == ['v-%s-%s' % (v, ch)], '%s onglet %s : vues visibles %s' % (ch, v, vis))
        pg.click('.tab[href="#accueil"]'); pg.wait_for_timeout(60)
        chk(pg.is_visible('#v-accueil') and pg.is_hidden('.tabbar'), ch + " : retour à l'accueil")
    if 'c10' in chaps:
        for v in ['cours', 'exercices', 'entrainement', 'controle']:
            pg.goto(URL + '#' + v); pg.wait_for_timeout(60)
            chk(pg.is_visible('#v-%s-c10' % v), 'ancienne adresse #%s' % v)
    # 5. Langues et débordement : accueil, chaque vue, chaque partie des cours en plusieurs pages
    for l in ['fr', 'it', 'both']:
        pg.click('.seg button[data-lang="%s"]' % l)
        pg.goto(URL + '#accueil'); pg.wait_for_timeout(80)
        ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
        chk(ov <= 0, 'débordement %s accueil : %s' % (l, ov))
        for ch in chaps:
            for v in ['cours', 'exercices', 'entrainement', 'controle']:
                pg.goto(URL + '#' + ch + '/' + v); pg.wait_for_timeout(80)
                ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
                chk(ov <= 0, 'débordement %s %s %s : %s' % (l, ch, v, ov))
            pg.goto(URL + '#' + ch + '/cours'); pg.wait_for_timeout(80)
            for go in pg.evaluate("[...document.querySelectorAll('#v-cours-%s .toc .chip')].map(c => c.dataset.go)" % ch):
                pg.click('#v-cours-%s .toc .chip[data-go="%s"]' % (ch, go)); pg.wait_for_timeout(60)
                chk(pg.is_visible('#' + go), '%s : la partie %s ne s’affiche pas' % (ch, go))
                ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
                chk(ov <= 0, 'débordement %s %s partie %s : %s' % (l, ch, go, ov))
                wide = pg.evaluate("""(id) => { const l = document.getElementById(id), W = document.documentElement.clientWidth, out = [];
                    l.querySelectorAll('*').forEach(n => { const r = n.getBoundingClientRect(); if (r.width && r.right > W + 1) { let p = n.parentElement, sc = false; while (p && p !== l) { const s = getComputedStyle(p); if (/auto|scroll/.test(s.overflowX)) { sc = true; break; } p = p.parentElement; } if (!sc) out.push(n.tagName + '.' + n.className + ' ' + Math.round(r.right)); } });
                    return out.slice(0, 3); }""", go)
                chk(not wide, 'élément qui dépasse à droite, %s %s %s : %s' % (l, ch, go, wide))
    b.close()
info.append('lignes de solution relues : %d, calculs d’explication relus : %d' % (compte['lignes'], compte['explications']))
print('\n'.join(info))
print('erreurs JS:', errs)
print('ÉCHECS:', len(fails))
for f in fails[:60]: print(' -', f)
if fails or errs: sys.exit(1)
