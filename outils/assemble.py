"""Assemble l'application : un seul fichier HTML, plus la version installable dans docs/ (GitHub Pages).
Usage : python3 outils/assemble.py"""
import hashlib, os, re, shutil
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def r(*n): return open(os.path.join(R, 'src', *n), encoding='utf-8').read()

# Les chapitres, dans l'ordre de l'écran d'accueil. Pour en ajouter un : un dossier src/chNN/ (Seconde) ou src/tNN/ (3e) et une ligne ici.
# La classe d'un chapitre se déclare dans son chapitre.js (niv: '3e' ; sans rien : la Seconde).
CHAPITRES = [
    {'dossier': 'ch10', 'cours': ['cours1.html', 'cours2.html'], 'exercices': ['ex_sample.js', 'exA.js', 'exB.js']},
    {'dossier': 'ch03', 'cours': ['cours1.html', 'cours2.html', 'cours3.html'], 'exercices': ['exA.js', 'exB.js']},
    {'dossier': 't01', 'cours': ['cours1.html'], 'exercices': ['exA.js', 'exB.js']},      # 3e : calculs
]
CHAPITRES = [c for c in CHAPITRES if os.path.isfile(os.path.join(R, 'src', c['dossier'], 'chapitre.js'))]
TITRE = 'SCOLAIR : maths avec Hector'

css = '\n'.join(r('commun', f) for f in ['app.css', 'chouette.css', 'scolair.css', 'maths.css'])
# Texte fixe : espace insécable avant la ponctuation haute, après « et entre les groupes de trois chiffres
def nb(t):
    def un(m):
        s = re.sub(r'(\d) (?=\d{3}(?!\d))', '\\1\u00a0', m.group(1))
        return '>' + re.sub(r' ([:;?!%€»])', '\u00a0\\1', s).replace('« ', '«\u00a0') + '<'
    return re.sub(r'>([^<]+)<', un, t)
cours = ''.join(r(c['dossier'], f) for c in CHAPITRES for f in c['cours'])
corps = '<template id="owl-tpl">' + r('commun', 'owl.svg') + '</template>\n' + nb(r('commun', 'shell_top.html') + r('commun', 'accueil.html') + cours + r('commun', 'shell_bottom.html'))
donnees = 'var EXOS = [];\n' + '\n'.join(r(c['dossier'], f) for c in CHAPITRES for f in c['exercices'])
hector = r('commun', 'owl_pre.js') + r('commun', 'chouette.js') + ('\nwindow.Hector = { Owl: Owl, confetti: confetti, phrases: function(a){ if (a && a.length) HECTOR_DIT = a; },\n'
          '  /* les accessoires portés par tous les Hector de la page */\n'
          '  tenue: function(l){ ACCS.forEach(function(a){ S.owl.acc[a.k] = !!l && l.indexOf(a.k) >= 0; }); OWLS.forEach(function(o){ o.dress(); }); } };\n})();\n')
appli = ('(function(){\n' + r('commun', 'base.js') + r('commun', 'question.js') + ''.join(r(c['dossier'], 'chapitre.js') for c in CHAPITRES)
         + r('commun', 'moteur.js') + r('commun', 'hector.js') + r('commun', 'jeu.js') + r('commun', 'depart.js') + '\n})();\n')
tete = ('<!doctype html>\n<html lang="fr" data-lang="both">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<meta name="theme-color" content="#FFFFFF">\n'
        '<meta name="format-detection" content="telephone=no">\n'
        '<title>' + TITRE + '</title>\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Fredoka:wght@500;600;700&family=STIX+Two+Text:ital,wght@0,400;0,600;1,400&display=swap">\n')
page = tete + '<style>\n' + css + '</style>\n</head>\n<body>\n' + corps + '\n<script>\n' + donnees + '\n</script>\n<script>\n' + hector + '</script>\n<script>\n' + appli + '</script>\n</body>\n</html>\n'
os.makedirs(os.path.join(R, 'autonome'), exist_ok=True)
open(os.path.join(R, 'autonome', 'scolair-maths-seconde.html'), 'w', encoding='utf-8').write(page)
# Version installable : manifeste, icônes, service worker, numéro de version
# Le numéro de version change dès que quelque chose change dans ce qui est servi : la page, le script de mise à jour, le service worker.
statique = os.path.join(R, 'statique')
version = hashlib.sha1((page + r('commun', 'maj.js') + open(os.path.join(statique, 'sw.js'), encoding='utf-8').read()).encode()).hexdigest()[:10]
tete_pwa = ('<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icon-180.png">\n<link rel="icon" href="icon-192.png">\n'
            '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n'
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">\n<meta name="apple-mobile-web-app-title" content="SCOLAIR">\n')
pwa = page.replace('<style>\n', tete_pwa + '<style>\n', 1).replace('</body>', '<script>\n' + r('commun', 'maj.js').replace('__V__', version) + '</script>\n</body>')
docs = os.path.join(R, 'docs')
os.makedirs(docs, exist_ok=True)
for f in os.listdir(statique): shutil.copy(os.path.join(statique, f), os.path.join(docs, f))
open(os.path.join(docs, 'index.html'), 'w', encoding='utf-8').write(pwa)
open(os.path.join(docs, 'version.json'), 'w', encoding='utf-8').write('{"v":"' + version + '"}\n')
open(os.path.join(docs, '.nojekyll'), 'w').write('')
ids = re.findall(r'\sid="([^"]+)"', corps)
doublons = sorted({i for i in ids if ids.count(i) > 1})
tirets = page.count('—') + page.count('–')
print('version', version, '| octets', len(page.encode()), '| chapitres', [c['dossier'] for c in CHAPITRES], '| tirets longs ou moyens', tirets, '| identifiants en double', doublons)
if tirets or doublons: raise SystemExit('ÉCHEC : corriger avant de publier')
