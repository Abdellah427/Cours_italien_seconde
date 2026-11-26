/* 3e, calculs : priorités, fractions, puissances de 10. Fichier de données : uniquement des EXOS.push({...}). */
EXOS.push({
  "ch": "t1",
  "id": "t1e1",
  "group": "prio",
  "num": "1",
  "src": "fiche de révision",
  "title": "Souligne, puis calcule",
  "stars": 1,
  "text": "<p>Souligne ce que tu calcules en premier, puis écris une étape par ligne <b>sur ton cahier</b>.<br>Ensuite, tape ton résultat.</p>",
  "parts": [
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">20 − 8 − 2</span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 10,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 14,
          "fr": "Tu as calculé 8 − 2 en premier.<br>Les deux soustractions ont la même priorité\u00a0: on calcule de gauche à droite."
        }
      ],
      "hint": "Deux soustractions\u00a0: elles ont la même priorité.<br>Dans quel sens calcule-t-on\u00a0?",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"prem\">20 − 8</span> − 2</span><span class=\"cd m\">= 12 − 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 10</span></div><p>Même priorité\u00a0: de gauche à droite.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">36 ÷ 6 × 2</span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 12,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 3,
          "fr": "Tu as calculé 6 × 2 en premier.<br>La division et la multiplication ont la même priorité\u00a0: on calcule de gauche à droite."
        }
      ],
      "hint": "Une division et une multiplication\u00a0: elles ont la même priorité.<br>Dans quel sens calcule-t-on\u00a0?",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"prem\">36 ÷ 6</span> × 2</span><span class=\"cd m\">= 6 × 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 12</span></div><p>Même priorité\u00a0: de gauche à droite.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">7 + 3 × 4</span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 19,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 40,
          "fr": "Tu as fait l’addition en premier.<br>La multiplication passe avant l’addition."
        }
      ],
      "hint": "Une addition et une multiplication\u00a0: laquelle passe en premier\u00a0?",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">7 + <span class=\"prem\">3 × 4</span></span><span class=\"cd m\">= 7 + 12</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 19</span></div><p>La multiplication passe avant l’addition.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">(7 + 3) × 4</span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 40,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 19,
          "fr": "Tu as fait la multiplication en premier.<br>Ici il y a des parenthèses\u00a0: on calcule 7 + 3 d’abord."
        }
      ],
      "hint": "Il y a des parenthèses\u00a0: que calcule-t-on en premier\u00a0?",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"prem\">(7 + 3)</span> × 4</span><span class=\"cd m\">= 10 × 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 40</span></div><p>La parenthèse d’abord.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">2 × 3<sup>2</sup></span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 18,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 36,
          "fr": "Tu as fait la multiplication en premier.<br>La puissance passe avant\u00a0: calcule <span class=\"m nw\">3<sup>2</sup></span> d’abord."
        },
        {
          "v": 12,
          "fr": "Attention à la puissance\u00a0: <span class=\"m nw\">3<sup>2</sup></span>, c’est <span class=\"m nw\">3 × 3</span>, pas <span class=\"m nw\">3 × 2</span>."
        }
      ],
      "hint": "Une multiplication et une puissance\u00a0: laquelle passe en premier\u00a0?",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2 × <span class=\"prem\">3<sup>2</sup></span></span><span class=\"cd m\">= 2 × 9</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 18</span></div><p>La puissance passe avant la multiplication.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">(2 × 3)<sup>2</sup></span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 36,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 18,
          "fr": "Tu as calculé la puissance en premier.<br>Ici la parenthèse passe avant\u00a0: <span class=\"m nw\">(2 × 3)<sup>2</sup> = 6<sup>2</sup></span>."
        },
        {
          "v": 12,
          "fr": "Attention à la puissance\u00a0: <span class=\"m nw\">6<sup>2</sup></span>, c’est <span class=\"m nw\">6 × 6</span>, pas <span class=\"m nw\">6 × 2</span>."
        }
      ],
      "hint": "Le carré porte sur toute la parenthèse\u00a0: que calcule-t-on en premier\u00a0?",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"prem\">(2 × 3)</span><sup>2</sup></span><span class=\"cd m\">= 6<sup>2</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 36</span></div><p>La parenthèse d’abord.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">5 − 3 × (4 − 6)</span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 11,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": -1,
          "fr": "Attention aux signes dans la multiplication\u00a0: <span class=\"m nw\">3 × (−2) = −6</span>, et soustraire <span class=\"m nw\">−6</span>, c’est ajouter 6."
        },
        {
          "v": -4,
          "fr": "Tu as calculé 5 − 3 en premier.<br>La multiplication passe avant la soustraction."
        }
      ],
      "hint": "Dans l’ordre\u00a0: la parenthèse, puis la multiplication, puis la soustraction.<br>Attention au signe de <span class=\"m nw\">4 − 6</span>.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">5 − 3 × <span class=\"prem\">(4 − 6)</span></span><span class=\"cd m\">= 5 − <span class=\"prem\">3 × (−2)</span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 5 − (−6)</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 5 + 6</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 11</span></div><p>La parenthèse, puis la multiplication, puis la soustraction.<br>Soustraire <span class=\"m nw\">−6</span>, c’est ajouter 6.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">18 − 2 × (3 + 2<sup>2</sup>)</span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 4,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 112,
          "fr": "Tu as calculé 18 − 2 en premier.<br>La multiplication passe avant la soustraction."
        },
        {
          "v": -32,
          "fr": "La puissance porte seulement sur 2\u00a0: <span class=\"m nw\">3 + 2<sup>2</sup> = 3 + 4</span>, pas <span class=\"m nw\">5<sup>2</sup></span>."
        },
        {
          "v": 16,
          "fr": "Tu as oublié les parenthèses\u00a0: il faut calculer <span class=\"m nw\">3 + 2<sup>2</sup></span> avant de multiplier par 2."
        }
      ],
      "hint": "Commence à l’intérieur de la parenthèse\u00a0: la puissance d’abord.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">18 − 2 × (3 + <span class=\"prem\">2<sup>2</sup></span>)</span><span class=\"cl\"></span><span class=\"ce m\">= 18 − 2 × <span class=\"prem\">(3 + 4)</span></span><span class=\"cl\"></span><span class=\"ce m\">= 18 − <span class=\"prem\">2 × 7</span></span><span class=\"cl\"></span><span class=\"ce m\">= 18 − 14</span><span class=\"cl\"></span><span class=\"ce m res\">= 4</span></div><p>Dans la parenthèse, la puissance d’abord.<br>Puis la multiplication, puis la soustraction.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">50 ÷ (2 + 3) × 2</span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 20,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 5,
          "fr": "Tu as calculé 5 × 2 avant la division.<br>Même priorité\u00a0: on calcule de gauche à droite."
        },
        {
          "v": 31,
          "fr": "Tu as oublié les parenthèses\u00a0: on calcule 2 + 3 en premier."
        }
      ],
      "hint": "La parenthèse d’abord.<br>Ensuite, ÷ et × ont la même priorité.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">50 ÷ <span class=\"prem\">(2 + 3)</span> × 2</span><span class=\"cl\"></span><span class=\"ce m\">= <span class=\"prem\">50 ÷ 5</span> × 2</span><span class=\"cl\"></span><span class=\"ce m\">= 10 × 2</span><span class=\"cl\"></span><span class=\"ce m res\">= 20</span></div><p>La parenthèse d’abord.<br>Puis ÷ et × ont la même priorité\u00a0: de gauche à droite.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">−3<sup>2</sup> + (−3)<sup>2</sup></span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 0,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 18,
          "fr": "Sans parenthèses, seul 3 est au carré\u00a0: <span class=\"m nw\">−3<sup>2</sup> = −9</span>.<br>Le signe − reste devant."
        },
        {
          "v": -18,
          "fr": "Avec les parenthèses, c’est −3 qui est au carré\u00a0: <span class=\"m nw\">(−3)<sup>2</sup> = (−3) × (−3) = 9</span>."
        }
      ],
      "hint": "Regarde bien où sont les parenthèses\u00a0: qu’est-ce qui est au carré dans chaque terme\u00a0?",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"prem\">−3<sup>2</sup></span> + <span class=\"prem\">(−3)<sup>2</sup></span></span><span class=\"cd m\">= −9 + 9</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 0</span></div><p>Dans <span class=\"m nw\">−3<sup>2</sup></span>, seul 3 est au carré.<br>Dans <span class=\"m nw\">(−3)<sup>2</sup></span>, c’est <span class=\"m nw\">−3</span> qui est au carré.</p>"
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e2",
  "group": "prio",
  "num": "2",
  "src": "fiche de révision",
  "title": "Quelle est la dernière opération\u00a0?",
  "stars": 2,
  "text": "<p>Ne calcule pas.<br>Pour chaque calcul, demande-toi ce que tu fais en premier, puis quelle est la <b>dernière</b> opération.<br>C’est elle qui dit si le calcul est une somme, une différence, un produit ou un quotient.</p>",
  "parts": [
    {
      "kind": "choice",
      "q": "<p>Sans calculer\u00a0: ce calcul est…</p><p class=\"mq\"><span class=\"m nw\">3 + 4 × 5</span></p>",
      "choices": [
        "une somme",
        "une différence",
        "un produit",
        "un quotient"
      ],
      "correct": 0,
      "fb": [
        "<p>Je fais en premier\u00a0: <span class=\"m nw\">4 × 5</span>.<br>La dernière opération est une addition\u00a0: c’est <b>une somme</b>.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>",
        "<p>Tu as regardé l’opération que l’on fait <b>en premier</b>.<br>C’est la <b>dernière</b> opération qui donne la nature du calcul.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Sans calculer\u00a0: ce calcul est…</p><p class=\"mq\"><span class=\"m nw\">(3 + 4) × 5</span></p>",
      "choices": [
        "une somme",
        "une différence",
        "un produit",
        "un quotient"
      ],
      "correct": 2,
      "fb": [
        "<p>Tu as regardé l’opération que l’on fait <b>en premier</b>.<br>C’est la <b>dernière</b> opération qui donne la nature du calcul.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>",
        "<p>Je fais en premier\u00a0: <span class=\"m nw\">3 + 4</span>.<br>La dernière opération est une multiplication\u00a0: c’est <b>un produit</b>.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Sans calculer\u00a0: ce calcul est…</p><p class=\"mq\"><span class=\"m nw\">12 − 6 ÷ 2</span></p>",
      "choices": [
        "une somme",
        "une différence",
        "un produit",
        "un quotient"
      ],
      "correct": 1,
      "fb": [
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>",
        "<p>Je fais en premier\u00a0: <span class=\"m nw\">6 ÷ 2</span>.<br>La dernière opération est une soustraction\u00a0: c’est <b>une différence</b>.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>",
        "<p>Tu as regardé l’opération que l’on fait <b>en premier</b>.<br>C’est la <b>dernière</b> opération qui donne la nature du calcul.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Sans calculer\u00a0: ce calcul est…</p><p class=\"mq\"><span class=\"m nw\">(12 − 6) ÷ 2</span></p>",
      "choices": [
        "une somme",
        "une différence",
        "un produit",
        "un quotient"
      ],
      "correct": 3,
      "fb": [
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>",
        "<p>Tu as regardé l’opération que l’on fait <b>en premier</b>.<br>C’est la <b>dernière</b> opération qui donne la nature du calcul.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>",
        "<p>Je fais en premier\u00a0: <span class=\"m nw\">12 − 6</span>.<br>La dernière opération est une division\u00a0: c’est <b>un quotient</b>.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Sans calculer\u00a0: ce calcul est…</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1</span><span>4</span></span> × 6</span></p>",
      "choices": [
        "une somme",
        "une différence",
        "un produit",
        "un quotient"
      ],
      "correct": 1,
      "fb": [
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>",
        "<p>Je fais en premier\u00a0: <span class=\"m nw\"><span class=\"frac\"><span>1</span><span>4</span></span> × 6</span>.<br>La dernière opération est une soustraction\u00a0: c’est <b>une différence</b>.</p>",
        "<p>Tu as regardé l’opération que l’on fait <b>en premier</b>.<br>C’est la <b>dernière</b> opération qui donne la nature du calcul.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Sans calculer\u00a0: ce calcul est…</p><p class=\"mq\"><span class=\"m nw\"><span class=\"bp\">(</span><span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1</span><span>4</span></span><span class=\"bp\">)</span> × 6</span></p>",
      "choices": [
        "une somme",
        "une différence",
        "un produit",
        "un quotient"
      ],
      "correct": 2,
      "fb": [
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>",
        "<p>Tu as regardé l’opération que l’on fait <b>en premier</b>.<br>C’est la <b>dernière</b> opération qui donne la nature du calcul.</p>",
        "<p>Je fais en premier\u00a0: <span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1</span><span>4</span></span></span>.<br>La dernière opération est une multiplication\u00a0: c’est <b>un produit</b>.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Sans calculer\u00a0: ce calcul est…</p><p class=\"mq\"><span class=\"m nw\">5 × 10<sup>3</sup> + 2 × 10<sup>2</sup></span></p>",
      "choices": [
        "une somme",
        "une différence",
        "un produit",
        "un quotient"
      ],
      "correct": 0,
      "fb": [
        "<p>Je fais en premier\u00a0: les puissances <span class=\"m nw\">10<sup>3</sup></span> et <span class=\"m nw\">10<sup>2</sup></span>, puis les deux produits.<br>La dernière opération est une addition\u00a0: c’est <b>une somme</b>.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>",
        "<p>Tu as regardé l’opération que l’on fait <b>en premier</b>.<br>C’est la <b>dernière</b> opération qui donne la nature du calcul.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Sans calculer\u00a0: ce calcul est…</p><p class=\"mq\"><span class=\"m nw\">4 − 2<sup>2</sup></span></p>",
      "choices": [
        "une somme",
        "une différence",
        "un produit",
        "un quotient"
      ],
      "correct": 1,
      "fb": [
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>",
        "<p>Je fais en premier\u00a0: <span class=\"m nw\">2<sup>2</sup></span>.<br>La dernière opération est une soustraction\u00a0: c’est <b>une différence</b>.</p>",
        "<p>Tu as regardé l’opération que l’on fait <b>en premier</b>.<br>C’est la <b>dernière</b> opération qui donne la nature du calcul.</p>",
        "<p>Cherche d’abord ce que tu calcules en premier.<br>L’opération qui reste à la fin donne la nature du calcul.</p>"
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e3",
  "group": "prio",
  "num": "3",
  "src": "fiche de révision",
  "title": "Place les parenthèses",
  "stars": 2,
  "text": "<p>Recopie chaque égalité en ajoutant des parenthèses pour qu’elle soit vraie.<br>Attention\u00a0: pour l’une d’elles, il n’en faut aucune.</p>",
  "parts": [
    {
      "kind": "choice",
      "q": "<p>Où placer les parenthèses pour que l’égalité soit vraie\u00a0?</p><p class=\"mq\"><span class=\"m nw\">2 × 5 + 3 × 4 = 64</span></p>",
      "choices": [
        "<span class=\"m nw\">2 × (5 + 3) × 4</span>",
        "<span class=\"m nw\">(2 × 5 + 3) × 4</span>",
        "<span class=\"m nw\">2 × (5 + 3 × 4)</span>",
        "Aucune parenthèse"
      ],
      "correct": 0,
      "fb": [
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2 × (5 + 3) × 4</span><span class=\"cd m\">= 2 × 8 × 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 64</span></div><p>C’est bien 64.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">(2 × 5 + 3) × 4</span><span class=\"cd m\">= (10 + 3) × 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 13 × 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 52</span></div><p>On trouve 52, pas 64.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2 × (5 + 3 × 4)</span><span class=\"cd m\">= 2 × (5 + 12)</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 2 × 17</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 34</span></div><p>On trouve 34, pas 64.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2 × 5 + 3 × 4</span><span class=\"cd m\">= 10 + 12</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 22</span></div><p>On trouve 22, pas 64.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Où placer les parenthèses pour que l’égalité soit vraie\u00a0?</p><p class=\"mq\"><span class=\"m nw\">2 × 5 + 3 × 4 = 52</span></p>",
      "choices": [
        "<span class=\"m nw\">2 × (5 + 3) × 4</span>",
        "<span class=\"m nw\">(2 × 5 + 3) × 4</span>",
        "<span class=\"m nw\">2 × (5 + 3 × 4)</span>",
        "Aucune parenthèse"
      ],
      "correct": 1,
      "fb": [
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2 × (5 + 3) × 4</span><span class=\"cd m\">= 2 × 8 × 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 64</span></div><p>On trouve 64, pas 52.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">(2 × 5 + 3) × 4</span><span class=\"cd m\">= (10 + 3) × 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 13 × 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 52</span></div><p>C’est bien 52.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2 × (5 + 3 × 4)</span><span class=\"cd m\">= 2 × (5 + 12)</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 2 × 17</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 34</span></div><p>On trouve 34, pas 52.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2 × 5 + 3 × 4</span><span class=\"cd m\">= 10 + 12</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 22</span></div><p>On trouve 22, pas 52.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Où placer les parenthèses pour que l’égalité soit vraie\u00a0?</p><p class=\"mq\"><span class=\"m nw\">2 × 5 + 3 × 4 = 22</span></p>",
      "choices": [
        "<span class=\"m nw\">2 × (5 + 3) × 4</span>",
        "<span class=\"m nw\">(2 × 5 + 3) × 4</span>",
        "<span class=\"m nw\">2 × (5 + 3 × 4)</span>",
        "Aucune parenthèse"
      ],
      "correct": 3,
      "fb": [
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2 × (5 + 3) × 4</span><span class=\"cd m\">= 2 × 8 × 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 64</span></div><p>On trouve 64, pas 22.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">(2 × 5 + 3) × 4</span><span class=\"cd m\">= (10 + 3) × 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 13 × 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 52</span></div><p>On trouve 52, pas 22.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2 × (5 + 3 × 4)</span><span class=\"cd m\">= 2 × (5 + 12)</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 2 × 17</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 34</span></div><p>On trouve 34, pas 22.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2 × 5 + 3 × 4</span><span class=\"cd m\">= 10 + 12</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 22</span></div><p>C’est bien 22.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Où placer les parenthèses pour que l’égalité soit vraie\u00a0?</p><p class=\"mq\"><span class=\"m nw\">12 − 4 ÷ 2 + 2 = 6</span></p>",
      "choices": [
        "<span class=\"m nw\">(12 − 4) ÷ 2 + 2</span>",
        "<span class=\"m nw\">12 − 4 ÷ (2 + 2)</span>",
        "<span class=\"m nw\">(12 − 4) ÷ (2 + 2)</span>",
        "Aucune parenthèse"
      ],
      "correct": 0,
      "fb": [
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">(12 − 4) ÷ 2 + 2</span><span class=\"cl\"></span><span class=\"ce m\">= 8 ÷ 2 + 2</span><span class=\"cl\"></span><span class=\"ce m\">= 4 + 2</span><span class=\"cl\"></span><span class=\"ce m res\">= 6</span></div><p>C’est bien 6.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">12 − 4 ÷ (2 + 2)</span><span class=\"cl\"></span><span class=\"ce m\">= 12 − 4 ÷ 4</span><span class=\"cl\"></span><span class=\"ce m\">= 12 − 1</span><span class=\"cl\"></span><span class=\"ce m res\">= 11</span></div><p>On trouve 11, pas 6.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">(12 − 4) ÷ (2 + 2)</span><span class=\"cl\"></span><span class=\"ce m\">= 8 ÷ 4</span><span class=\"cl\"></span><span class=\"ce m res\">= 2</span></div><p>On trouve 2, pas 6.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">12 − 4 ÷ 2 + 2</span><span class=\"cd m\">= 12 − 2 + 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 10 + 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 12</span></div><p>On trouve 12, pas 6.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Où placer les parenthèses pour que l’égalité soit vraie\u00a0?</p><p class=\"mq\"><span class=\"m nw\">12 − 4 ÷ 2 + 2 = 11</span></p>",
      "choices": [
        "<span class=\"m nw\">(12 − 4) ÷ 2 + 2</span>",
        "<span class=\"m nw\">12 − 4 ÷ (2 + 2)</span>",
        "<span class=\"m nw\">(12 − 4) ÷ (2 + 2)</span>",
        "Aucune parenthèse"
      ],
      "correct": 1,
      "fb": [
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">(12 − 4) ÷ 2 + 2</span><span class=\"cl\"></span><span class=\"ce m\">= 8 ÷ 2 + 2</span><span class=\"cl\"></span><span class=\"ce m\">= 4 + 2</span><span class=\"cl\"></span><span class=\"ce m res\">= 6</span></div><p>On trouve 6, pas 11.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">12 − 4 ÷ (2 + 2)</span><span class=\"cl\"></span><span class=\"ce m\">= 12 − 4 ÷ 4</span><span class=\"cl\"></span><span class=\"ce m\">= 12 − 1</span><span class=\"cl\"></span><span class=\"ce m res\">= 11</span></div><p>C’est bien 11.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">(12 − 4) ÷ (2 + 2)</span><span class=\"cl\"></span><span class=\"ce m\">= 8 ÷ 4</span><span class=\"cl\"></span><span class=\"ce m res\">= 2</span></div><p>On trouve 2, pas 11.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">12 − 4 ÷ 2 + 2</span><span class=\"cd m\">= 12 − 2 + 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 10 + 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 12</span></div><p>On trouve 12, pas 11.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Où placer les parenthèses pour que l’égalité soit vraie\u00a0?</p><p class=\"mq\"><span class=\"m nw\">12 − 4 ÷ 2 + 2 = 2</span></p>",
      "choices": [
        "<span class=\"m nw\">(12 − 4) ÷ 2 + 2</span>",
        "<span class=\"m nw\">12 − 4 ÷ (2 + 2)</span>",
        "<span class=\"m nw\">(12 − 4) ÷ (2 + 2)</span>",
        "Aucune parenthèse"
      ],
      "correct": 2,
      "fb": [
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">(12 − 4) ÷ 2 + 2</span><span class=\"cl\"></span><span class=\"ce m\">= 8 ÷ 2 + 2</span><span class=\"cl\"></span><span class=\"ce m\">= 4 + 2</span><span class=\"cl\"></span><span class=\"ce m res\">= 6</span></div><p>On trouve 6, pas 2.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">12 − 4 ÷ (2 + 2)</span><span class=\"cl\"></span><span class=\"ce m\">= 12 − 4 ÷ 4</span><span class=\"cl\"></span><span class=\"ce m\">= 12 − 1</span><span class=\"cl\"></span><span class=\"ce m res\">= 11</span></div><p>On trouve 11, pas 2.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">(12 − 4) ÷ (2 + 2)</span><span class=\"cl\"></span><span class=\"ce m\">= 8 ÷ 4</span><span class=\"cl\"></span><span class=\"ce m res\">= 2</span></div><p>C’est bien 2.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">12 − 4 ÷ 2 + 2</span><span class=\"cd m\">= 12 − 2 + 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 10 + 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 12</span></div><p>On trouve 12, pas 2.</p>"
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e4",
  "group": "prio",
  "num": "4",
  "src": "fiche de révision",
  "title": "Trouve l’erreur de Lucas",
  "stars": 2,
  "text": "<p>Lucas a fait ces calculs.<br>Pour chacun\u00a0: repère l’étape fausse, explique l’erreur en une phrase <b>sur ton cahier</b>, puis refais le calcul correctement.</p>",
  "parts": [
    {
      "kind": "num",
      "q": "<p>Lucas a écrit\u00a0:</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">15 − 5 × 2</span><span class=\"cd m\">= 10 × 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 20</span></div><p>Quel est le bon résultat\u00a0?</p>",
      "label": "Résultat",
      "unit": "",
      "ans": 5,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 20,
          "fr": "C’est le résultat de Lucas.<br>Il a fait la soustraction avant la multiplication."
        }
      ],
      "hint": "Une soustraction et une multiplication\u00a0: laquelle passe en premier\u00a0?",
      "sol": "<p><b>L’erreur.</b><br>Il a fait la soustraction avant la multiplication.</p><p><b>Le calcul juste.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">15 − <span class=\"prem\">5 × 2</span></span><span class=\"cd m\">= 15 − 10</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 5</span></div>"
    },
    {
      "kind": "num",
      "q": "<p>Lucas a écrit\u00a0:</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">4 + 2<sup>2</sup></span><span class=\"cd m\">= 6<sup>2</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 36</span></div><p>Quel est le bon résultat\u00a0?</p>",
      "label": "Résultat",
      "unit": "",
      "ans": 8,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 36,
          "fr": "C’est le résultat de Lucas.<br>Il a fait l’addition avant la puissance."
        }
      ],
      "hint": "Une addition et une puissance\u00a0: laquelle passe en premier\u00a0?",
      "sol": "<p><b>L’erreur.</b><br>Il a fait l’addition avant la puissance.</p><p><b>Le calcul juste.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">4 + <span class=\"prem\">2<sup>2</sup></span></span><span class=\"cd m\">= 4 + 4</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 8</span></div>"
    },
    {
      "kind": "num",
      "q": "<p>Lucas a écrit\u00a0:</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">24 ÷ 4 × 2</span><span class=\"cd m\">= 24 ÷ 8</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 3</span></div><p>Quel est le bon résultat\u00a0?</p>",
      "label": "Résultat",
      "unit": "",
      "ans": 12,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 3,
          "fr": "C’est le résultat de Lucas.<br>Il a calculé 4 × 2 en premier.<br>Or × et ÷ ont la même priorité\u00a0: on calcule de gauche à droite."
        }
      ],
      "hint": "La division et la multiplication ont la même priorité\u00a0: dans quel sens calcule-t-on\u00a0?",
      "sol": "<p><b>L’erreur.</b><br>Il a calculé 4 × 2 en premier.<br>Or × et ÷ ont la même priorité\u00a0: on calcule de gauche à droite.</p><p><b>Le calcul juste.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"prem\">24 ÷ 4</span> × 2</span><span class=\"cd m\">= 6 × 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 12</span></div>"
    },
    {
      "kind": "num",
      "q": "<p>Lucas a écrit\u00a0:</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10 − (3 − 1)</span><span class=\"cd m\">= 10 − 3 − 1</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 6</span></div><p>Quel est le bon résultat\u00a0?</p>",
      "label": "Résultat",
      "unit": "",
      "ans": 8,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 6,
          "fr": "C’est le résultat de Lucas.<br>Il a enlevé une parenthèse précédée d’un signe − sans changer les signes à l’intérieur.<br>On calcule d’abord la parenthèse."
        }
      ],
      "hint": "Calcule d’abord la parenthèse.",
      "sol": "<p><b>L’erreur.</b><br>Il a enlevé une parenthèse précédée d’un signe − sans changer les signes à l’intérieur.<br>On calcule d’abord la parenthèse.</p><p><b>Le calcul juste.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10 − <span class=\"prem\">(3 − 1)</span></span><span class=\"cd m\">= 10 − 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 8</span></div>"
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e5",
  "group": "frac",
  "num": "5",
  "src": "fiche de révision",
  "title": "Simplifie en montrant la décomposition",
  "stars": 1,
  "text": "<p>Écris le numérateur et le dénominateur sous forme de produits, puis simplifie jusqu’à obtenir une fraction irréductible.<br>Écris la décomposition <b>sur ton cahier</b>.</p>",
  "parts": [
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>12</span><span>18</span></span></span></p>",
      "label": "Complète les cases.",
      "tpl": "= <span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        2,
        3
      ],
      "traps": [],
      "hint": "Écris le numérateur et le dénominateur sous forme de produits\u00a0: cherche un diviseur commun (2, 3, 5, 7…).",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>12</span><span>18</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 2 × 3</span><span>2 × 3 × 3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>2</span><span>3</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>45</span><span>60</span></span></span></p>",
      "label": "Complète les cases.",
      "tpl": "= <span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        3,
        4
      ],
      "traps": [],
      "hint": "Écris le numérateur et le dénominateur sous forme de produits\u00a0: cherche un diviseur commun (2, 3, 5, 7…).",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>45</span><span>60</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>3 × 3 × 5</span><span>2 × 2 × 3 × 5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>3</span><span>4</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>84</span><span>126</span></span></span></p>",
      "label": "Complète les cases.",
      "tpl": "= <span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        2,
        3
      ],
      "traps": [],
      "hint": "Écris le numérateur et le dénominateur sous forme de produits\u00a0: cherche un diviseur commun (2, 3, 5, 7…).",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>84</span><span>126</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 2 × 3 × 7</span><span>2 × 3 × 3 × 7</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>2</span><span>3</span></span></span></div><p>Une décomposition avec un grand facteur commun est aussi juste, par exemple\u00a0:</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>84</span><span>126</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>42 × 2</span><span>42 × 3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>2</span><span>3</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>150</span><span>210</span></span></span></p>",
      "label": "Complète les cases.",
      "tpl": "= <span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        5,
        7
      ],
      "traps": [],
      "hint": "Écris le numérateur et le dénominateur sous forme de produits\u00a0: cherche un diviseur commun (2, 3, 5, 7…).",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>150</span><span>210</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 3 × 5 × 5</span><span>2 × 3 × 5 × 7</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>5</span><span>7</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e6",
  "group": "frac",
  "num": "6",
  "src": "fiche de révision",
  "title": "Mêmes fractions, opérations différentes",
  "stars": 2,
  "text": "<p>Avec les mêmes fractions, chaque opération a sa propre règle.<br>Pour chaque calcul\u00a0: d’abord la règle, ensuite le calcul.<br>Le même dénominateur ne sert que pour + et −.</p>",
  "parts": [
    {
      "kind": "choice",
      "q": "<p>Étape 1, sans calculer\u00a0: quelle règle vas-tu appliquer\u00a0?</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> + <span class=\"frac\"><span>5</span><span>6</span></span></span></p>",
      "choices": [
        "Même dénominateur d’abord, puis j’additionne ou je soustrais les numérateurs.",
        "Numérateur fois numérateur, dénominateur fois dénominateur.",
        "Je multiplie par l’inverse de la deuxième fraction."
      ],
      "correct": 0,
      "fb": [
        "<p><b>Oui.</b> C’est une addition\u00a0: même dénominateur (6), puis j’additionne les numérateurs.</p>",
        "<p>Regarde le signe\u00a0: c’est une addition.<br>Cette règle est celle de la multiplication.</p>",
        "<p>Regarde le signe\u00a0: c’est une addition.<br>Cette règle est celle de la division.</p>"
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Étape 2\u00a0: calcule sur ton cahier, une étape par ligne.<br>Donne une fraction irréductible.</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> + <span class=\"frac\"><span>5</span><span>6</span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        3,
        2
      ],
      "traps": [
        {
          "v": [
            7,
            9
          ],
          "fr": "On n’additionne jamais les dénominateurs\u00a0: il faut d’abord le même dénominateur."
        },
        {
          "v": [
            5,
            9
          ],
          "fr": "Tu as appliqué la règle de la multiplication alors que c’est une addition.<br>Regarde le signe avant de choisir la règle."
        },
        {
          "v": [
            10,
            18
          ],
          "fr": "Tu as appliqué la règle de la multiplication alors que c’est une addition.<br>Regarde le signe avant de choisir la règle."
        }
      ],
      "hint": "Le dénominateur commun est 6\u00a0: transforme seulement <span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span></span>.",
      "sol": "<p>C’est une addition\u00a0: même dénominateur (6), puis j’additionne les numérateurs.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> + <span class=\"frac\"><span>5</span><span>6</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 2</span><span>3 × 2</span></span> + <span class=\"frac\"><span>5</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>4</span><span>6</span></span> + <span class=\"frac\"><span>5</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>9</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>3 × 3</span><span>3 × 2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>3</span><span>2</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Étape 1, sans calculer\u00a0: quelle règle vas-tu appliquer\u00a0?</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>5</span><span>6</span></span></span></p>",
      "choices": [
        "Même dénominateur d’abord, puis j’additionne ou je soustrais les numérateurs.",
        "Numérateur fois numérateur, dénominateur fois dénominateur.",
        "Je multiplie par l’inverse de la deuxième fraction."
      ],
      "correct": 0,
      "fb": [
        "<p><b>Oui.</b> C’est une soustraction\u00a0: même dénominateur (6), puis je soustrais les numérateurs.</p>",
        "<p>Regarde le signe\u00a0: c’est une soustraction.<br>Cette règle est celle de la multiplication.</p>",
        "<p>Regarde le signe\u00a0: c’est une soustraction.<br>Cette règle est celle de la division.</p>"
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Étape 2\u00a0: calcule sur ton cahier, une étape par ligne.<br>Donne une fraction irréductible.</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>5</span><span>6</span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        -1,
        6
      ],
      "traps": [
        {
          "v": [
            1,
            1
          ],
          "fr": "On ne soustrait jamais les dénominateurs\u00a0: il faut d’abord le même dénominateur."
        },
        {
          "v": [
            5,
            9
          ],
          "fr": "Tu as appliqué la règle de la multiplication alors que c’est une soustraction.<br>Regarde le signe avant de choisir la règle."
        },
        {
          "v": [
            10,
            18
          ],
          "fr": "Tu as appliqué la règle de la multiplication alors que c’est une soustraction.<br>Regarde le signe avant de choisir la règle."
        }
      ],
      "hint": "Le dénominateur commun est 6.<br>Attention\u00a0: le résultat est négatif, touche le signe pour le changer.",
      "sol": "<p>C’est une soustraction\u00a0: même dénominateur (6), puis je soustrais les numérateurs.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>5</span><span>6</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 2</span><span>3 × 2</span></span> − <span class=\"frac\"><span>5</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>4</span><span>6</span></span> − <span class=\"frac\"><span>5</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= −<span class=\"frac\"><span>1</span><span>6</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Étape 1, sans calculer\u00a0: quelle règle vas-tu appliquer\u00a0?</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> × <span class=\"frac\"><span>5</span><span>6</span></span></span></p>",
      "choices": [
        "Même dénominateur d’abord, puis j’additionne ou je soustrais les numérateurs.",
        "Numérateur fois numérateur, dénominateur fois dénominateur.",
        "Je multiplie par l’inverse de la deuxième fraction."
      ],
      "correct": 1,
      "fb": [
        "<p>Regarde le signe\u00a0: c’est une multiplication.<br>Cette règle ne sert que pour + et −.</p>",
        "<p><b>Oui.</b> C’est une multiplication\u00a0: numérateur fois numérateur, dénominateur fois dénominateur.</p>",
        "<p>Regarde le signe\u00a0: c’est une multiplication.<br>Cette règle est celle de la division.</p>"
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Étape 2\u00a0: calcule sur ton cahier, une étape par ligne.<br>Donne une fraction irréductible.</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> × <span class=\"frac\"><span>5</span><span>6</span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        5,
        9
      ],
      "traps": [
        {
          "v": [
            3,
            2
          ],
          "fr": "Tu as additionné les deux fractions.<br>Regarde le signe\u00a0: c’est une multiplication."
        },
        {
          "v": [
            9,
            6
          ],
          "fr": "Tu as additionné les deux fractions.<br>Regarde le signe\u00a0: c’est une multiplication."
        },
        {
          "v": [
            4,
            5
          ],
          "fr": "Tu as retourné la deuxième fraction\u00a0: cela, c’est la règle de la division.<br>Ici on multiplie directement."
        }
      ],
      "hint": "Décompose 6 en <span class=\"m nw\">2 × 3</span> pour simplifier avant de multiplier.",
      "sol": "<p>C’est une multiplication\u00a0: numérateur fois numérateur, dénominateur fois dénominateur.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> × <span class=\"frac\"><span>5</span><span>6</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 5</span><span>3 × 6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 5</span><span>3 × 2 × 3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>5</span><span>9</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Étape 1, sans calculer\u00a0: quelle règle vas-tu appliquer\u00a0?</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> ÷ <span class=\"frac\"><span>5</span><span>6</span></span></span></p>",
      "choices": [
        "Même dénominateur d’abord, puis j’additionne ou je soustrais les numérateurs.",
        "Numérateur fois numérateur, dénominateur fois dénominateur.",
        "Je multiplie par l’inverse de la deuxième fraction."
      ],
      "correct": 2,
      "fb": [
        "<p>Regarde le signe\u00a0: c’est une division.<br>Cette règle ne sert que pour + et −.</p>",
        "<p>Regarde le signe\u00a0: c’est une division.<br>Cette règle est celle de la multiplication.</p>",
        "<p><b>Oui.</b> C’est une division\u00a0: je multiplie par l’inverse de <span class=\"m nw\"><span class=\"frac\"><span>5</span><span>6</span></span></span>, c’est-à-dire <span class=\"m nw\"><span class=\"frac\"><span>6</span><span>5</span></span></span>.</p>"
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Étape 2\u00a0: calcule sur ton cahier, une étape par ligne.<br>Donne une fraction irréductible.</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> ÷ <span class=\"frac\"><span>5</span><span>6</span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        4,
        5
      ],
      "traps": [
        {
          "v": [
            5,
            9
          ],
          "fr": "Tu as multiplié sans retourner la deuxième fraction.<br>Diviser, c’est multiplier par l’inverse."
        },
        {
          "v": [
            10,
            18
          ],
          "fr": "Tu as multiplié sans retourner la deuxième fraction.<br>Diviser, c’est multiplier par l’inverse."
        },
        {
          "v": [
            5,
            4
          ],
          "fr": "Tu as retourné la première fraction.<br>On retourne celle par laquelle on divise\u00a0: la deuxième."
        }
      ],
      "hint": "L’inverse de <span class=\"m nw\"><span class=\"frac\"><span>5</span><span>6</span></span></span> est <span class=\"m nw\"><span class=\"frac\"><span>6</span><span>5</span></span></span>.",
      "sol": "<p>C’est une division\u00a0: je multiplie par l’inverse de <span class=\"m nw\"><span class=\"frac\"><span>5</span><span>6</span></span></span>, c’est-à-dire <span class=\"m nw\"><span class=\"frac\"><span>6</span><span>5</span></span></span>.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> ÷ <span class=\"frac\"><span>5</span><span>6</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> × <span class=\"frac\"><span>6</span><span>5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 6</span><span>3 × 5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 2 × 3</span><span>3 × 5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>4</span><span>5</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Étape 1, sans calculer\u00a0: quelle règle vas-tu appliquer\u00a0?</p><p class=\"mq\"><span class=\"m nw\">3 − <span class=\"frac\"><span>2</span><span>5</span></span></span></p>",
      "choices": [
        "Même dénominateur d’abord, puis j’additionne ou je soustrais les numérateurs.",
        "Numérateur fois numérateur, dénominateur fois dénominateur.",
        "Je multiplie par l’inverse de la deuxième fraction."
      ],
      "correct": 0,
      "fb": [
        "<p><b>Oui.</b> C’est une soustraction\u00a0: j’écris 3 avec le dénominateur 5, <span class=\"m nw\">3 = <span class=\"frac\"><span>15</span><span>5</span></span></span>.</p>",
        "<p>Regarde le signe\u00a0: c’est une soustraction.<br>Cette règle est celle de la multiplication.</p>",
        "<p>Regarde le signe\u00a0: c’est une soustraction.<br>Cette règle est celle de la division.</p>"
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Étape 2\u00a0: calcule sur ton cahier, une étape par ligne.<br>Donne une fraction irréductible.</p><p class=\"mq\"><span class=\"m nw\">3 − <span class=\"frac\"><span>2</span><span>5</span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        13,
        5
      ],
      "traps": [
        {
          "v": [
            1,
            5
          ],
          "fr": "Tu as calculé 3 − 2 au numérateur.<br>Mais 3 n’est pas trois cinquièmes\u00a0: écris d’abord 3 avec le dénominateur 5."
        },
        {
          "v": [
            6,
            5
          ],
          "fr": "Tu as multiplié 3 par le numérateur\u00a0: c’est la règle de la multiplication.<br>Ici c’est une soustraction."
        }
      ],
      "hint": "Un entier est une fraction\u00a0: <span class=\"m nw\">3 = <span class=\"frac\"><span>3</span><span>1</span></span> = <span class=\"frac\"><span>15</span><span>5</span></span></span>.",
      "sol": "<p>C’est une soustraction\u00a0: j’écris 3 avec le dénominateur 5, <span class=\"m nw\">3 = <span class=\"frac\"><span>15</span><span>5</span></span></span>.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">3 − <span class=\"frac\"><span>2</span><span>5</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>15</span><span>5</span></span> − <span class=\"frac\"><span>2</span><span>5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>13</span><span>5</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Étape 1, sans calculer\u00a0: quelle règle vas-tu appliquer\u00a0?</p><p class=\"mq\"><span class=\"m nw\">3 × <span class=\"frac\"><span>2</span><span>5</span></span></span></p>",
      "choices": [
        "Même dénominateur d’abord, puis j’additionne ou je soustrais les numérateurs.",
        "Numérateur fois numérateur, dénominateur fois dénominateur.",
        "Je multiplie par l’inverse de la deuxième fraction."
      ],
      "correct": 1,
      "fb": [
        "<p>Regarde le signe\u00a0: c’est une multiplication.<br>Cette règle ne sert que pour + et −.</p>",
        "<p><b>Oui.</b> C’est une multiplication\u00a0: je multiplie 3 par le numérateur.</p>",
        "<p>Regarde le signe\u00a0: c’est une multiplication.<br>Cette règle est celle de la division.</p>"
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Étape 2\u00a0: calcule sur ton cahier, une étape par ligne.<br>Donne une fraction irréductible.</p><p class=\"mq\"><span class=\"m nw\">3 × <span class=\"frac\"><span>2</span><span>5</span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        6,
        5
      ],
      "traps": [
        {
          "v": [
            2,
            5
          ],
          "fr": "Tu as multiplié aussi le dénominateur par 3.<br>On multiplie seulement le numérateur, car <span class=\"m nw\">3 = <span class=\"frac\"><span>3</span><span>1</span></span></span>."
        },
        {
          "v": [
            6,
            15
          ],
          "fr": "Tu as multiplié aussi le dénominateur par 3.<br>On multiplie seulement le numérateur, car <span class=\"m nw\">3 = <span class=\"frac\"><span>3</span><span>1</span></span></span>."
        },
        {
          "v": [
            13,
            5
          ],
          "fr": "Tu as fait une soustraction.<br>Regarde le signe\u00a0: c’est une multiplication."
        },
        {
          "v": [
            17,
            5
          ],
          "fr": "Tu as fait une addition.<br>Regarde le signe\u00a0: c’est une multiplication."
        }
      ],
      "hint": "Un entier est une fraction\u00a0: <span class=\"m nw\">3 = <span class=\"frac\"><span>3</span><span>1</span></span></span>.",
      "sol": "<p>C’est une multiplication\u00a0: je multiplie 3 par le numérateur.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">3 × <span class=\"frac\"><span>2</span><span>5</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>3 × 2</span><span>5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>6</span><span>5</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e7",
  "group": "frac",
  "num": "7",
  "src": "fiche de révision",
  "title": "Trouve l’erreur de Lucas (fractions)",
  "stars": 2,
  "text": "<p>Pour chaque calcul de Lucas\u00a0: explique l’erreur en une phrase <b>sur ton cahier</b>, puis refais le calcul correctement.<br>Donne une fraction irréductible.</p>",
  "parts": [
    {
      "kind": "fill",
      "q": "<p>Lucas a écrit\u00a0:</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>3</span><span>5</span></span> − <span class=\"frac\"><span>1</span><span>2</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>3 × 1</span><span>5 × 2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>3</span><span>10</span></span></span></div><p>Quel est le bon résultat\u00a0?</p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        1,
        10
      ],
      "traps": [
        {
          "v": [
            3,
            10
          ],
          "fr": "C’est le résultat de Lucas.<br>Il a appliqué la règle de la multiplication alors que c’est une soustraction.<br>C’est l’erreur à surveiller en priorité\u00a0: avant d’appliquer une règle, je regarde le signe de l’opération.<br>Il faut le même dénominateur."
        }
      ],
      "hint": "Regarde le signe\u00a0: c’est une soustraction.<br>Quelle règle faut-il\u00a0?",
      "sol": "<p><b>L’erreur.</b><br>Il a appliqué la règle de la multiplication alors que c’est une soustraction.<br>C’est l’erreur à surveiller en priorité\u00a0: avant d’appliquer une règle, je regarde le signe de l’opération.<br>Il faut le même dénominateur.</p><p><b>Le calcul juste.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>3</span><span>5</span></span> − <span class=\"frac\"><span>1</span><span>2</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>3 × 2</span><span>5 × 2</span></span> − <span class=\"frac\"><span>1 × 5</span><span>2 × 5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>6</span><span>10</span></span> − <span class=\"frac\"><span>5</span><span>10</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>1</span><span>10</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Lucas a écrit\u00a0:</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>5</span><span>6</span></span> − <span class=\"frac\"><span>1</span><span>4</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>5 − 1</span><span>6 − 4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>4</span><span>2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 2</span></div><p>Quel est le bon résultat\u00a0?</p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        7,
        12
      ],
      "traps": [
        {
          "v": [
            2,
            1
          ],
          "fr": "C’est le résultat de Lucas.<br>On ne soustrait jamais les dénominateurs\u00a0: on les rend égaux."
        },
        {
          "v": [
            4,
            2
          ],
          "fr": "C’est le résultat de Lucas.<br>On ne soustrait jamais les dénominateurs\u00a0: on les rend égaux."
        }
      ],
      "hint": "Le plus petit dénominateur commun de 6 et 4 est 12.",
      "sol": "<p><b>L’erreur.</b><br>On ne soustrait jamais les dénominateurs\u00a0: on les rend égaux.</p><p><b>Le calcul juste.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>5</span><span>6</span></span> − <span class=\"frac\"><span>1</span><span>4</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>5 × 2</span><span>6 × 2</span></span> − <span class=\"frac\"><span>1 × 3</span><span>4 × 3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>10</span><span>12</span></span> − <span class=\"frac\"><span>3</span><span>12</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>7</span><span>12</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Lucas a écrit\u00a0:</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> + <span class=\"frac\"><span>1</span><span>3</span></span> × 6</span><span class=\"cd m\">= <span class=\"frac\"><span>3</span><span>3</span></span> × 6</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 1 × 6</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 6</span></div><p>Quel est le bon résultat\u00a0?</p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        8,
        3
      ],
      "traps": [
        {
          "v": [
            6,
            1
          ],
          "fr": "C’est le résultat de Lucas.<br>Il a fait l’addition avant la multiplication."
        },
        {
          "v": [
            18,
            3
          ],
          "fr": "C’est le résultat de Lucas.<br>Il a fait l’addition avant la multiplication."
        }
      ],
      "hint": "Une addition et une multiplication\u00a0: laquelle passe en premier\u00a0?",
      "sol": "<p><b>L’erreur.</b><br>Il a fait l’addition avant la multiplication.</p><p><b>Le calcul juste.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> + <span class=\"prem\"><span class=\"frac\"><span>1</span><span>3</span></span> × 6</span></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> + <span class=\"frac\"><span>1 × 6</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> + <span class=\"frac\"><span>6</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>8</span><span>3</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Lucas a écrit\u00a0:</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>4</span><span>5</span></span> ÷ <span class=\"frac\"><span>2</span><span>3</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>5</span><span>4</span></span> × <span class=\"frac\"><span>2</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>10</span><span>12</span></span></span></div><p>Quel est le bon résultat\u00a0?</p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        6,
        5
      ],
      "traps": [
        {
          "v": [
            10,
            12
          ],
          "fr": "C’est le résultat de Lucas.<br>Il a retourné la première fraction.<br>On retourne la fraction par laquelle on divise, donc la deuxième."
        },
        {
          "v": [
            5,
            6
          ],
          "fr": "C’est le résultat de Lucas.<br>Il a retourné la première fraction.<br>On retourne la fraction par laquelle on divise, donc la deuxième."
        }
      ],
      "hint": "Quelle fraction faut-il retourner\u00a0: la première ou la deuxième\u00a0?",
      "sol": "<p><b>L’erreur.</b><br>Il a retourné la première fraction.<br>On retourne la fraction par laquelle on divise, donc la deuxième.</p><p><b>Le calcul juste.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>4</span><span>5</span></span> ÷ <span class=\"frac\"><span>2</span><span>3</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>4</span><span>5</span></span> × <span class=\"frac\"><span>3</span><span>2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>4 × 3</span><span>5 × 2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 2 × 3</span><span>5 × 2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>6</span><span>5</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e8",
  "group": "frac",
  "num": "8",
  "src": "fiche de révision",
  "title": "Les paires piégées",
  "stars": 3,
  "text": "<p>Ces calculs vont par deux et se ressemblent.<br>Pour chacun\u00a0: souligne ce que tu fais en premier, écris la règle, puis calcule une étape par ligne <b>sur ton cahier</b>.<br>Donne le résultat sous forme irréductible.<br>Compare ensuite les deux résultats de chaque paire.</p>",
  "parts": [
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>A</i> = <span class=\"frac\"><span>3</span><span>4</span></span> + <span class=\"frac\"><span>1</span><span>4</span></span> × <span class=\"frac\"><span>2</span><span>3</span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        11,
        12
      ],
      "traps": [
        {
          "v": [
            2,
            3
          ],
          "fr": "Tu as fait l’addition en premier\u00a0: c’est le calcul B.<br>Sans parenthèses, la multiplication passe avant l’addition."
        }
      ],
      "hint": "Il n’y a pas de parenthèses\u00a0: quelle opération passe en premier\u00a0?",
      "sol": "<p><b>En premier\u00a0: la multiplication.</b><br>Règle\u00a0: numérateur fois numérateur, dénominateur fois dénominateur.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= <span class=\"frac\"><span>3</span><span>4</span></span> + <span class=\"frac\"><span>1 × 2</span><span>4 × 3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= <span class=\"frac\"><span>3</span><span>4</span></span> + <span class=\"frac\"><span>2</span><span>12</span></span></span></div><p><b>Ensuite\u00a0: l’addition.</b><br>Règle\u00a0: même dénominateur (12).</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= <span class=\"frac\"><span>3 × 3</span><span>4 × 3</span></span> + <span class=\"frac\"><span>2</span><span>12</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= <span class=\"frac\"><span>9</span><span>12</span></span> + <span class=\"frac\"><span>2</span><span>12</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= <span class=\"frac\"><span>11</span><span>12</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>B</i> = <span class=\"bp\">(</span><span class=\"frac\"><span>3</span><span>4</span></span> + <span class=\"frac\"><span>1</span><span>4</span></span><span class=\"bp\">)</span> × <span class=\"frac\"><span>2</span><span>3</span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        2,
        3
      ],
      "traps": [
        {
          "v": [
            11,
            12
          ],
          "fr": "Tu as fait la multiplication en premier\u00a0: c’est le calcul A.<br>Ici, la parenthèse passe avant."
        }
      ],
      "hint": "Il y a des parenthèses\u00a0: que calcule-t-on en premier\u00a0?",
      "sol": "<p><b>En premier\u00a0: la parenthèse.</b><br>Les deux fractions ont déjà le même dénominateur.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>B</i></span><span class=\"cd m\">= <span class=\"frac\"><span>4</span><span>4</span></span> × <span class=\"frac\"><span>2</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>B</i></span><span class=\"cd m\">= 1 × <span class=\"frac\"><span>2</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>B</i></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span></span></div><p>Les parenthèses changent l’ordre des calculs, donc <span class=\"m nw\"><i>A</i> ≠ <i>B</i></span>.</p>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>C</i> = <span class=\"frac\"><span>5</span><span>3</span></span> − <span class=\"frac\"><span>2</span><span>3</span></span> ÷ 4</span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        3,
        2
      ],
      "traps": [
        {
          "v": [
            1,
            4
          ],
          "fr": "Tu as fait la soustraction en premier\u00a0: c’est le calcul D.<br>Sans parenthèses, la division passe avant la soustraction."
        }
      ],
      "hint": "Il n’y a pas de parenthèses\u00a0: quelle opération passe en premier\u00a0?",
      "sol": "<p><b>En premier\u00a0: la division.</b><br>Règle\u00a0: diviser par 4, c’est multiplier par <span class=\"m nw\"><span class=\"frac\"><span>1</span><span>4</span></span></span>.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>C</i></span><span class=\"cd m\">= <span class=\"frac\"><span>5</span><span>3</span></span> − <span class=\"frac\"><span>2</span><span>3</span></span> × <span class=\"frac\"><span>1</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>C</i></span><span class=\"cd m\">= <span class=\"frac\"><span>5</span><span>3</span></span> − <span class=\"frac\"><span>2</span><span>12</span></span></span></div><p><b>Ensuite\u00a0: la soustraction.</b><br>Règle\u00a0: même dénominateur (12).</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>C</i></span><span class=\"cd m\">= <span class=\"frac\"><span>5 × 4</span><span>3 × 4</span></span> − <span class=\"frac\"><span>2</span><span>12</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>C</i></span><span class=\"cd m\">= <span class=\"frac\"><span>20</span><span>12</span></span> − <span class=\"frac\"><span>2</span><span>12</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>C</i></span><span class=\"cd m\">= <span class=\"frac\"><span>18</span><span>12</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>C</i></span><span class=\"cd m\">= <span class=\"frac\"><span>6 × 3</span><span>6 × 2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>C</i></span><span class=\"cd m\">= <span class=\"frac\"><span>3</span><span>2</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>D</i> = <span class=\"bp\">(</span><span class=\"frac\"><span>5</span><span>3</span></span> − <span class=\"frac\"><span>2</span><span>3</span></span><span class=\"bp\">)</span> ÷ 4</span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        1,
        4
      ],
      "traps": [
        {
          "v": [
            3,
            2
          ],
          "fr": "Tu as fait la division en premier\u00a0: c’est le calcul C.<br>Ici, la parenthèse passe avant."
        }
      ],
      "hint": "Il y a des parenthèses\u00a0: que calcule-t-on en premier\u00a0?",
      "sol": "<p><b>En premier\u00a0: la parenthèse.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>D</i></span><span class=\"cd m\">= <span class=\"frac\"><span>3</span><span>3</span></span> ÷ 4</span><span class=\"cl\"></span><span class=\"cg m\"><i>D</i></span><span class=\"cd m\">= 1 ÷ 4</span><span class=\"cl\"></span><span class=\"cg m\"><i>D</i></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>4</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>E</i> = 1 − <span class=\"frac\"><span>1</span><span>2</span></span> ÷ <span class=\"frac\"><span>1</span><span>4</span></span></span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": -1,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 2,
          "fr": "Tu as fait la soustraction en premier\u00a0: c’est le calcul F.<br>Sans parenthèses, la division passe avant la soustraction."
        },
        {
          "v": 0.875,
          "fr": "Tu as multiplié par un quart.<br>Diviser par <span class=\"m nw\"><span class=\"frac\"><span>1</span><span>4</span></span></span>, c’est multiplier par son inverse, 4."
        }
      ],
      "hint": "Il n’y a pas de parenthèses\u00a0: quelle opération passe en premier\u00a0?<br>Le résultat est un entier.",
      "sol": "<p><b>En premier\u00a0: la division.</b><br>Règle\u00a0: je multiplie par l’inverse de <span class=\"m nw\"><span class=\"frac\"><span>1</span><span>4</span></span></span>, c’est-à-dire 4.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>E</i></span><span class=\"cd m\">= 1 − <span class=\"frac\"><span>1</span><span>2</span></span> × 4</span><span class=\"cl\"></span><span class=\"cg m\"><i>E</i></span><span class=\"cd m\">= 1 − <span class=\"frac\"><span>4</span><span>2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>E</i></span><span class=\"cd m\">= 1 − 2</span><span class=\"cl\"></span><span class=\"cg m\"><i>E</i></span><span class=\"cd m\">= −1</span></div>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>F</i> = <span class=\"bp\">(</span>1 − <span class=\"frac\"><span>1</span><span>2</span></span><span class=\"bp\">)</span> ÷ <span class=\"frac\"><span>1</span><span>4</span></span></span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 2,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 0.125,
          "fr": "Tu as multiplié par un quart.<br>Diviser par <span class=\"m nw\"><span class=\"frac\"><span>1</span><span>4</span></span></span>, c’est multiplier par son inverse, 4."
        }
      ],
      "hint": "Il y a des parenthèses\u00a0: que calcule-t-on en premier\u00a0?<br>Le résultat est un entier.",
      "sol": "<p><b>En premier\u00a0: la parenthèse.</b><br>Règle\u00a0: <span class=\"m nw\">1 = <span class=\"frac\"><span>2</span><span>2</span></span></span>.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>F</i></span><span class=\"cd m\">= <span class=\"bp\">(</span><span class=\"frac\"><span>2</span><span>2</span></span> − <span class=\"frac\"><span>1</span><span>2</span></span><span class=\"bp\">)</span> ÷ <span class=\"frac\"><span>1</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>F</i></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>2</span></span> ÷ <span class=\"frac\"><span>1</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>F</i></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>2</span></span> × 4</span><span class=\"cl\"></span><span class=\"cg m\"><i>F</i></span><span class=\"cd m\">= <span class=\"frac\"><span>4</span><span>2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>F</i></span><span class=\"cd m\">= 2</span></div>"
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e9",
  "group": "frac",
  "num": "9",
  "src": "fiche de révision",
  "title": "Calculs complets, comme au brevet",
  "stars": 3,
  "text": "<p>Calcule en détaillant toutes les étapes <b>sur ton cahier</b>.<br>Donne le résultat sous forme de fraction irréductible ou d’entier.</p>",
  "parts": [
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>G</i> = <span class=\"frac\"><span>3</span><span>7</span></span> × <span class=\"frac\"><span>14</span><span>9</span></span> − <span class=\"frac\"><span>1</span><span>3</span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        1,
        3
      ],
      "traps": [
        {
          "v": [
            11,
            21
          ],
          "fr": "Tu as fait la soustraction en premier.<br>La multiplication passe avant la soustraction."
        }
      ],
      "hint": "Décompose 14 et 9 avant de multiplier\u00a0: <span class=\"m nw\">14 = 2 × 7</span> et <span class=\"m nw\">9 = 3 × 3</span>.",
      "sol": "<p><b>En premier\u00a0: la multiplication.</b><br>Règle\u00a0: je décompose pour simplifier avant de multiplier.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>G</i></span><span class=\"cd m\">= <span class=\"frac\"><span>3 × 14</span><span>7 × 9</span></span> − <span class=\"frac\"><span>1</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>G</i></span><span class=\"cd m\">= <span class=\"frac\"><span>3 × 2 × 7</span><span>7 × 3 × 3</span></span> − <span class=\"frac\"><span>1</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>G</i></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1</span><span>3</span></span></span></div><p><b>Ensuite\u00a0: la soustraction.</b><br>Les dénominateurs sont déjà égaux.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>G</i></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>3</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>H</i> = <span class=\"frac\"><span>7</span><span>5</span></span> − <span class=\"frac\"><span>2</span><span>5</span></span> × <span class=\"bp\">(</span>3 + <span class=\"frac\"><span>1</span><span>2</span></span><span class=\"bp\">)</span></span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 0,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 3.5,
          "fr": "Tu as fait la soustraction avant la multiplication.<br>La multiplication passe avant."
        }
      ],
      "hint": "La parenthèse d’abord, puis la multiplication, puis la soustraction.<br>Le résultat est un entier.",
      "sol": "<p><b>En premier\u00a0: la parenthèse.</b><br>Règle\u00a0: <span class=\"m nw\">3 = <span class=\"frac\"><span>6</span><span>2</span></span></span>.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>H</i></span><span class=\"cd m\">= <span class=\"frac\"><span>7</span><span>5</span></span> − <span class=\"frac\"><span>2</span><span>5</span></span> × <span class=\"bp\">(</span><span class=\"frac\"><span>6</span><span>2</span></span> + <span class=\"frac\"><span>1</span><span>2</span></span><span class=\"bp\">)</span></span><span class=\"cl\"></span><span class=\"cg m\"><i>H</i></span><span class=\"cd m\">= <span class=\"frac\"><span>7</span><span>5</span></span> − <span class=\"frac\"><span>2</span><span>5</span></span> × <span class=\"frac\"><span>7</span><span>2</span></span></span></div><p><b>Ensuite\u00a0: la multiplication, puis la soustraction.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>H</i></span><span class=\"cd m\">= <span class=\"frac\"><span>7</span><span>5</span></span> − <span class=\"frac\"><span>2 × 7</span><span>5 × 2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>H</i></span><span class=\"cd m\">= <span class=\"frac\"><span>7</span><span>5</span></span> − <span class=\"frac\"><span>7</span><span>5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>H</i></span><span class=\"cd m\">= 0</span></div>"
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>I</i> = <span class=\"bp\">(</span><span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1</span><span>2</span></span><span class=\"bp\">)</span> ÷ <span class=\"bp\">(</span><span class=\"frac\"><span>1</span><span>3</span></span> + <span class=\"frac\"><span>1</span><span>2</span></span><span class=\"bp\">)</span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        1,
        5
      ],
      "traps": [
        {
          "v": [
            5,
            36
          ],
          "fr": "Tu as multiplié sans retourner la deuxième fraction.<br>Diviser, c’est multiplier par l’inverse."
        },
        {
          "v": [
            5,
            1
          ],
          "fr": "Tu as retourné la première fraction.<br>On retourne celle par laquelle on divise\u00a0: la deuxième."
        }
      ],
      "hint": "Calcule chaque parenthèse avec le dénominateur 6, puis fais la division.",
      "sol": "<p><b>En premier\u00a0: les deux parenthèses.</b><br>Règle\u00a0: même dénominateur (6) dans chacune.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>I</i></span><span class=\"cd m\">= <span class=\"bp\">(</span><span class=\"frac\"><span>4</span><span>6</span></span> − <span class=\"frac\"><span>3</span><span>6</span></span><span class=\"bp\">)</span> ÷ <span class=\"bp\">(</span><span class=\"frac\"><span>2</span><span>6</span></span> + <span class=\"frac\"><span>3</span><span>6</span></span><span class=\"bp\">)</span></span><span class=\"cl\"></span><span class=\"cg m\"><i>I</i></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>6</span></span> ÷ <span class=\"frac\"><span>5</span><span>6</span></span></span></div><p><b>Ensuite\u00a0: la division.</b><br>Règle\u00a0: je multiplie par l’inverse.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>I</i></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>6</span></span> × <span class=\"frac\"><span>6</span><span>5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>I</i></span><span class=\"cd m\">= <span class=\"frac\"><span>1 × 6</span><span>6 × 5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>I</i></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>5</span></span></span></div>",
      "frac": [
        [
          0,
          1
        ]
      ]
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>J</i> = 2 − <span class=\"bp\">(</span><span class=\"frac\"><span>1</span><span>2</span></span><span class=\"bp\">)</span><sup>2</sup> × 4</span></p>",
      "label": "Résultat",
      "unit": "",
      "ans": 1,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 7,
          "fr": "Tu as fait la soustraction avant la multiplication.<br>La multiplication passe avant."
        },
        {
          "v": 0,
          "fr": "Attention à la puissance\u00a0: le numérateur et le dénominateur sont tous les deux au carré, donc on trouve un quart."
        }
      ],
      "hint": "La puissance d’abord, puis la multiplication, puis la soustraction.<br>Le résultat est un entier.",
      "sol": "<p><b>En premier\u00a0: la puissance.</b><br>Règle\u00a0: <span class=\"m nw\"><span class=\"bp\">(</span><span class=\"frac\"><span>1</span><span>2</span></span><span class=\"bp\">)</span><sup>2</sup> = <span class=\"frac\"><span>1</span><span>2</span></span> × <span class=\"frac\"><span>1</span><span>2</span></span> = <span class=\"frac\"><span>1</span><span>4</span></span></span>.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>J</i></span><span class=\"cd m\">= 2 − <span class=\"frac\"><span>1</span><span>4</span></span> × 4</span><span class=\"cl\"></span><span class=\"cg m\"><i>J</i></span><span class=\"cd m\">= 2 − <span class=\"frac\"><span>4</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>J</i></span><span class=\"cd m\">= 2 − 1</span><span class=\"cl\"></span><span class=\"cg m\"><i>J</i></span><span class=\"cd m\">= 1</span></div>"
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><i>K</i> = <span class=\"frac\"><span>3</span><span>4</span></span> − <span class=\"bp\">(</span><span class=\"frac\"><span>1</span><span>2</span></span> − <span class=\"frac\"><span>1</span><span>4</span></span><span class=\"bp\">)</span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {s0}<span class=\"frac\"><span>{0}</span><span>{1}</span></span>",
      "ans": [
        1,
        2
      ],
      "traps": [
        {
          "v": [
            0,
            null
          ],
          "fr": "Tu as enlevé la parenthèse sans changer les signes à l’intérieur.<br>Calcule d’abord la parenthèse."
        }
      ],
      "hint": "Calcule d’abord la parenthèse, avec le dénominateur 4.",
      "sol": "<p><b>En premier\u00a0: la parenthèse.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>K</i></span><span class=\"cd m\">= <span class=\"frac\"><span>3</span><span>4</span></span> − <span class=\"bp\">(</span><span class=\"frac\"><span>2</span><span>4</span></span> − <span class=\"frac\"><span>1</span><span>4</span></span><span class=\"bp\">)</span></span><span class=\"cl\"></span><span class=\"cg m\"><i>K</i></span><span class=\"cd m\">= <span class=\"frac\"><span>3</span><span>4</span></span> − <span class=\"frac\"><span>1</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>K</i></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>K</i></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>2</span></span></span></div><p>Le piège\u00a0: si on enlève la parenthèse sans changer les signes, on calcule <span class=\"m nw\"><span class=\"frac\"><span>3</span><span>4</span></span> − <span class=\"frac\"><span>1</span><span>2</span></span> − <span class=\"frac\"><span>1</span><span>4</span></span> = 0</span>, ce qui est faux.</p>",
      "frac": [
        [
          0,
          1
        ]
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e10",
  "group": "frac",
  "num": "10",
  "src": "fiche de révision",
  "title": "Vrai ou faux\u00a0? Justifie par un calcul",
  "stars": 2,
  "tag": "VRAI / FAUX",
  "text": "<p>Écris d’abord ton calcul <b>sur ton cahier</b>, puis réponds.</p>",
  "parts": [
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> + <span class=\"frac\"><span>1</span><span>4</span></span> = <span class=\"frac\"><span>3</span><span>7</span></span></span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 1,
      "fb": [
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> + <span class=\"frac\"><span>1</span><span>4</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>8</span><span>12</span></span> + <span class=\"frac\"><span>3</span><span>12</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>11</span><span>12</span></span></span></div><p>On n’additionne jamais les dénominateurs.</p>",
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> + <span class=\"frac\"><span>1</span><span>4</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>8</span><span>12</span></span> + <span class=\"frac\"><span>3</span><span>12</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>11</span><span>12</span></span></span></div><p>On n’additionne jamais les dénominateurs.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\">1 − <span class=\"frac\"><span>1</span><span>3</span></span> × 3 = 2</span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 1,
      "fb": [
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">1 − <span class=\"prem\"><span class=\"frac\"><span>1</span><span>3</span></span> × 3</span></span><span class=\"cd m\">= 1 − <span class=\"frac\"><span>3</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 1 − 1</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 0</span></div><p>On trouve 2 seulement en faisant la soustraction en premier\u00a0: <span class=\"m nw\"><span class=\"bp\">(</span>1 − <span class=\"frac\"><span>1</span><span>3</span></span><span class=\"bp\">)</span> × 3 = 2</span>.</p>",
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">1 − <span class=\"prem\"><span class=\"frac\"><span>1</span><span>3</span></span> × 3</span></span><span class=\"cd m\">= 1 − <span class=\"frac\"><span>3</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 1 − 1</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 0</span></div><p>On trouve 2 seulement en faisant la soustraction en premier\u00a0: <span class=\"m nw\"><span class=\"bp\">(</span>1 − <span class=\"frac\"><span>1</span><span>3</span></span><span class=\"bp\">)</span> × 3 = 2</span>.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>1</span><span>2</span></span> ÷ 2 = 1</span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 1,
      "fb": [
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>1</span><span>2</span></span> ÷ 2</span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>2</span></span> × <span class=\"frac\"><span>1</span><span>2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>1</span><span>4</span></span></span></div>",
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>1</span><span>2</span></span> ÷ 2</span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>2</span></span> × <span class=\"frac\"><span>1</span><span>2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>1</span><span>4</span></span></span></div>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p>Les <span class=\"m nw\"><span class=\"frac\"><span>3</span><span>4</span></span></span> de 20 font 15.</p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 0,
      "fb": [
        "<p><b>Vrai.</b></p><p>«\u00a0Les <span class=\"m nw\"><span class=\"frac\"><span>3</span><span>4</span></span></span> de\u00a0» veut dire «\u00a0<span class=\"m nw\"><span class=\"frac\"><span>3</span><span>4</span></span> ×</span>\u00a0».</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>3</span><span>4</span></span> × 20</span><span class=\"cd m\">= <span class=\"frac\"><span>60</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 15</span></div>",
        "<p><b>Vrai.</b></p><p>«\u00a0Les <span class=\"m nw\"><span class=\"frac\"><span>3</span><span>4</span></span></span> de\u00a0» veut dire «\u00a0<span class=\"m nw\"><span class=\"frac\"><span>3</span><span>4</span></span> ×</span>\u00a0».</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>3</span><span>4</span></span> × 20</span><span class=\"cd m\">= <span class=\"frac\"><span>60</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 15</span></div>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\"><span class=\"bp\">(</span><span class=\"frac\"><span>2</span><span>3</span></span><span class=\"bp\">)</span><sup>2</sup> = <span class=\"frac\"><span>4</span><span>6</span></span></span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 1,
      "fb": [
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"bp\">(</span><span class=\"frac\"><span>2</span><span>3</span></span><span class=\"bp\">)</span><sup>2</sup></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> × <span class=\"frac\"><span>2</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>4</span><span>9</span></span></span></div><p>Le numérateur et le dénominateur sont tous les deux au carré.</p>",
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"bp\">(</span><span class=\"frac\"><span>2</span><span>3</span></span><span class=\"bp\">)</span><sup>2</sup></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> × <span class=\"frac\"><span>2</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>4</span><span>9</span></span></span></div><p>Le numérateur et le dénominateur sont tous les deux au carré.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> × <span class=\"frac\"><span>3</span><span>2</span></span> = 1</span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 0,
      "fb": [
        "<p><b>Vrai.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> × <span class=\"frac\"><span>3</span><span>2</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>6</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 1</span></div><p>Ces deux nombres sont inverses l’un de l’autre.</p>",
        "<p><b>Vrai.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> × <span class=\"frac\"><span>3</span><span>2</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>6</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 1</span></div><p>Ces deux nombres sont inverses l’un de l’autre.</p>"
      ]
    }
  ]
});
