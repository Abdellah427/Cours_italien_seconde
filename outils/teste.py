"""Teste toute l'application dans un navigateur à 390 px : chaque exercice (pièges, signe, bonne réponse), l'entraînement et le contrôle recalculés, les langues, le débordement.
Usage : python3 outils/teste.py (après outils/assemble.py). Nécessite playwright et node."""
import re, json, math, subprocess, sys
from playwright.sync_api import sync_playwright
import os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(R, 'autonome', 'evolutions-taux-global-reciproque.html')
D = os.path.join(R, 'src') + '/'
fails, errs, info = [], [], []
def chk(c, m):
    if not c: fails.append(m)
def norm(s): return s.replace(' ', ' ').replace(' ', ' ').replace('−', '-').strip()
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

# Données des exercices, lues avec Node
data = json.loads(subprocess.check_output(['node', '-e',
    "const fs=require('fs'),vm=require('vm');const c={EXOS:[]};vm.createContext(c);"
    "for(const f of ['ex_sample.js','exA.js','exB.js']){try{vm.runInContext(fs.readFileSync('" + D + "'+f,'utf8'),c)}catch(e){}}"
    "process.stdout.write(JSON.stringify(c.EXOS))"]))
info.append('exercices: %d, questions: %d' % (len(data), sum(len(e['parts']) for e in data)))

def tr_expected(fr):
    fr = norm(fr)
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

def qcm_expected(fr):
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

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.on('pageerror', lambda e: errs.append('pageerror: ' + str(e)))
    pg.on('console', lambda m: errs.append('console: ' + m.text) if m.type == 'error' and 'ERR_' not in m.text and 'Failed to load' not in m.text else None)
    pg.goto(URL + '#exercices'); pg.wait_for_timeout(300)
    pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(300)
    # 1. Chaque question des exercices : pièges, puis bonne réponse
    for e in data:
        art = pg.query_selector('#x-' + e['id'])
        if not art: fails.append('carte absente ' + e['id']); continue
        art.query_selector('.exo-h').click()
        for j, part in enumerate(e['parts']):
            box = art.query_selector('.part[data-j="%d"]' % j)
            if part['kind'] == 'num':
                inp = box.query_selector('input')
                for t in part.get('traps', []):
                    inp.fill(frnum(t['v'], 4)); box.query_selector('.chk').click()
                    fb = norm(box.query_selector('.fbw').inner_text())
                    chk(norm(t['fr'])[:25] in fb, '%s q%d piège %s non reconnu : %s' % (e['id'], j + 1, t['v'], fb[:60]))
                if part['sign'] == 'strict' and abs(part['ans']) > part['tol'] * 3:
                    inp.fill(frnum(-part['ans'], dec(part['tol']))); box.query_selector('.chk').click()
                    fb = norm(box.query_selector('.fbw').inner_text())
                    trap_hit = any(abs(-part['ans'] - t['v']) <= max(part['tol'], .006) for t in part.get('traps', []))
                    chk(trap_hit or 'signe' in fb, '%s q%d signe non détecté : %s' % (e['id'], j + 1, fb[:60]))
                inp.fill(frnum(part['ans'], dec(part['tol']))); box.query_selector('.chk').click()
                chk('juste' in box.query_selector('.fbw').inner_text(), '%s q%d bonne réponse %s refusée : %s' % (e['id'], j + 1, frnum(part['ans'], dec(part['tol'])), box.query_selector('.fbw').inner_text()[:60]))
            else:
                box.query_selector_all('.choice')[part['correct']].click()
                chk('juste' in box.query_selector('.fbw').inner_text(), '%s q%d choix correct refusé' % (e['id'], j + 1))
        chk('done' in (art.get_attribute('class') or ''), e['id'] + ' pas marqué réussi')
    chk(pg.inner_text('#ex-count') == '%d / %d' % (len(data), len(data)), 'compteur : ' + pg.inner_text('#ex-count'))
    pg.reload(); pg.wait_for_timeout(300)
    chk(pg.inner_text('#ex-count') == '%d / %d' % (len(data), len(data)), 'progression non sauvegardée')
    # 2. Entraînement : 120 questions recalculées à partir de l'énoncé
    pg.goto(URL + '#entrainement'); pg.wait_for_timeout(200)
    n_ok = 0
    for mode in ['cm', 'succ', 'recip', 'init', 'mix']:
        pg.click('#tr-modes [data-m="%s"]' % mode)
        for _ in range(24):
            fr = pg.inner_text('#tr-card .qtext .fr')
            exp, sign = tr_expected(fr)
            if exp is None: fails.append('entraînement non lu : ' + fr); pg.click('#tr-next'); continue
            pg.fill('#tr-in', frnum(exp, 4)); pg.click('#tr-card .chk')
            fb = pg.inner_text('#tr-card .fbw')
            if 'juste' in fb: n_ok += 1
            else: fails.append('entraînement refusé : %s | %s | %s' % (fr, frnum(exp, 4), fb[:50]))
            pg.click('#tr-next')
    info.append('entraînement juste : %d / 120' % n_ok)
    # 3. Contrôle blanc : 15 sujets, bonne réponse recalculée
    pg.goto(URL + '#controle'); pg.wait_for_timeout(200)
    n_q = 0
    for s in range(15):
        qs = pg.query_selector_all('.tq')
        for q in qs:
            q.query_selector_all('.choice')[0].click()
        pg.click('#test-go'); pg.wait_for_timeout(50)
        for q in pg.query_selector_all('.tq'):
            fr = re.sub(r'^\d+\.\s*', '', norm(q.query_selector('.qtext .fr').inner_text()))
            exp = qcm_expected(fr)
            okb = q.query_selector('.choice.ok .ct .fr') or q.query_selector('.choice.ok .ct')
            got = norm(okb.inner_text())
            opts = [norm(o.inner_text()) for o in q.query_selector_all('.choice .ct')]
            chk(len(set(opts)) == len(opts), 'options en double : %s' % opts)
            if exp is None: fails.append('contrôle non lu : ' + fr); continue
            n_q += 1
            chk(norm(exp) == got.split(' · ')[0], 'contrôle : %s | attendu %s | marqué %s' % (norm(fr)[:70], exp, got))
        pg.click('#test-new'); pg.wait_for_timeout(50)
    info.append('questions de contrôle vérifiées : %d' % n_q)
    # 4. Langues et débordement
    for l in ['fr', 'it', 'both']:
        pg.click('.seg button[data-lang="%s"]' % l)
        for v in ['cours', 'exercices', 'entrainement', 'controle']:
            pg.goto(URL + '#' + v); pg.wait_for_timeout(80)
            ov = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
            chk(ov <= 0, 'débordement %s %s : %s' % (l, v, ov))
    b.close()
print('\n'.join(info))
print('erreurs JS:', errs)
print('ÉCHECS:', len(fails))
for f in fails[:40]: print(' -', f)
if fails or errs: sys.exit(1)
