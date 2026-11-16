"""Assemble l'application : un seul fichier HTML, plus la version installable dans docs/ (GitHub Pages).
Usage : python3 outils/assemble.py"""
import hashlib, os, re, shutil
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def r(n): return open(os.path.join(R, 'src', n), encoding='utf-8').read()
DONNEES = ['ex_sample.js', 'exA.js', 'exB.js']
css = r('app.css') + '\n' + r('chouette.css') + '\n' + r('scolair.css')
# Espace insécable avant la ponctuation haute du texte fixe
def nb(t): return re.sub(r'>([^<]+)<', lambda m: '>' + re.sub(r' ([:;?!%€])', '\u00a0\\1', m.group(1)) + '<', t)
corps = '<template id="owl-tpl">' + r('owl.svg') + '</template>\n' + nb(r('shell_top.html') + r('cours1.html') + r('cours2.html') + r('shell_bottom.html'))
donnees = 'var EXOS = [];\n' + '\n'.join(r(f) for f in DONNEES)
hector = r('owl_pre.js') + r('chouette.js') + '\nwindow.Hector = { Owl: Owl, confetti: confetti };\n})();\n'
appli = '(function(){\n' + r('app1.js') + r('app2.js') + r('app3.js') + r('app4.js') + '\n})();\n'
tete = ('<!doctype html>\n<html lang="fr" data-lang="both">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<meta name="theme-color" content="#FFFFFF">\n'
        '<title>Évolutions successives et réciproques</title>\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Fredoka:wght@500;600;700&display=swap">\n')
page = tete + '<style>\n' + css + '</style>\n</head>\n<body>\n' + corps + '\n<script>\n' + donnees + '\n</script>\n<script>\n' + hector + '</script>\n<script>\n' + appli + '</script>\n</body>\n</html>\n'
os.makedirs(os.path.join(R, 'autonome'), exist_ok=True)
open(os.path.join(R, 'autonome', 'evolutions-taux-global-reciproque.html'), 'w', encoding='utf-8').write(page)
# Version installable : manifeste, icônes, service worker, numéro de version
version = hashlib.sha1(page.encode()).hexdigest()[:10]
tete_pwa = ('<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icon-180.png">\n<link rel="icon" href="icon-192.png">\n'
            '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n'
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">\n<meta name="apple-mobile-web-app-title" content="Évolutions %">\n')
pwa = page.replace('<style>\n', tete_pwa + '<style>\n', 1).replace('</body>', '<script>\n' + r('maj.js').replace('__V__', version) + '</script>\n</body>')
docs = os.path.join(R, 'docs')
os.makedirs(docs, exist_ok=True)
for f in os.listdir(os.path.join(R, 'statique')): shutil.copy(os.path.join(R, 'statique', f), os.path.join(docs, f))
open(os.path.join(docs, 'index.html'), 'w', encoding='utf-8').write(pwa)
open(os.path.join(docs, 'version.json'), 'w', encoding='utf-8').write('{"v":"' + version + '"}\n')
open(os.path.join(docs, '.nojekyll'), 'w').write('')
ids = re.findall(r'\sid="([^"]+)"', page)
doublons = sorted({i for i in ids if ids.count(i) > 1})
tirets = page.count('\u2014') + page.count('\u2013')
print('version', version, '| octets', len(page.encode()), '| tirets longs ou moyens', tirets, '| identifiants en double', doublons)
if tirets or doublons: raise SystemExit('ÉCHEC : corriger avant de publier')
