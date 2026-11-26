"""Teste toute l'application dans un navigateur à 390 px, avec les marges d'un iPhone 13 : chaque exercice de chaque chapitre
(pièges, signe, bonne réponse), l'entraînement et le contrôle recalculés à partir de l'énoncé affiché, la navigation, les langues,
le débordement, et les pages (cours, exercices, contrôle blanc) : rien à faire défiler, tout le contenu affiché une fois.
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
    for d, lim in ((0, .5), (1, .05), (2, .005), (3, .0005), (4, .00005)):
        if tol >= lim: return d
    return 8      # réponse exacte : toutes ses décimales (0,004 05)
def num(s): return float(norm(s).replace(' ', '').replace(',', '.'))

# Données des exercices de tous les chapitres, lues avec Node
FICHIERS = sorted(f for f in glob.glob(os.path.join(R, 'src', '*', 'ex*.js')))
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

# ---------- 3e, calculs : recalcul à partir des formules affichées ----------
def nature(s):
    """Nature d'un calcul écrit en ligne : celle de la dernière opération à faire."""
    prof, plus, mult = 0, None, None
    for i, c in enumerate(s):
        if c == '(': prof += 1
        elif c == ')': prof -= 1
        elif prof == 0:
            avant = s[:i].strip()
            if c in '+-' and avant and avant[-1] not in '+-*/(^': plus = c
            elif c in '*/': mult = c
    if plus: return 'une somme' if plus == '+' else 'une différence'
    if mult: return 'un produit' if mult == '*' else 'un quotient'
    return None
def scientifique(v):
    e = 0
    while abs(v) >= 10: v /= 10; e += 1
    while abs(v) < 1: v *= 10; e -= 1
    return v, e
def tr_t1(pg, card):
    typ = norm(card.query_selector('.qtype .fr').text_content())
    mq = re.sub(r'^A = ', '', lin(pg, card.query_selector('.qtext .mq')))
    fexp = card.query_selector('.fexp')
    tpl = clean(lin(pg, fexp)) if fexp else ''
    if typ in ('Priorités', 'Puissances'): return ('nombre', ev(mq))
    if typ == 'Somme ou produit ?': return ('choix', nature(mq))
    if typ in ('Fractions', 'Fractions et priorités'):
        v = ev(mq)
        return ('cases', [v.numerator, v.denominator]) if tpl == '=±((#0)/(#1))' else None
    if typ == 'Puissances de 10':
        v = ev(mq)
        if tpl == '=10^(±#0)':
            n = [k for k in range(-60, 61) if Fraction(10) ** k == v]
            return ('cases', [n[0]]) if len(n) == 1 else None
        return ('nombre', v) if not tpl else None
    if typ == 'Écriture scientifique':
        v, e = scientifique(ev(mq))
        return ('cases', [float(v), e]) if tpl == '=#0*10^(±#1)' else None
    return None
def qcm_t1(pg, q, fr):
    s = re.sub(r'^\d+\.\s*', '', lin(pg, q.query_selector('.qtext .fr')))
    m = re.match(r'^(.*) est égal à :$', s)
    if m:
        v = ev(m[1]); return ('test', lambda o: meme(ev(o), v))
    m = re.match(r'^Les (.*) de (\d+) font :$', s)
    if m:
        v = ev(m[1]) * int(m[2]); return ('test', lambda o: meme(ev(o), v))
    m = re.match(r'^L’écriture scientifique de (.*) est :$', s)
    if m:
        v = ev(m[1])
        def sci(o):
            mm = re.match(r'^(\d+(?:\.\d+)?) \* 10\^\((-?\d+)\)$', o)
            return bool(mm) and 1 <= Fraction(mm[1]) < 10 and Fraction(mm[1]) * Fraction(10) ** int(mm[2]) == v
        return ('test', sci)
    m = re.match(r'^Sans calculer : (.*) est :$', s)
    if m:
        n = nature(m[1]); return ('test', lambda o: clean(o) == clean(n))
    return None
def verifie_solution_t1(pg, card, exp):
    """Solution d'une question d'entraînement de 3e : chaque ligne de calcul doit avoir la valeur de l'expression de l'énoncé."""
    pb = []
    sb = card.query_selector('.sb')
    if not sb: return pb
    ref = ev(re.sub(r'^A = ', '', lin(pg, card.query_selector('.qtext .mq'))))
    sb.click()
    rows = []
    for c in card.query_selector_all('.panel.sol .calc'): rows += rangees(pg, c)
    if not rows: return ['solution sans ligne de calcul']
    compte['lignes'] += len(rows)
    for x in pg.evaluate(POSE, card.query_selector('.panel.sol'))[1]: pb.append(x)
    dernier = None
    for r in rows:
        morceaux = ([r[1]] if r[1] and r[1] != 'A' else []) + [r[2]] if r[0] == 'eq' else [r[1]]
        for m in morceaux:
            m = re.sub(r'^= ?', '', m)
            try:
                dernier = ev(m)
                if not meme(dernier, ref): pb.append('ligne de solution fausse : %s (énoncé : %s)' % (m, ref))
            except Exception as ex: pb.append('ligne de solution illisible : %s (%s)' % (m, ex))
    return pb

compte = {'lignes': 0, 'explications': 0, 'calculs': 0, 'formules': 0, 'pages': 0, 'pages_exos': 0, 'pages_controle': 0}

def rangees(pg, calc):
    """Les rangées d'un calcul posé (bloc .calc) : ('eq', membre de gauche, « = suite ») ou ('expr', expression seule)."""
    out = []; g = ''
    for el in calc.query_selector_all(':scope > span'):
        c = (el.get_attribute('class') or '').split()
        if 'cg' in c: g = lin(pg, el)
        elif 'cd' in c: out.append(('eq', g, lin(pg, el))); g = ''
        elif 'ce' in c: out.append(('expr', lin(pg, el)))
    return out
def suites(rows):
    """Regroupe les rangées en suites d'égalités : une rangée sans membre de gauche, ou qui commence par =, continue la précédente."""
    out = []
    for r in rows:
        if r[0] == 'expr':
            if out and r[1][:1] in ('=', '≈'): out[-1] += ' ' + r[1]        # « = suite » sur toute la largeur, sous une expression seule
            else: out.append(r[1])
        elif r[1] or not out: out.append((r[1] + ' ' + r[2]).strip())
        else: out[-1] += ' ' + r[2]
    return out

# Mise en page d'un calcul posé : les signes « = » les uns sous les autres, rien qui oblige à faire défiler le bloc.
POSE = r"""(root) => { const out = [];
  root.querySelectorAll('.calc').forEach(c => { if (!c.offsetParent) return;
    const xs = [...c.querySelectorAll(':scope > .cd')].filter(n => n.offsetParent).map(n => Math.round(n.getBoundingClientRect().left * 2) / 2);      // les lignes affichées (un calcul peut continuer page suivante)
    const txt = c.textContent.trim().replace(/\s+/g, ' ').slice(0, 50);
    if (new Set(xs).size > 1) out.push('signes = non alignés : ' + txt);
    if (c.scrollWidth > c.clientWidth + 1) out.push('calcul trop large (' + (c.scrollWidth - c.clientWidth) + ' px) : ' + txt);
    if (c.querySelector(':scope > p:not(.ct), :scope > div:not(.ct)')) out.push('ancien format de calcul : ' + txt);
    // une étape tient sur une ligne : aucun morceau de la case ne recommence plus à gauche que le précédent
    c.querySelectorAll(':scope > .cg, :scope > .cd, :scope > .ce').forEach(cell => { const b = [];
      cell.childNodes.forEach(n => { if (n.nodeType === 3) { const r = document.createRange(); r.selectNodeContents(n); b.push(...[...r.getClientRects()].filter(x => x.width > 0)); } else if (n.nodeType === 1) { const r = n.getBoundingClientRect(); if (r.width > 0) b.push(r); } });
      if (b.some((r, i) => i && r.left < b[i - 1].left - 1)) out.push('étape de calcul coupée en deux lignes : ' + cell.textContent.trim().replace(/\s+/g, ' ').slice(0, 60)); });
  });
  return [[...root.querySelectorAll('.calc')].filter(c => c.offsetParent).length, out]; }"""
# Les formules du texte : jamais coupées en fin de ligne (hors des tableaux ordinaires, aux colonnes étroites), jamais plus larges
# que le bloc qui les contient ; aucun tableau ni calcul qu'il faudrait faire défiler.
FORMULES = r"""(root) => { const out = [];
  const txt = (n) => n.textContent.trim().replace(/\s+/g, ' ').slice(0, 60);
  root.querySelectorAll('span.m').forEach(m => {
    if (!m.offsetParent || m.closest('.calc') || m.parentElement.closest('.m')) return;
    const t = m.closest('table');
    if (!(t && !t.classList.contains('fx') && !t.classList.contains('err'))) {
      // coupée : un morceau (ou un fragment de la formule) recommence plus à gauche que le précédent, donc sur une nouvelle ligne
      const mc = [...m.querySelectorAll(':scope > .mc')];
      const rs = (mc.length ? mc.map(c => c.getBoundingClientRect()) : [...m.getClientRects()]).filter(r => r.width > 0);
      if (rs.some((r, i) => i && r.left < rs[i - 1].left - 1)) out.push('formule coupée en fin de ligne : ' + txt(m));
    }
    const b = m.closest('p, li, td, th, div, figcaption, button');
    if (b) { const r = m.getBoundingClientRect(), rb = b.getBoundingClientRect(), cs = getComputedStyle(b);
      if (r.right > rb.right - parseFloat(cs.paddingRight) + 6) out.push('formule plus large que son bloc (' + Math.round(r.right - rb.right + parseFloat(cs.paddingRight)) + ' px) : ' + txt(m)); }
  });
  root.querySelectorAll('.tw, .md').forEach(n => { if (n.offsetParent && n.scrollWidth > n.clientWidth + 1) out.push('bloc à faire défiler (' + (n.scrollWidth - n.clientWidth) + ' px) : ' + txt(n)); });
  return [[...root.querySelectorAll('span.m')].filter(m => m.offsetParent).length, out]; }"""
def verifie_pose(pg, sel, ou):
    el = pg.query_selector(sel) if isinstance(sel, str) else sel
    n, pb = pg.evaluate(POSE, el)
    compte['calculs'] += n
    nf, pf = pg.evaluate(FORMULES, el)
    compte['formules'] += nf
    for x in pb + pf: fails.append('%s : %s' % (ou, x))

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
    rows = []
    for c in card.query_selector_all('.panel.sol .calc'): rows += rangees(pg, c)
    if not rows: return ['solution sans ligne de calcul']
    compte['lignes'] += len(rows)
    for x in pg.evaluate(POSE, card.query_selector('.panel.sol'))[1]: pb.append(x)
    pts = (0, 1, 2, -3)
    def egal(a, b): return meme(a, b)
    if typ == 'Équations':
        # une équation par rangée : chacune doit avoir exactement les solutions attendues, et la première est l'énoncé
        if exp[0] == 'nombre': racines = [Fraction(exp[1])]
        elif 'fraction irréductible' in phrase: racines = [Fraction(exp[1][0], exp[1][1])]
        else: racines = [Fraction(r) for r in exp[1]]
        def sat(e, r):
            g, d = e.split(' = ')
            return egal(ev(g, r), ev(d, r))
        etapes = [(r[1] + ' ' + r[2]).strip() if r[0] == 'eq' else r[1] for r in rows]
        if clean(etapes[0]) != clean(mq): pb.append('la solution ne part pas de l’énoncé : « %s » au lieu de « %s »' % (etapes[0], mq))
        if len(etapes) < 2: pb.append('solution en une seule ligne : ' + etapes[0])
        for seg in etapes:
            try:
                subs = seg.split(' ou ')
                if not (all(any(sat(e, r) for e in subs) for r in racines) and all(any(sat(e, r) for r in racines) for e in subs)):
                    pb.append('étape « %s » : pas les mêmes solutions que %s' % (seg, [str(r) for r in racines]))
                # une étape ne doit pas avoir d'autre solution : on essaie quelques autres nombres
                for autre in (Fraction(17, 7), Fraction(-23, 5)):
                    if autre not in racines and any(sat(e, autre) for e in subs): pb.append('étape « %s » vraie pour n’importe quel nombre' % seg)
            except Exception as ex:
                pb.append('étape illisible : %s (%s)' % (seg, ex))
        return pb
    for s in suites(rows):
        try:
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
                # la suite d'égalités doit avoir la valeur de l'expression de l'énoncé (pour la valeur de x donnée, s'il y en a une)
                xv = re.search(r'x = (-?\d+)', phrase)
                try: ref = ev(mq, int(xv[1])) if xv else ev(mq)
                except Exception: ref = None
                if ref is None: pb.append('énoncé illisible pour relire la solution : ' + mq)
                elif not egal(vals[0], ref): pb.append('la solution ne part pas de l’énoncé : ' + s)
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
    # les calculs posés d'une explication : chaque suite d'égalités doit être vraie (avec x : en quatre valeurs de x)
    for c in zone.query_selector_all('.calc'):
        for s in suites(rangees(pg, c)):
            parts = s.split(' = ')
            if len(parts) < 2: pb.append('calcul posé sans égalité dans une explication : ' + s); continue
            try:
                if 'x' in s:
                    vals = [[ev(q, v) for v in (0, 1, 2, -3)] for q in parts]
                    if any(v != vals[0] for v in vals): pb.append('égalités fausses dans une explication : ' + s)
                else:
                    vals = [ev(q) for q in parts]
                    if any(not meme(v, vals[0]) for v in vals): pb.append('égalités fausses dans une explication : ' + s)
                compte['explications'] += 1
            except Exception as ex: pb.append('calcul d’explication illisible : %s (%s)' % (s, ex))
    return pb

# ---------- Le cours en pages ----------
# Les polices changent la hauteur du texte, donc le découpage en pages : on les charge toutes avant de mesurer.
POLICES = """(async () => { const F = ['400 1em "Atkinson Hyperlegible"', '700 1em "Atkinson Hyperlegible"', 'italic 400 1em "Atkinson Hyperlegible"', '500 1em Fredoka', '600 1em Fredoka',
  '700 1em Fredoka', '400 1em "STIX Two Text"', '600 1em "STIX Two Text"', 'italic 400 1em "STIX Two Text"'];
  await Promise.all(F.map(f => document.fonts.load(f, 'Aé x 2 × − π').catch(() => 0))); await document.fonts.ready; return document.fonts.size; })()"""
PG_ETAT = r"""(l) => { const v = l.closest('.view'), c = v.querySelector('.pg-count').textContent.split('/').map(Number), de = document.documentElement;
  return { k: c[0], n: c[1], haut: de.scrollHeight - innerHeight, large: de.scrollWidth - de.clientWidth, cache: l.hidden,
    texte: l.innerText.trim().length, dessin: [...l.querySelectorAll('svg, input')].some(s => s.getBoundingClientRect().height > 0),
    barre: parseFloat(v.querySelector('.pgbar i').style.width) || 0, premier: v.querySelector('.pg-prev').disabled, suite: v.querySelector('.pg-next-t').textContent.trim(),
    partie: (v.querySelector('.toc .chip[aria-pressed="true"]') || { dataset: {} }).dataset.go,
    depasse: [...l.querySelectorAll('*')].filter(n => { const r = n.getBoundingClientRect(); return r.width && r.right > de.clientWidth + 1; }).map(n => n.tagName + '.' + n.className).slice(0, 3) }; }"""
PG_SUIVANT = "(l) => l.closest('.view').querySelector('.pg-next').click()"
PG_PRECEDENT = "(l) => l.closest('.view').querySelector('.pg-prev').click()"
# Avant de tourner les pages d'une partie : tout ce qui se lit quand rien n'est caché, dans la langue affichée
# (noté sur les éléments eux-mêmes : la page peut gagner ou perdre des éléments entre deux relevés, par exemple la chouette qui vient féliciter)
PG_REPERE = r"""(l) => { const off = [...l.querySelectorAll('.pg-off')]; off.forEach(e => e.classList.remove('pg-off'));
  let n = 0;
  l.querySelectorAll('*').forEach(e => { e.__vu = 0;
    e.__lu = !!e.offsetParent && [...e.childNodes].some(n => n.nodeType === 3 && /\S/.test(n.nodeValue)) && !e.closest('.tag, thead, .go-t, .ph'); if (e.__lu) n++; });
  off.forEach(e => e.classList.add('pg-off')); return n; }"""
PG_VU = "(l) => { l.querySelectorAll('*').forEach(e => { if (e.__lu && e.offsetParent) e.__vu++; }); return 0; }"
PG_BILAN = r"""(l) => { const out = [];
  l.querySelectorAll('*').forEach(e => { if (e.__lu && e.__vu !== 1) out.push((e.__vu ? 'affiché sur ' + e.__vu + ' pages : ' : 'jamais affiché : ') + e.textContent.trim().replace(/\s+/g, ' ').slice(0, 50)); });
  return out.slice(0, 5); }"""
def tourne_pages(pg, lesson, ou, forme=None):
    """Tourne toutes les pages d'une partie du cours, affichée à sa première page. Chaque page : rien à faire défiler, rien qui dépasse,
    quelque chose à lire, la barre qui avance ; sur l'ensemble : tout le contenu de la partie est affiché une fois et une seule."""
    pg.evaluate(PG_REPERE, lesson)
    e = pg.evaluate(PG_ETAT, lesson)
    total, barre = e['n'], -1
    chk(e['k'] == 1, '%s : la partie ne s’ouvre pas à sa première page (page %s)' % (ou, e['k']))
    for k in range(1, total + 1):
        e = pg.evaluate(PG_ETAT, lesson)
        w = '%s page %d/%d' % (ou, k, total)
        chk(not e['cache'], w + ' : partie cachée')
        chk(e['k'] == k and e['n'] == total, '%s : compteur %s / %s' % (w, e['k'], e['n']))
        chk(e['large'] <= 0 and not e['depasse'], '%s : débordement horizontal %s %s' % (w, e['large'], e['depasse']))
        chk(e['haut'] <= 0, '%s : page à faire défiler (%s px)' % (w, e['haut']))
        chk(e['texte'] > 0 or e['dessin'], w + ' : page vide')
        chk(e['barre'] > barre, '%s : la barre ne se remplit pas (%s puis %s)' % (w, barre, e['barre'])); barre = e['barre']
        pg.evaluate(PG_VU, lesson)
        if forme: forme(lesson, w)
        compte['pages'] += 1
        if k < total: pg.evaluate(PG_SUIVANT, lesson)
    chk(abs(barre - 100) < 0.6, '%s : à la dernière page la barre doit être pleine (%s %%)' % (ou, barre))
    for x in pg.evaluate(PG_BILAN, lesson): fails.append('%s : %s' % (ou, x))
    return total

# ---------- Les exercices en pages ----------
# Un exercice ouvert prend la place de la liste : son numéro et son titre en haut, la barre, puis l'énoncé et une question par page.
CLIC = "(s) => { const b = document.querySelector(s); if (b && b.getClientRects().length) b.click(); return !!b; }"
X_ETAT = r"""(v) => { const art = v.querySelector('.exo.open'), de = document.documentElement;
  if (!art) return null;
  const c = v.querySelector('.pg-count').textContent.split('/').map(Number), nav = v.querySelector('.pgnav').getBoundingClientRect();
  const vus = (s) => [...art.querySelectorAll(s)].filter(e => e.offsetParent);
  return { id: art.id.slice(2), k: c[0], n: c[1], barre: parseFloat(v.querySelector('.pgbar i').style.width) || 0,
    sous: Math.round(art.getBoundingClientRect().bottom - nav.top), haut: de.scrollHeight - innerHeight, large: de.scrollWidth - de.clientWidth,
    texte: art.innerText.trim().length, dessin: vus('svg, input').length > 0, questions: vus('.part').map(p => Number(p.dataset.j)), tete: vus('.exo-h').length,
    premier: v.querySelector('.pg-prev').disabled, suite: v.querySelector('.pg-next-t').innerText.trim(),
    num: v.querySelector('.ex-num').textContent.trim(), carte: art.querySelector('.exo-n').textContent.trim(), titre: v.querySelector('.ex-where').innerText.trim(),
    enonce: !v.querySelector('.stmt-b').hidden, vuEnonce: vus('.stmt *').length,
    depasse: [...art.querySelectorAll('*')].filter(n => { const r = n.getBoundingClientRect(); return r.width && r.right > de.clientWidth + 1; }).map(n => n.tagName + '.' + n.className).slice(0, 3) }; }"""
def ouvre_exo(pg, V, eid): pg.evaluate("(s) => document.querySelector(s).click()", '#x-%s .exo-h' % eid)
def liste_exos(pg, V): pg.evaluate(CLIC, V + ' .ex-back')
def va_a(pg, V, el, w, maxi=14):
    """Dans l'exercice ouvert, tourne les pages jusqu'à ce que l'élément soit affiché."""
    for _ in range(maxi):
        if el.is_visible(): return True
        pg.evaluate(CLIC, V + ' .pg-next')
    fails.append(w + ' : introuvable en tournant les pages de l’exercice')
    return False
def tourne_exo(pg, V, eid, rang, total, ou, barre, forme=None):
    """Tourne toutes les pages d'un exercice ouvert à sa première page. Chaque page : rien à faire défiler, rien sous les boutons du bas,
    quelque chose à lire, une seule question, la barre qui avance ; sur l'ensemble : tout le contenu est affiché une fois et une seule."""
    vue, art = pg.query_selector(V), pg.query_selector('#x-' + eid)
    pg.evaluate(PG_REPERE, art)
    n, bouton = 0, False
    while n < 40:
        e = pg.evaluate(X_ETAT, vue)
        if not e or e['id'] != eid: break
        n += 1
        w = '%s page %d' % (ou, n)
        chk(e['k'] == rang and e['n'] == total and e['num'] == e['carte'], '%s : compteur %s / %s, numéro %s (attendu %s / %s, numéro %s)' % (w, e['k'], e['n'], e['num'], rang, total, e['carte']))
        chk(e['large'] <= 0 and not e['depasse'], '%s : débordement horizontal %s %s' % (w, e['large'], e['depasse']))
        chk(e['haut'] <= 0 and e['sous'] <= 0, '%s : page à faire défiler (%s px, %s px sous les boutons)' % (w, e['haut'], e['sous']))
        chk(e['texte'] > 0 or e['dessin'], w + ' : page vide')
        chk(len(e['questions']) <= 1, '%s : plusieurs questions sur la même page %s' % (w, e['questions']))
        chk(e['tete'] == 0 and len(e['titre']) > 2, '%s : le titre de l’exercice doit être dans la barre du haut' % w)
        chk(e['barre'] > barre, '%s : la barre ne se remplit pas (%s puis %s)' % (w, barre, e['barre'])); barre = e['barre']
        chk(n > 1 or rang > 1 or e['premier'], w + ' : « Précédent » doit être inactif à la toute première page')
        pg.evaluate(PG_VU, art)
        if forme: forme(art, w)
        if e['enonce'] and not bouton:      # le bouton « Énoncé » fait réapparaître l'énoncé, puis le retire
            bouton = True
            pg.evaluate(CLIC, V + ' .stmt-b'); e2 = pg.evaluate(X_ETAT, vue)
            chk(e2['vuEnonce'] > e['vuEnonce'], w + ' : le bouton « Énoncé » n’affiche pas l’énoncé')
            pg.evaluate(CLIC, V + ' .stmt-b'); e3 = pg.evaluate(X_ETAT, vue)
            chk(e3['vuEnonce'] == e['vuEnonce'] and e3['questions'] == e['questions'], w + ' : un second appui sur « Énoncé » doit le retirer')
        compte['pages_exos'] += 1
        pg.evaluate(CLIC, V + ' .pg-next')
    chk(n > 0, ou + ' : l’exercice ne s’ouvre pas')
    for x in pg.evaluate(PG_BILAN, art): fails.append('%s : %s' % (ou, x))
    return barre

# ---------- Le contrôle blanc en pages ----------
T_ETAT = r"""(v) => { const b = v.querySelector('.test-box'), de = document.documentElement, c = v.querySelector('.pg-count').textContent.split('/').map(Number);
  const vus = (s) => [...b.querySelectorAll(s)].filter(e => e.offsetParent);
  return { k: c[0], n: c[1], barre: parseFloat(v.querySelector('.pgbar i').style.width) || 0, haut: de.scrollHeight - innerHeight, large: de.scrollWidth - de.clientWidth,
    texte: b.innerText.trim().length, questions: vus('.tq').map(q => Number(q.dataset.i)), choix: vus('.choice').length, rep: v.querySelector('.t-rep').innerText.trim(),
    premier: v.querySelector('.pg-prev').disabled, dernier: v.querySelector('.pg-next').disabled, suite: v.querySelector('.pg-next-t').innerText.trim(),
    corriger: vus('.test-go').length, nums: vus('.t-num').map(n => n.className.replace('t-num', '').trim()), score: (vus('.score .big')[0] || { textContent: '' }).textContent.trim(),
    depasse: [...b.querySelectorAll('*')].filter(n => { const r = n.getBoundingClientRect(); return r.width && r.right > de.clientWidth + 1; }).map(n => n.tagName + '.' + n.className).slice(0, 3) }; }"""
def controle_pages(pg, ch, ou):
    """Un contrôle blanc complet, page par page : la consigne, une question par page, la page « Corriger », puis le résultat et les corrections."""
    C = '#v-controle-' + ch
    pg.goto(URL + '#' + ch + '/controle'); pg.wait_for_timeout(120)
    # un sujet neuf : on corrige celui qui est en cours s'il y en a un, puis « Nouveau contrôle »
    pg.evaluate("""(C) => { const go = document.querySelector(C + ' .test-go');
      if (go && !go.disabled) { document.querySelectorAll(C + ' .tq').forEach(q => q.querySelector('.choice').click()); go.click(); }
      document.querySelector(C + ' .test-new').click(); }""", C)
    pg.wait_for_timeout(60)
    vue, boite = pg.query_selector(C), pg.query_selector(C + ' .test-box')
    def page(w, barre):
        e = pg.evaluate(T_ETAT, vue)
        chk(e['large'] <= 0 and not e['depasse'], '%s : débordement horizontal %s %s' % (w, e['large'], e['depasse']))
        chk(e['haut'] <= 0, '%s : page à faire défiler (%s px)' % (w, e['haut']))
        chk(e['texte'] > 0, w + ' : page vide')
        chk(e['barre'] > barre, '%s : la barre ne se remplit pas (%s puis %s)' % (w, barre, e['barre']))
        compte['pages_controle'] += 1
        return e
    # avant la correction : 12 pages, une question par page
    e = page(ou + ' contrôle page 1', -1)
    chk(e['k'] == 1 and e['n'] == 12 and e['premier'] and not e['questions'], '%s contrôle : la première page est la consigne, sur 12 pages (%s)' % (ou, e))
    chk(e['rep'].startswith('0 / 10'), '%s contrôle : en haut, « 0 / 10 réponses » au départ (%s)' % (ou, e['rep']))
    faites = 0
    for i in range(10):
        pg.click(C + ' .pg-next'); e = page('%s contrôle question %d' % (ou, i + 1), e['barre'])
        chk(e['k'] == i + 2 and e['questions'] == [i] and e['choix'] >= 2, '%s contrôle : la page %d doit montrer la question %d seule (%s)' % (ou, i + 2, i + 1, e))
        if i not in (3, 7):
            pg.click('%s .tq[data-i="%d"] .choice:nth-child(%d)' % (C, i, i % e['choix'] + 1)); faites += 1
            r = pg.evaluate(T_ETAT, vue)['rep']
            chk(r.startswith('%d / 10' % faites), '%s contrôle : le compte des réponses en haut (%s, attendu %d)' % (ou, r, faites))
    pg.click(C + ' .pg-next'); e = page(ou + ' contrôle dernière page', e['barre'])
    chk(e['k'] == 12 and e['corriger'] == 1 and e['dernier'] and not e['questions'], '%s contrôle : la dernière page porte le bouton « Corriger » et rien après (%s)' % (ou, e))
    chk(len(e['nums']) == 10 and [n for n, c in enumerate(e['nums']) if 'on' not in c.split()] == [3, 7], '%s contrôle : les numéros sans réponse doivent être 4 et 8 (%s)' % (ou, e['nums']))
    chk(abs(e['barre'] - 100) < 0.6, '%s contrôle : barre pleine à la dernière page (%s)' % (ou, e['barre']))
    # un numéro ramène à sa question
    pg.click(C + ' .t-num[data-q="3"]'); e = pg.evaluate(T_ETAT, vue)
    chk(e['k'] == 5 and e['questions'] == [3], '%s contrôle : le numéro 4 doit ouvrir la page de la question 4 (%s)' % (ou, e))
    pg.click(C + ' .tq[data-i="3"] .choice:nth-child(1)')
    for _ in range(7): pg.click(C + ' .pg-next')
    e = pg.evaluate(T_ETAT, vue)
    chk(e['k'] == 12 and [n for n, c in enumerate(e['nums']) if 'on' not in c.split()] == [7], '%s contrôle : après une réponse de plus, seul le numéro 8 reste vide (%s)' % (ou, e['nums']))
    pg.click(C + ' .test-go'); pg.wait_for_timeout(60)
    # après la correction : le résultat d'abord, puis chaque question et son explication
    e = page(ou + ' contrôle résultat', -1)
    pts = int(e['score'].split('/')[0]) if '/' in e['score'] else -1
    chk(e['k'] == 1 and e['premier'] and pts >= 0 and e['rep'] == e['score'], '%s contrôle : après « Corriger », la première page donne la note (%s)' % (ou, e))
    chk(len(e['nums']) == 10 and 2 * len([c for c in e['nums'] if 'ok' in c.split()]) == pts and [n for n, c in enumerate(e['nums']) if 'vide' in c.split()] == [7],
        '%s contrôle : les numéros du résultat (justes, faux, sans réponse) ne correspondent pas à la note %s : %s' % (ou, e['score'], e['nums']))
    total = e['n']
    chk(total >= 11, '%s contrôle : le résultat et dix corrections font au moins 11 pages (%s)' % (ou, total))
    pg.click(C + ' .t-num[data-q="7"]'); e7 = pg.evaluate(T_ETAT, vue)
    chk(e7['questions'] == [7], '%s contrôle : le numéro 8 du résultat doit ouvrir la correction de la question 8 (%s)' % (ou, e7))
    for _ in range(total): pg.click(C + ' .pg-prev') if not pg.evaluate(T_ETAT, vue)['premier'] else None
    pg.evaluate(PG_REPERE, boite)
    e = pg.evaluate(T_ETAT, vue); barre = -1
    vues = set()
    for k in range(1, total + 1):
        e = page('%s contrôle corrigé page %d/%d' % (ou, k, total), barre); barre = e['barre']
        chk(e['k'] == k and e['n'] == total, '%s contrôle corrigé : compteur %s / %s à la page %d' % (ou, e['k'], e['n'], k))
        chk(len(e['questions']) <= 1, '%s contrôle corrigé page %d : plusieurs questions %s' % (ou, k, e['questions']))
        vues.update(e['questions'])
        pg.evaluate(PG_VU, boite)
        verifie_pose(pg, boite, '%s %s contrôle corrigé page %d' % (ou, ch, k))
        if k < total: pg.click(C + ' .pg-next')
    chk(vues == set(range(10)), '%s contrôle corrigé : questions vues %s' % (ou, sorted(vues)))
    for x in pg.evaluate(PG_BILAN, boite): fails.append('%s contrôle corrigé : %s' % (ou, x))
    chk(e['suite'] in ('Nouveau contrôle', 'Nuova verifica') and not e['dernier'], '%s contrôle corrigé : à la dernière page, le bouton propose un nouveau contrôle (%s)' % (ou, e['suite']))
    pg.click(C + ' .pg-next'); pg.wait_for_timeout(60)
    e = pg.evaluate(T_ETAT, vue)
    chk(e['k'] == 1 and e['n'] == 12 and e['rep'].startswith('0 / 10'), '%s contrôle : « Nouveau contrôle » doit ouvrir un sujet neuf à sa première page (%s)' % (ou, e))

# Par chapitre : recalcul de l'entraînement, recalcul du contrôle, thèmes de l'entraînement
RECALCUL = {'c10': (tr_c10, qcm_c10, ['cm', 'succ', 'recip', 'init', 'mix']),
            'c3': (tr_c3, qcm_c3, ['calc', 'rac', 'dev', 'fact', 'eq', 'ineq', 'mix']),
            't1': (tr_t1, qcm_t1, ['prio', 'nat', 'frac', 'fprio', 'p10', 'sci', 'mix'])}
SANS_BALISE = re.compile(r'<[^>]+>')
def plat(s): return re.sub(r'\s+', ' ', norm(s))      # un texte lu à l'écran, sans ses retours à la ligne
def debut(html): return plat(SANS_BALISE.sub('', re.sub(r'<br\s*/?>', ' ', html)))[:25]      # début d'un message, tel qu'il se lit à l'écran

def tape_cases(box, vals):
    """Remplit les cases d'une question (exercice) et vérifie. Renvoie False si une valeur ne peut pas être tapée (pas de bouton de signe)."""
    for i, v in enumerate(vals):
        b = box.query_selector('.bx[data-b="%d"]' % i); sg = box.query_selector('.sgn[data-b="%d"]' % i)
        if v < 0 and not sg: return False
        b.fill(frnum(abs(float(v)), 8))
        if sg and (sg.get_attribute('data-s') == '-1') != (v < 0): sg.click()
    box.query_selector('.chk').click()
    return True

def reponds(pg, card, exp):
    """Tape la réponse attendue dans une question d'entraînement. exp : nombre (un champ) ou liste (cases)."""
    if isinstance(exp, (list, tuple)):
        for i, v in enumerate(exp):
            box = card.query_selector('.bx[data-b="%d"]' % i)
            sg = card.query_selector('.sgn[data-b="%d"]' % i)
            box.fill(frnum(abs(float(v)), 8))
            if sg and (sg.get_attribute('data-s') == '-1') != (v < 0): sg.click()
            if not sg and v < 0: return False
    else:
        card.query_selector('input').fill(frnum(float(exp), 8))
    card.query_selector('.chk').click()
    return True

with sync_playwright() as p:
    navigateur = p.chromium.launch(executable_path=os.environ.get('CHROMIUM') or None)
    pg = navigateur.new_page(viewport={'width': 390, 'height': 844})
    pg.on('pageerror', lambda e: errs.append('pageerror: ' + str(e)))
    pg.on('console', lambda m: errs.append('console: ' + m.text) if m.type == 'error' and 'ERR_' not in m.text and 'Failed to load' not in m.text else None)
    pg.goto(URL); pg.wait_for_timeout(300)
    pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(300)
    # les marges de l'iPhone 13 (encoche en haut, barre d'accueil en bas) : la place disponible pour une page est celle du téléphone
    try:
        pg.context.new_cdp_session(pg).send('Emulation.setSafeAreaInsetsOverride', {'insets': {'top': 47, 'bottom': 34, 'left': 0, 'right': 0}})
        pg.wait_for_timeout(100)
    except Exception as ex: info.append('marges de l’iPhone non émulées : ' + str(ex)[:80])
    info.append('marge haute de la barre : ' + pg.evaluate("getComputedStyle(document.querySelector('.appbar')).paddingTop"))
    pg.evaluate(POLICES); pg.wait_for_timeout(300)
    # premier lancement : l'accueil demande la classe ; chaque classe a ses chapitres ; la 3e est en français seulement
    chk(pg.evaluate("document.getElementById('v-accueil').classList.contains('choix')") and not pg.query_selector_all('#home-list .chap') and pg.is_hidden('#v-accueil .coach'),
        'au premier lancement, l’accueil doit seulement demander la classe')
    niveaux = pg.evaluate("[...document.querySelectorAll('#home-niv [data-niv]')].map(b => b.dataset.niv)")
    chk(niveaux == ['2de', '3e'], 'classes proposées : %s' % niveaux)
    chaps, NIV, MONO = [], {}, set()
    for k in niveaux:
        pg.click('#home-niv [data-niv="%s"]' % k); pg.wait_for_timeout(100)
        liste = pg.evaluate("[...document.querySelectorAll('#home-list .chap')].map(a => a.dataset.ch)")
        etat = pg.evaluate("({ mono: document.documentElement.classList.contains('mono'), lang: document.documentElement.getAttribute('data-lang'), choix: document.getElementById('v-accueil').classList.contains('choix'), sous: document.querySelector('.brand-s').innerText, appuye: document.querySelector('#home-niv [aria-pressed=\"true\"]').dataset.niv })")
        chk(liste and not etat['choix'] and etat['appuye'] == k, 'classe %s : chapitres %s, état %s' % (k, liste, etat))
        chk(pg.is_hidden('.seg') == etat['mono'] and (etat['lang'] == 'fr' if etat['mono'] else etat['lang'] == 'both'), 'classe %s : choix de la langue %s' % (k, etat))
        for c in liste: NIV[c] = k
        if etat['mono']: MONO.update(liste)
        chaps += liste
    chk(len(set(chaps)) == len(chaps) and MONO == {c for c in chaps if NIV[c] == '3e'}, 'chapitres par classe : %s, en français seulement : %s' % (NIV, MONO))
    info.append('chapitres : ' + ', '.join('%s (%s)' % (c, NIV[c]) for c in chaps))
    chk(set(chaps) == set(e['ch'] for e in data), 'chapitres affichés %s, chapitres des données %s' % (chaps, sorted(set(e['ch'] for e in data))))
    chk(pg.is_hidden('.tabbar'), "la barre d'onglets doit être cachée sur l'accueil")
    for ch in chaps:
        exos = [e for e in data if e['ch'] == ch]
        V = '#v-exercices-' + ch
        info.append('%s : %d exercices, %d questions' % (ch, len(exos), sum(len(e['parts']) for e in exos)))
        # 1. Chaque question des exercices : pièges, puis bonne réponse
        pg.goto(URL + '#' + ch + '/exercices'); pg.wait_for_timeout(200)
        # à l'ouverture, la liste est courte : le premier groupe où il reste un exercice à faire
        f0, n0 = pg.evaluate("(V) => [document.querySelector(V + ' .ex-filter .chip[aria-pressed=\"true\"]').dataset.f, document.querySelectorAll(V + ' .exo').length]", V)
        chk(f0 != 'all' and n0 == len([e for e in exos if e['group'] == f0]) and n0 > 0, '%s : à l’ouverture, la liste doit montrer un seul groupe (%s, %d cartes)' % (ch, f0, n0))
        pg.click(V + ' .ex-filter .chip[data-f="all"]')
        chk(len(pg.query_selector_all(V + ' .exo')) == len(exos), ch + ' : « Tous » doit lister tous les exercices')
        for e in exos:
            art = pg.query_selector('#x-' + e['id'])
            if not art: fails.append('carte absente ' + e['id']); continue
            ouvre_exo(pg, V, e['id'])
            st = pg.evaluate(X_ETAT, pg.query_selector(V))
            chk(st and st['id'] == e['id'] and pg.is_hidden(V + ' .summary') and pg.is_hidden('.tabbar'), e['id'] + ' : l’exercice touché doit prendre tout l’écran (liste et onglets effacés)')
            for j, part in enumerate(e['parts']):
                box = art.query_selector('.part[data-j="%d"]' % j)
                w = '%s q%d' % (e['id'], j + 1)
                if part['kind'] == 'num':
                    inp = box.query_selector('input')
                    va_a(pg, V, inp, w)
                    for t in part.get('traps', []):
                        inp.fill(frnum(t['v'], 8)); box.query_selector('.chk').click()
                        fb = plat(box.query_selector('.fbw').inner_text())
                        chk(debut(t['fr']) in fb, '%s piège %s non reconnu : %s' % (w, t['v'], fb[:60]))
                    if part['sign'] == 'strict' and abs(part['ans']) > part['tol'] * 3:
                        inp.fill(frnum(-part['ans'], dec(part['tol']))); box.query_selector('.chk').click()
                        fb = norm(box.query_selector('.fbw').inner_text())
                        trap_hit = any(abs(-part['ans'] - t['v']) <= (max(part['tol'], .006) if part['tol'] else 0) + 1e-9 for t in part.get('traps', []))
                        chk(trap_hit or 'signe' in fb, '%s signe non détecté : %s' % (w, fb[:60]))
                    inp.fill(frnum(part['ans'], dec(part['tol']))); box.query_selector('.chk').click()
                    chk('juste' in box.query_selector('.fbw').inner_text(), '%s bonne réponse %s refusée : %s' % (w, frnum(part['ans'], dec(part['tol'])), box.query_selector('.fbw').inner_text()[:60]))
                elif part['kind'] == 'choice':
                    goods = part['correct'] if isinstance(part['correct'], list) else [part['correct']]
                    btns = box.query_selector_all('.choice')
                    chk(len(btns) == len(part['choices']), w + ' : nombre de boutons')
                    va_a(pg, V, btns[0], w)
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
                elif part['kind'] == 'fill':
                    va_a(pg, V, box.query_selector('.bx'), w)
                    ans = part['ans']
                    for t in part.get('traps', []):
                        if any(x is None for x in t['v']) or not tape_cases(box, t['v']): continue
                        fb = plat(box.query_selector('.fbw').inner_text())
                        chk(debut(t['fr']) in fb and 'solved' not in (box.get_attribute('class') or ''), '%s piège %s non reconnu : %s' % (w, t['v'], fb[:60]))
                    for haut, bas in part.get('frac', []):      # une fraction égale mais pas irréductible
                        v = list(ans); v[haut] *= 2; v[bas] *= 2
                        tape_cases(box, v)
                        chk('irréductible' in box.query_selector('.fbw').inner_text(), '%s : la fraction non simplifiée %s doit être signalée' % (w, v))
                    if part.get('sci'):                    # le même nombre, mais pas en écriture scientifique
                        v = list(ans); v[part['sci'][0]] *= 10; v[part['sci'][1]] -= 1
                        tape_cases(box, v)
                        chk('écriture scientifique' in box.query_selector('.fbw').inner_text(), '%s : %s n’est pas une écriture scientifique' % (w, v))
                    faux = list(ans); faux[0] += 1
                    tape_cases(box, faux)
                    chk('solved' not in (box.get_attribute('class') or ''), '%s : réponse fausse %s acceptée' % (w, faux))
                    chk(tape_cases(box, ans), w + ' : la bonne réponse ne peut pas être tapée (signe)')
                    chk('juste' in box.query_selector('.fbw').inner_text() and 'solved' in (box.get_attribute('class') or ''), '%s bonne réponse %s refusée : %s' % (w, ans, box.query_selector('.fbw').inner_text()[:60]))
                elif part['kind'] == 'self':
                    chk(box.query_selector('.panel.sol').is_hidden(), w + ' : la solution doit être cachée au départ')
                    va_a(pg, V, box.query_selector('.sb'), w)
                    chk(box.query_selector('.selfhow').is_visible(), w + ' : la consigne « sur ton cahier » doit être affichée avant la solution')
                    if part.get('hint'):
                        box.query_selector('.hb').click()
                        chk(box.query_selector('.panel.hint').is_visible(), w + " : l'indice ne s'ouvre pas")
                    box.query_selector('.sb').click()
                    chk(box.query_selector('.panel.sol').is_visible(), w + " : la solution ne s'ouvre pas")
                    va_a(pg, V, box.query_selector('.sok'), w)      # la solution peut continuer sur les pages suivantes : les deux boutons sont à la fin
                    box.query_selector('.sok').click()
                    cl = lambda el: (el.get_attribute('class') or '').split()
                    faites = sum(1 for x in art.query_selector_all('.part') if 'solved' in cl(x))      # un exercice peut avoir plusieurs questions à faire sur le cahier
                    chk('solved' in cl(box) and ('done' if faites == len(e['parts']) else 'part-done') in cl(art), w + ' pas marqué réussi')
                    chk('réussi' in box.query_selector('.selfq .fbw').inner_text(), w + ' : le message de réussite doit s’afficher sous les deux boutons')
                    box.query_selector('.sko').click()
                    chk('solved' not in cl(box) and 'done' not in cl(art) and ('part-done' in cl(art)) == (faites > 1), w + ' : « À refaire » ne retire pas la réussite')
                    box.query_selector('.sok').click()
                else:
                    fails.append(w + ' : type de question inconnu du test : ' + str(part['kind']))
            chk('done' in (art.get_attribute('class') or ''), e['id'] + ' pas marqué réussi')
            chk('done' in (pg.get_attribute(V + ' .ex-num', 'class') or ''), e['id'] + ' : en haut, le numéro doit passer au vert quand l’exercice est réussi')
            ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
            chk(ov <= 0, 'débordement exercice %s : %s' % (e['id'], ov))
            # mise en forme : tout l'exercice affiché d'un coup (toutes les pages, indices et solutions)
            pg.evaluate("(a) => { a.querySelectorAll('.pg-off').forEach(x => x.classList.remove('pg-off')); a.querySelectorAll('.panel[hidden]').forEach(p => p.hidden = false); }", art)
            verifie_pose(pg, '#x-' + e['id'], 'exercice ' + e['id'])
            liste_exos(pg, V)
            chk(pg.is_visible(V + ' .summary') and pg.is_visible('.tabbar') and not pg.query_selector(V + ' .exo.open'), e['id'] + ' : la flèche du haut doit ramener à la liste et aux onglets')
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
                # la question tient au-dessus du bouton « Nouvelle question », toujours visible en bas
                sous = pg.evaluate("(T) => { const v = document.querySelector(T); return Math.round(v.querySelector('.tr-card').getBoundingClientRect().bottom - v.querySelector('.pgnav').getBoundingClientRect().top); }", T)
                chk(sous <= 0 and pg.is_visible(T + ' .tr-next'), '%s entraînement : la question passe sous le bouton du bas (%s px) : %s' % (ch, sous, fr[:60].replace('\n', ' ')))
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
                    if ch in ('c3', 't1') and exp[0] != 'choix':
                        for x in (verifie_solution if ch == 'c3' else verifie_solution_t1)(pg, card, exp): fails.append('%s solution : %s | %s' % (ch, fr[:70].replace('\n', ' '), x))
                else: fails.append('%s entraînement refusé : %s | %s | %s' % (ch, fr[:90], exp[1], norm(fb)[:60]))
                ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
                chk(ov <= 0, '%s débordement entraînement : %s' % (ch, fr[:60]))
                pg.evaluate("(c) => c.querySelectorAll('.panel[hidden]').forEach(p => p.hidden = false)", card)
                verifie_pose(pg, T + ' .tr-card', '%s entraînement « %s »' % (ch, fr[:50].replace('\n', ' ')))
                pg.click(T + ' .tr-next')
        info.append('%s entraînement juste : %d / %d' % (ch, n_ok, n_tr))
        # la barre du haut se remplit en cinq bonnes réponses de suite
        serie, barre = pg.evaluate("(T) => { const v = document.querySelector(T); return [Number(v.querySelector('.tr-streak').textContent), parseFloat(v.querySelector('.pgbar i').style.width) || 0]; }", T)
        chk(abs(barre - (((serie - 1) % 5 + 1) * 20 if serie else 0)) < 0.5, '%s entraînement : barre à %s %% pour une série de %s' % (ch, barre, serie))
        # 3. Contrôle blanc : 15 sujets, bonne réponse recalculée
        pg.goto(URL + '#' + ch + '/controle'); pg.wait_for_timeout(200)
        C = '#v-controle-' + ch
        n_q = 0
        for s in range(15):
            qs = pg.query_selector_all(C + ' .tq')
            chk(len(qs) == 10, '%s : le contrôle doit avoir 10 questions, il en a %d' % (ch, len(qs)))
            # les questions sont une par page : on répond et on corrige sans tourner les pages, puis on affiche tout pour relire les corrections
            pg.evaluate("(C) => { document.querySelectorAll(C + ' .tq').forEach(q => q.querySelector('.choice').click()); document.querySelector(C + ' .test-go').click(); }", C)
            pg.wait_for_timeout(50)
            pg.evaluate("(C) => document.querySelectorAll(C + ' .test-box .pg-off').forEach(x => x.classList.remove('pg-off'))", C)
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
                if ch in ('c3', 't1'):
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
            verifie_pose(pg, C + ' .test-box', '%s contrôle corrigé' % ch)
            pg.evaluate("(C) => document.querySelector(C + ' .test-new').click()", C); pg.wait_for_timeout(50)
        info.append('%s questions de contrôle vérifiées : %d' % (ch, n_q))
    # 4. Navigation : accueil, carte du chapitre, onglets, anciennes adresses
    for ch in chaps:
        pg.goto(URL + '#' + NIV[ch]); pg.wait_for_timeout(150)      # l'accueil de la classe du chapitre
        chk(pg.is_visible('#v-accueil') and pg.evaluate("[...document.querySelectorAll('#home-list .chap')].map(a => a.dataset.ch)") == [c for c in chaps if NIV[c] == NIV[ch]], '%s : l’adresse #%s doit montrer les chapitres de cette classe' % (ch, NIV[ch]))
        pg.click('#home-list .chap[data-ch="%s"]' % ch); pg.wait_for_timeout(100)
        chk(pg.is_visible('.tabbar'), ch + " : barre d'onglets absente dans le chapitre")
        for v in ['cours', 'exercices', 'entrainement', 'controle']:
            pg.click('.tab[data-v="%s"]' % v); pg.wait_for_timeout(60)
            vis = pg.evaluate("[...document.querySelectorAll('main > .view')].filter(v => !v.hidden).map(v => v.id)")
            chk(vis == ['v-%s-%s' % (v, ch)], '%s onglet %s : vues visibles %s' % (ch, v, vis))
        pg.click('.tab[href="#accueil"]'); pg.wait_for_timeout(60)
        chk(pg.is_visible('#v-accueil') and pg.is_hidden('.tabbar'), ch + " : retour à l'accueil")
        chk(pg.evaluate("document.querySelector('#home-niv [aria-pressed=\"true\"]').dataset.niv") == NIV[ch] and pg.query_selector('#home-list .chap[data-ch="%s"]' % ch) is not None, ch + ' : l’accueil doit rester sur la classe du chapitre quitté')
    # une classe en français seulement le reste, quelle que soit la langue choisie en Seconde ; la langue de la Seconde n'est pas perdue
    if MONO:
        c3e = sorted(MONO)[0]; c2de = [c for c in chaps if c not in MONO][0]
        pg.goto(URL + '#2de'); pg.wait_for_timeout(80); pg.click('.seg button[data-lang="it"]')
        pg.goto(URL + '#' + c3e + '/cours'); pg.wait_for_timeout(120)
        et = pg.evaluate("({ lang: document.documentElement.getAttribute('data-lang'), it: [...document.querySelectorAll('main .it')].filter(x => x.offsetParent).length, sous: document.querySelector('.brand-s').innerText })")
        chk(et['lang'] == 'fr' and et['it'] == 0 and pg.is_hidden('.seg') and '3E' in et['sous'].upper(), '%s : un chapitre de 3e doit s’afficher en français, sans choix de langue (%s)' % (c3e, et))
        pg.goto(URL + '#' + c2de + '/cours'); pg.wait_for_timeout(120)
        et = pg.evaluate("({ lang: document.documentElement.getAttribute('data-lang'), sous: document.querySelector('.brand-s').innerText })")
        chk(et['lang'] == 'it' and pg.is_visible('.seg') and 'SECONDE' in et['sous'].upper(), '%s : en revenant en Seconde on doit retrouver sa langue (%s)' % (c2de, et))
        pg.click('.seg button[data-lang="both"]')
        # une élève qui utilisait déjà l'application (un chapitre de Seconde ouvert, pas de classe enregistrée) reste en Seconde sans rien choisir
        pg.evaluate("(() => { const s = JSON.parse(localStorage.getItem('evo-chap10-v1')); delete s.niv; localStorage.setItem('evo-chap10-v1', JSON.stringify(s)); })()")
        pg.goto(URL + '#accueil'); pg.reload(); pg.wait_for_timeout(300)
        et = pg.evaluate("({ choix: document.getElementById('v-accueil').classList.contains('choix'), chap: [...document.querySelectorAll('#home-list .chap')].map(a => a.dataset.ch) })")
        chk(not et['choix'] and et['chap'] == [c for c in chaps if NIV[c] == '2de'], 'une élève de Seconde déjà installée ne doit pas avoir à choisir sa classe (%s)' % et)
        # même sans dernier chapitre ouvert : des données enregistrées avant l'arrivée des classes suffisent
        pg.evaluate("(() => { const s = JSON.parse(localStorage.getItem('evo-chap10-v1')); delete s.niv; delete s.last; localStorage.setItem('evo-chap10-v1', JSON.stringify(s)); })()")
        sauve = pg.evaluate("localStorage.getItem('evo-chap10-v1')")
        pg.reload(); pg.wait_for_timeout(300)
        et = pg.evaluate("({ choix: document.getElementById('v-accueil').classList.contains('choix'), chap: [...document.querySelectorAll('#home-list .chap')].map(a => a.dataset.ch) })")
        chk(not et['choix'] and et['chap'] == [c for c in chaps if NIV[c] == '2de'], 'des données d’avant les classes : l’élève est en Seconde sans rien choisir (%s)' % et)
        # au tout premier lancement, changer la langue avant de choisir sa classe ne choisit pas à sa place
        pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(300)
        pg.reload(); pg.wait_for_timeout(300)      # l'application fermée puis rouverte sans avoir choisi : la classe est encore demandée
        chk(pg.evaluate("document.getElementById('v-accueil').classList.contains('choix')") and not pg.query_selector_all('#home-list .chap'), 'premier lancement, application rouverte sans avoir choisi : la classe doit encore être demandée')
        pg.click('.seg button[data-lang="fr"]'); pg.reload(); pg.wait_for_timeout(300)
        et = pg.evaluate("({ choix: document.getElementById('v-accueil').classList.contains('choix'), chap: document.querySelectorAll('#home-list .chap').length, lang: document.documentElement.getAttribute('data-lang') })")
        chk(et['choix'] and et['chap'] == 0 and et['lang'] == 'fr', 'premier lancement, langue changée avant le choix de la classe : la classe doit encore être demandée (%s)' % et)
        pg.evaluate("(s) => localStorage.setItem('evo-chap10-v1', s)", sauve); pg.reload(); pg.wait_for_timeout(300)
    # 4 bis. Le cours en pages : passage d'une partie à l'autre, reprise là où on s'était arrêté, fin du cours, liens vers le cours
    for ch in chaps:
        V = '#v-cours-' + ch
        pg.goto(URL + '#' + ch + '/cours'); pg.wait_for_timeout(100)
        parties = pg.evaluate("[...document.querySelectorAll('%s .toc .chip')].map(c => c.dataset.go)" % V)
        premier, dernier = parties[0], parties[-1]
        chip = V + ' .toc .chip[data-go="%s"]' % premier
        pg.click(chip); pg.click(chip)
        L = pg.query_selector('#' + premier)
        e = pg.evaluate(PG_ETAT, L)
        chk(e['k'] == 1 and e['premier'], '%s : à la première page du cours, « Précédent » doit être inactif (%s)' % (ch, e))
        n1 = e['n']
        for _ in range(n1): pg.evaluate(PG_SUIVANT, L)                     # une page de plus que la partie : on passe à la suivante
        if len(parties) > 1:
            L2 = pg.query_selector('#' + parties[1]); e = pg.evaluate(PG_ETAT, L2)
            chk(e['partie'] == parties[1] and e['k'] == 1 and not e['cache'], '%s : après la dernière page d’une partie, la suivante doit s’ouvrir à sa page 1 (%s)' % (ch, e))
            pg.evaluate(PG_PRECEDENT, L2); e = pg.evaluate(PG_ETAT, L)
            chk(e['partie'] == premier and e['k'] == n1, '%s : « Précédent » à la page 1 doit revenir à la dernière page de la partie d’avant (%s)' % (ch, e))
        # reprise : on quitte le cours au milieu d'une partie, on y revient à la même page
        pg.click(chip); pg.click(chip)
        for _ in range(2): pg.evaluate(PG_SUIVANT, L)
        avant = pg.evaluate(PG_ETAT, L)
        pg.click('.tab[data-v="exercices"]'); pg.wait_for_timeout(60); pg.click('.tab[data-v="cours"]'); pg.wait_for_timeout(60)
        apres = pg.evaluate(PG_ETAT, L)
        chk((apres['partie'], apres['k']) == (avant['partie'], avant['k']) and avant['k'] == 3, '%s : en revenant au cours on doit retrouver sa page (%s puis %s)' % (ch, (avant['partie'], avant['k']), (apres['partie'], apres['k'])))
        pg.reload(); pg.wait_for_timeout(400)
        apres = pg.evaluate(PG_ETAT, pg.query_selector('#' + premier))
        chk((apres['partie'], apres['k']) == (avant['partie'], avant['k']), '%s : après rechargement on doit retrouver sa page (%s)' % (ch, (apres['partie'], apres['k'])))
        # fin du cours : le dernier bouton mène aux exercices
        chipd = V + ' .toc .chip[data-go="%s"]' % dernier
        pg.click(chipd); pg.click(chipd)
        Ld = pg.query_selector('#' + dernier); nd = pg.evaluate(PG_ETAT, Ld)['n']
        for _ in range(nd - 1): pg.evaluate(PG_SUIVANT, Ld)
        e = pg.evaluate(PG_ETAT, Ld)
        chk(e['k'] == nd and e['suite'].startswith('Exercices'), '%s : à la dernière page du cours le bouton doit proposer les exercices (%s)' % (ch, e['suite']))
        pg.evaluate(PG_SUIVANT, Ld); pg.wait_for_timeout(80)
        chk(pg.is_visible('#v-exercices-' + ch), '%s : le dernier « Suivant » du cours doit ouvrir les exercices' % ch)
        # un lien vers un endroit du cours ouvre la page où il se trouve
        cibles = pg.evaluate("[...new Set([...document.querySelectorAll('%s [id]')].filter(e => /^H[34]$/.test(e.tagName)).map(e => e.id))]" % V)
        for cible in cibles[:6] + cibles[-3:]:
            pg.goto(URL + '#' + ch + '/exercices'); pg.wait_for_timeout(40)
            pg.evaluate("(id) => { const a = document.createElement('a'); a.setAttribute('data-go', id); a.href = '#'; a.textContent = 'x'; document.querySelector('main').appendChild(a); a.click(); a.remove(); }", cible)
            pg.wait_for_timeout(80)
            vu = pg.evaluate("(id) => { const e = document.getElementById(id); return !!e.offsetParent && e.getBoundingClientRect().top < innerHeight; }", cible)
            chk(vu and pg.is_visible(V), '%s : le lien vers « %s » n’ouvre pas la bonne page du cours' % (ch, cible))
    if 'c10' in chaps:
        for v in ['cours', 'exercices', 'entrainement', 'controle']:
            pg.goto(URL + '#' + v); pg.wait_for_timeout(60)
            chk(pg.is_visible('#v-%s-c10' % v), 'ancienne adresse #%s' % v)
    # 4 ter. Les exercices un par un : série d'un groupe, Précédent / Suivant, retour à la liste, reprise, liens depuis le cours, flèches du clavier
    for ch in chaps:
        V = '#v-exercices-' + ch
        vue = pg.query_selector(V)
        pg.goto(URL + '#' + ch + '/exercices'); pg.wait_for_timeout(100)
        groupes = [g for g in pg.evaluate("(V) => [...document.querySelectorAll(V + ' .ex-filter .chip')].map(c => c.dataset.f)", V) if g not in ('all', 'todo')]
        g = next(x for x in groupes if len([e for e in data if e['ch'] == ch and e['group'] == x]) >= 3)
        pg.click(V + ' .ex-filter .chip[data-f="%s"]' % g)
        ids = pg.evaluate("(V) => [...document.querySelectorAll(V + ' .exo')].map(a => a.id.slice(2))", V)
        chk(sorted(ids) == sorted(e['id'] for e in data if e['ch'] == ch and e['group'] == g), '%s : la liste du groupe %s' % (ch, g))
        ouvre_exo(pg, V, ids[0]); e = pg.evaluate(X_ETAT, vue)
        chk(e and e['id'] == ids[0] and e['k'] == 1 and e['n'] == len(ids) and e['premier'], '%s : premier exercice du groupe %s ouvert (%s)' % (ch, g, e))
        ouvre_exo(pg, V, ids[0])      # sa carte est cachée : seul le bouton du haut ramène à la liste
        liste_exos(pg, V)
        chk(not pg.query_selector(V + ' .exo.open') and pg.is_visible('#x-' + ids[1]) and pg.is_hidden(V + ' .pgnav'), ch + ' : retour à la liste du groupe')
        ouvre_exo(pg, V, ids[1]); e = pg.evaluate(X_ETAT, vue)
        chk(e['id'] == ids[1] and e['k'] == 2 and not e['premier'], '%s : deuxième exercice du groupe (%s)' % (ch, e))
        b1 = e['barre']
        pg.evaluate(CLIC, V + ' .pg-prev'); e = pg.evaluate(X_ETAT, vue)
        chk(e['id'] == ids[0] and e['barre'] < b1, '%s : « Précédent » à la première page d’un exercice revient à la fin du précédent (%s)' % (ch, e))
        pg.evaluate(CLIC, V + ' .pg-next'); e = pg.evaluate(X_ETAT, vue)
        chk(e['id'] == ids[1] and abs(e['barre'] - b1) < 0.01, '%s : « Suivant » à la dernière page d’un exercice ouvre le suivant à sa première page (%s)' % (ch, e))
        pg.keyboard.press('ArrowRight'); e2 = pg.evaluate(X_ETAT, vue)
        chk(e2 and e2['barre'] > e['barre'], ch + ' : la flèche droite du clavier tourne la page')
        pg.keyboard.press('ArrowLeft'); e2 = pg.evaluate(X_ETAT, vue)
        chk(e2['id'] == ids[1] and abs(e2['barre'] - b1) < 0.01, ch + ' : la flèche gauche du clavier revient')
        # reprise : on va voir le cours (un renvoi de l'exercice y mène), on revient au même exercice, à la même page
        pg.goto(URL + '#' + ch + '/cours'); pg.wait_for_timeout(60)
        chk(pg.is_visible('.tabbar'), ch + ' : hors d’un exercice ouvert, les onglets doivent être affichés')
        pg.click('.tab[data-v="exercices"]'); pg.wait_for_timeout(60)
        e2 = pg.evaluate(X_ETAT, vue)
        chk(e2 and e2['id'] == ids[1] and abs(e2['barre'] - b1) < 0.01 and pg.is_hidden('.tabbar'), '%s : en revenant aux exercices on retrouve son exercice (%s)' % (ch, e2))
        # le dernier exercice de la série : le bouton ramène à la liste
        liste_exos(pg, V); ouvre_exo(pg, V, ids[-1])
        for _ in range(30):
            e = pg.evaluate(X_ETAT, vue)
            if not e or e['suite'] in ('Liste', 'Lista'): break
            pg.evaluate(CLIC, V + ' .pg-next')
        chk(e and e['id'] == ids[-1] and e['k'] == len(ids) and abs(e['barre'] - 100) < 0.6, '%s : à la dernière page de la série, barre pleine et bouton « Liste » (%s)' % (ch, e))
        pg.evaluate(CLIC, V + ' .pg-next')
        chk(not pg.query_selector(V + ' .exo.open') and pg.is_visible(V + ' .summary'), ch + ' : après le dernier exercice, retour à la liste')
        # un renvoi du cours ouvre l'exercice, dans la liste de son groupe
        cible = next(e for e in data if e['ch'] == ch and e['group'] != g)
        pg.goto(URL + '#' + ch + '/cours'); pg.wait_for_timeout(60)
        pg.evaluate("(id) => { const a = document.createElement('button'); a.setAttribute('data-exo', id); document.querySelector('main').appendChild(a); a.click(); a.remove(); }", cible['id'])
        pg.wait_for_timeout(80)
        e = pg.evaluate(X_ETAT, vue)
        f = pg.evaluate("(V) => document.querySelector(V + ' .ex-filter .chip[aria-pressed=\"true\"]').dataset.f", V)
        chk(pg.is_visible(V) and e and e['id'] == cible['id'] and f == cible['group'], '%s : un renvoi vers l’exercice %s doit l’ouvrir dans son groupe (%s, filtre %s)' % (ch, cible['id'], e and e['id'], f))
        liste_exos(pg, V)
    # 5. Langues et débordement : accueil, chaque vue, chaque partie des cours en plusieurs pages
    for l in ['fr', 'it', 'both']:
        pg.goto(URL + '#2de'); pg.wait_for_timeout(80)
        pg.click('.seg button[data-lang="%s"]' % l)
        for k in niveaux:
            pg.goto(URL + '#' + k); pg.wait_for_timeout(80)
            ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
            chk(ov <= 0, 'débordement %s accueil %s : %s' % (l, k, ov))
        for ch in chaps:
            if ch in MONO and l != 'fr': continue
            for v in ['cours', 'exercices', 'entrainement', 'controle']:
                pg.goto(URL + '#' + ch + '/' + v); pg.wait_for_timeout(80)
                ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
                chk(ov <= 0, 'débordement %s %s %s : %s' % (l, ch, v, ov))
            # le cours, page par page
            pg.goto(URL + '#' + ch + '/cours'); pg.wait_for_timeout(80)
            parties = pg.evaluate("[...document.querySelectorAll('#v-cours-%s .toc .chip')].map(c => c.dataset.go)" % ch)
            for go in parties:
                chip = '#v-cours-%s .toc .chip[data-go="%s"]' % (ch, go)
                pg.click(chip); pg.click(chip)                 # un second appui sur la partie affichée ramène à sa première page
                chk(pg.is_visible('#' + go), '%s : la partie %s ne s’affiche pas' % (ch, go))
                tourne_pages(pg, pg.query_selector('#' + go), '%s %s %s' % (l, ch, go), lambda el, w: verifie_pose(pg, el, w))
            # les exercices, page par page, dans cette langue : d'abord tels qu'on les ouvre, puis solutions affichées
            V = '#v-exercices-' + ch
            pg.goto(URL + '#' + ch + '/exercices'); pg.wait_for_timeout(120)
            pg.click(V + ' .ex-filter .chip[data-f="all"]')
            ids = pg.evaluate("(V) => [...document.querySelectorAll(V + ' .exo')].map(a => a.id.slice(2))", V)
            for etat in ('', ', solutions affichées'):
                barre = -1
                for n, eid in enumerate(ids):
                    ouvre_exo(pg, V, eid)
                    if etat:
                        pg.evaluate("(V) => document.querySelectorAll(V + ' .exo.open .sb[aria-expanded=\"false\"]').forEach(b => b.click())", V)
                        liste_exos(pg, V); ouvre_exo(pg, V, eid)
                    barre = tourne_exo(pg, V, eid, n + 1, len(ids), '%s %s exercice %s%s' % (l, ch, eid, etat), barre, lambda el, w: verifie_pose(pg, el, w))
                    liste_exos(pg, V)
            ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
            chk(ov <= 0, 'débordement %s %s, exercices : %s' % (l, ch, ov))
            # un contrôle blanc complet, page par page, dans cette langue
            controle_pages(pg, ch, l)
    navigateur.close()
info.append('lignes de solution relues : %d, calculs d’explication relus : %d' % (compte['lignes'], compte['explications']))
info.append('mise en forme contrôlée : %d calculs posés, %d formules' % (compte['calculs'], compte['formules']))
info.append('pages tournées dans les trois langues : cours %d, exercices %d, contrôle blanc %d' % (compte['pages'], compte['pages_exos'], compte['pages_controle']))
info.append('chapitres en français seulement : %s' % sorted(MONO))
print('\n'.join(info))
print('erreurs JS:', errs)
print('ÉCHECS:', len(fails))
for f in fails[:60]: print(' -', f)
if fails or errs: sys.exit(1)
