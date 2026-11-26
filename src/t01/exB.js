/* 3e, calculs : priorités, fractions, puissances de 10. Fichier de données : uniquement des EXOS.push({...}). */
EXOS.push({
  "ch": "t1",
  "id": "t1e11",
  "group": "puis",
  "num": "11",
  "src": "fiche de révision",
  "title": "Écris en écriture décimale",
  "stars": 1,
  "text": "<p>Donne l’écriture décimale de chaque nombre.</p>",
  "parts": [
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">10<sup>5</sup></span></p>",
      "label": "Écriture décimale",
      "unit": "",
      "ans": 100000,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 50,
          "fr": "Une puissance n’est pas une multiplication\u00a0: <span class=\"m nw\">10<sup>5</sup></span>, c’est 10 multiplié 5 fois par lui-même."
        },
        {
          "v": 10000,
          "fr": "Compte bien le nombre de zéros\u00a0: <span class=\"m nw\">10<sup>5</sup></span> s’écrit avec un 1 suivi de 5 zéros."
        },
        {
          "v": 1000000,
          "fr": "Compte bien le nombre de zéros\u00a0: <span class=\"m nw\">10<sup>5</sup></span> s’écrit avec un 1 suivi de 5 zéros."
        }
      ],
      "hint": "<span class=\"m nw\">10<sup><i>n</i></sup></span> s’écrit avec un 1 suivi de <span class=\"m nw\"><i>n</i></span> zéros.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>5</sup></span><span class=\"cd m res\">= 100\u00a0000</span></div><p>Un 1 suivi de 5 zéros.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">10<sup>−3</sup></span></p>",
      "label": "Écriture décimale",
      "unit": "",
      "ans": 0.001,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": -1000,
          "fr": "Un exposant négatif ne donne pas un nombre négatif\u00a0: <span class=\"m nw\">10<sup>−3</sup> = <span class=\"frac\"><span>1</span><span>10<sup>3</sup></span></span></span>."
        },
        {
          "v": 0.01,
          "fr": "Compte les rangs\u00a0: le 1 est au 3e rang après la virgule."
        },
        {
          "v": 0.0001,
          "fr": "Compte les rangs\u00a0: le 1 est au 3e rang après la virgule."
        },
        {
          "v": -30,
          "fr": "Une puissance n’est pas une multiplication, et un exposant négatif ne donne pas un nombre négatif."
        }
      ],
      "hint": "<span class=\"m nw\">10<sup>−<i>n</i></sup> = <span class=\"frac\"><span>1</span><span>10<sup><i>n</i></sup></span></span></span>\u00a0: le 1 est au <span class=\"m nw\"><i>n</i></span>-ième rang après la virgule.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>−3</sup></span><span class=\"cd m res\">= 0,001</span></div><p>Le 1 est au 3e rang après la virgule.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">10<sup>0</sup></span></p>",
      "label": "Écriture décimale",
      "unit": "",
      "ans": 1,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 0,
          "fr": "Un nombre à la puissance 0 vaut 1, pas 0\u00a0: <span class=\"m nw\">10<sup>0</sup> = 1</span>."
        },
        {
          "v": 10,
          "fr": "Attention\u00a0: 10 tout seul, c’est <span class=\"m nw\">10<sup>1</sup></span>.<br>Avec l’exposant 0, on obtient 1."
        }
      ],
      "hint": "Un nombre non nul à la puissance 0 vaut 1.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>0</sup></span><span class=\"cd m res\">= 1</span></div>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">3,2 × 10<sup>4</sup></span></p>",
      "label": "Écriture décimale",
      "unit": "",
      "ans": 32000,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 3200,
          "fr": "Compte les rangs\u00a0: la virgule se décale de 4 rangs vers la droite."
        },
        {
          "v": 320000,
          "fr": "Compte les rangs\u00a0: la virgule se décale de 4 rangs vers la droite."
        },
        {
          "v": 0.00032,
          "fr": "L’exposant est positif\u00a0: le nombre devient plus grand, la virgule part vers la droite."
        }
      ],
      "hint": "Multiplier par <span class=\"m nw\">10<sup>4</sup></span> décale la virgule de 4 rangs vers la droite.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">3,2 × 10<sup>4</sup></span><span class=\"cd m res\">= 32\u00a0000</span></div><p>La virgule se décale de 4 rangs vers la droite.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">7 × 10<sup>−2</sup></span></p>",
      "label": "Écriture décimale",
      "unit": "",
      "ans": 0.07,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 700,
          "fr": "L’exposant est négatif\u00a0: le nombre devient plus petit, la virgule part vers la gauche."
        },
        {
          "v": 0.007,
          "fr": "Compte les rangs\u00a0: la virgule se décale de 2 rangs vers la gauche."
        },
        {
          "v": 0.7,
          "fr": "Compte les rangs\u00a0: la virgule se décale de 2 rangs vers la gauche."
        }
      ],
      "hint": "Multiplier par <span class=\"m nw\">10<sup>−2</sup></span> décale la virgule de 2 rangs vers la gauche.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">7 × 10<sup>−2</sup></span><span class=\"cd m res\">= 0,07</span></div>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">4,05 × 10<sup>−3</sup></span></p>",
      "label": "Écriture décimale",
      "unit": "",
      "ans": 0.00405,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 4050,
          "fr": "L’exposant est négatif\u00a0: le nombre devient plus petit, la virgule part vers la gauche."
        },
        {
          "v": 0.0405,
          "fr": "Compte les rangs\u00a0: la virgule se décale de 3 rangs vers la gauche."
        },
        {
          "v": 0.000405,
          "fr": "Compte les rangs\u00a0: la virgule se décale de 3 rangs vers la gauche."
        }
      ],
      "hint": "Multiplier par <span class=\"m nw\">10<sup>−3</sup></span> décale la virgule de 3 rangs vers la gauche.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">4,05 × 10<sup>−3</sup></span><span class=\"cd m res\">= 0,004\u00a005</span></div><p>La virgule se décale de 3 rangs vers la gauche.</p>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">6 × 10<sup>−1</sup></span></p>",
      "label": "Écriture décimale",
      "unit": "",
      "ans": 0.6,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 60,
          "fr": "L’exposant est négatif\u00a0: le nombre devient plus petit, la virgule part vers la gauche."
        },
        {
          "v": 0.06,
          "fr": "Compte les rangs\u00a0: la virgule se décale d’un seul rang vers la gauche."
        }
      ],
      "hint": "Multiplier par <span class=\"m nw\">10<sup>−1</sup></span> décale la virgule d’un rang vers la gauche.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">6 × 10<sup>−1</sup></span><span class=\"cd m res\">= 0,6</span></div>"
    },
    {
      "kind": "num",
      "q": "<p class=\"mq\"><span class=\"m nw\">1,7 × 10<sup>6</sup></span></p>",
      "label": "Écriture décimale",
      "unit": "",
      "ans": 1700000,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 17000000,
          "fr": "Compte les rangs\u00a0: la virgule se décale de 6 rangs vers la droite."
        },
        {
          "v": 170000,
          "fr": "Compte les rangs\u00a0: la virgule se décale de 6 rangs vers la droite."
        }
      ],
      "hint": "Multiplier par <span class=\"m nw\">10<sup>6</sup></span> décale la virgule de 6 rangs vers la droite.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">1,7 × 10<sup>6</sup></span><span class=\"cd m res\">= 1\u00a0700\u00a0000</span></div>"
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e12",
  "group": "puis",
  "num": "12",
  "src": "fiche de révision",
  "title": "Une seule puissance de 10",
  "stars": 2,
  "text": "<p>Écris chaque calcul sous la forme d’une seule puissance de 10.<br>Avant chaque calcul, écris la règle <b>sur ton cahier</b> (par exemple\u00a0: «\u00a0produit, j’additionne les exposants\u00a0»).<br>Attention\u00a0: deux calculs sont des pièges.</p>",
  "parts": [
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\">10<sup>3</sup> × 10<sup>4</sup></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= 10<sup class=\"bxs\">{±0}</sup>",
      "ans": [
        7
      ],
      "traps": [
        {
          "v": [
            12
          ],
          "fr": "Pour un produit, on additionne les exposants\u00a0: on ne les multiplie pas."
        }
      ],
      "hint": "C’est un produit\u00a0: que fait-on avec les exposants\u00a0?",
      "sol": "<p>Produit\u00a0: j’additionne les exposants.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>3</sup> × 10<sup>4</sup></span><span class=\"cd m\">= 10<sup>3 + 4</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 10<sup>7</sup></span></div>"
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\">10<sup>−2</sup> × 10<sup>5</sup></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= 10<sup class=\"bxs\">{±0}</sup>",
      "ans": [
        3
      ],
      "traps": [
        {
          "v": [
            -10
          ],
          "fr": "Pour un produit, on additionne les exposants\u00a0: on ne les multiplie pas."
        },
        {
          "v": [
            7
          ],
          "fr": "Attention au signe des exposants\u00a0: <span class=\"m nw\">−2 + 5 = 3</span>."
        },
        {
          "v": [
            -7
          ],
          "fr": "Attention au signe des exposants\u00a0: <span class=\"m nw\">−2 + 5 = 3</span>."
        }
      ],
      "hint": "C’est un produit\u00a0: que fait-on avec les exposants\u00a0?",
      "sol": "<p>Produit\u00a0: j’additionne les exposants.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>−2</sup> × 10<sup>5</sup></span><span class=\"cd m\">= 10<sup>−2 + 5</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 10<sup>3</sup></span></div>"
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>10<sup>8</sup></span><span>10<sup>3</sup></span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= 10<sup class=\"bxs\">{±0}</sup>",
      "ans": [
        5
      ],
      "traps": [
        {
          "v": [
            11
          ],
          "fr": "Pour un quotient, on soustrait les exposants\u00a0: celui du haut moins celui du bas."
        },
        {
          "v": [
            24
          ],
          "fr": "Pour un quotient, on soustrait les exposants\u00a0: celui du haut moins celui du bas."
        },
        {
          "v": [
            -5
          ],
          "fr": "L’ordre compte\u00a0: exposant du haut moins exposant du bas."
        }
      ],
      "hint": "C’est un quotient\u00a0: que fait-on avec les exposants\u00a0?",
      "sol": "<p>Quotient\u00a0: je soustrais les exposants.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>10<sup>8</sup></span><span>10<sup>3</sup></span></span></span><span class=\"cd m\">= 10<sup>8 − 3</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 10<sup>5</sup></span></div>"
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>10<sup>2</sup></span><span>10<sup>−4</sup></span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= 10<sup class=\"bxs\">{±0}</sup>",
      "ans": [
        6
      ],
      "traps": [
        {
          "v": [
            -2
          ],
          "fr": "Piège de signe dans la soustraction\u00a0: <span class=\"m nw\">2 − (−4) = 2 + 4</span>.<br>Soustraire <span class=\"m nw\">−4</span>, c’est ajouter 4."
        },
        {
          "v": [
            -8
          ],
          "fr": "Pour un quotient, on soustrait les exposants\u00a0: celui du haut moins celui du bas."
        },
        {
          "v": [
            -6
          ],
          "fr": "L’ordre compte\u00a0: exposant du haut moins exposant du bas."
        }
      ],
      "hint": "C’est un quotient.<br>Attention\u00a0: soustraire un nombre négatif, c’est ajouter son opposé.",
      "sol": "<p>Quotient\u00a0: je soustrais les exposants.<br>Piège de signe\u00a0: soustraire <span class=\"m nw\">−4</span>, c’est ajouter 4.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>10<sup>2</sup></span><span>10<sup>−4</sup></span></span></span><span class=\"cd m\">= 10<sup>2 − (−4)</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 10<sup>2 + 4</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 10<sup>6</sup></span></div>"
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\">(10<sup>3</sup>)<sup>2</sup></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= 10<sup class=\"bxs\">{±0}</sup>",
      "ans": [
        6
      ],
      "traps": [
        {
          "v": [
            5
          ],
          "fr": "Pour une puissance de puissance, on multiplie les exposants\u00a0: on ne les additionne pas."
        },
        {
          "v": [
            9
          ],
          "fr": "On multiplie les exposants\u00a0: <span class=\"m nw\">3 × 2</span>, pas <span class=\"m nw\">3<sup>2</sup></span>."
        }
      ],
      "hint": "C’est une puissance de puissance\u00a0: que fait-on avec les exposants\u00a0?",
      "sol": "<p>Puissance d’une puissance\u00a0: je multiplie les exposants.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">(10<sup>3</sup>)<sup>2</sup></span><span class=\"cd m\">= 10<sup>3 × 2</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 10<sup>6</sup></span></div>"
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\">(10<sup>−2</sup>)<sup>3</sup></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= 10<sup class=\"bxs\">{±0}</sup>",
      "ans": [
        -6
      ],
      "traps": [
        {
          "v": [
            1
          ],
          "fr": "Pour une puissance de puissance, on multiplie les exposants\u00a0: on ne les additionne pas."
        },
        {
          "v": [
            6
          ],
          "fr": "Attention au signe des exposants\u00a0: <span class=\"m nw\">(−2) × 3 = −6</span>."
        },
        {
          "v": [
            -8
          ],
          "fr": "On multiplie les exposants\u00a0: <span class=\"m nw\">(−2) × 3</span>, pas <span class=\"m nw\">(−2)<sup>3</sup></span>."
        }
      ],
      "hint": "C’est une puissance de puissance\u00a0: que fait-on avec les exposants\u00a0?",
      "sol": "<p>Puissance d’une puissance\u00a0: je multiplie les exposants.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">(10<sup>−2</sup>)<sup>3</sup></span><span class=\"cd m\">= 10<sup>(−2) × 3</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 10<sup>−6</sup></span></div>"
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>10<sup>5</sup> × 10<sup>−2</sup></span><span>10<sup>7</sup></span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= 10<sup class=\"bxs\">{±0}</sup>",
      "ans": [
        -4
      ],
      "traps": [
        {
          "v": [
            10
          ],
          "fr": "On additionne les exposants du produit, puis on soustrait celui du dénominateur."
        },
        {
          "v": [
            4
          ],
          "fr": "L’ordre compte\u00a0: exposant du haut moins exposant du bas, <span class=\"m nw\">3 − 7 = −4</span>."
        },
        {
          "v": [
            0
          ],
          "fr": "Au numérateur c’est un produit\u00a0: on additionne les exposants, <span class=\"m nw\">5 + (−2) = 3</span>."
        }
      ],
      "hint": "Commence par le numérateur\u00a0: c’est un produit.<br>Ensuite, c’est un quotient.",
      "sol": "<p>D’abord le numérateur (produit), puis le quotient.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>10<sup>5</sup> × 10<sup>−2</sup></span><span>10<sup>7</sup></span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>10<sup>5 + (−2)</sup></span><span>10<sup>7</sup></span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>10<sup>3</sup></span><span>10<sup>7</sup></span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 10<sup>3 − 7</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 10<sup>−4</sup></span></div>"
    },
    {
      "kind": "fill",
      "q": "<p class=\"mq\"><span class=\"m nw\">10<sup>4</sup> × 10<sup>4</sup></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= 10<sup class=\"bxs\">{±0}</sup>",
      "ans": [
        8
      ],
      "traps": [
        {
          "v": [
            16
          ],
          "fr": "Pour un produit, on additionne les exposants\u00a0: on ne les multiplie pas."
        },
        {
          "v": [
            4
          ],
          "fr": "On additionne les exposants\u00a0: <span class=\"m nw\">4 + 4 = 8</span>."
        }
      ],
      "hint": "C’est un produit\u00a0: que fait-on avec les exposants\u00a0?",
      "sol": "<p>Produit\u00a0: j’additionne les exposants.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>4</sup> × 10<sup>4</sup></span><span class=\"cd m\">= 10<sup>4 + 4</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 10<sup>8</sup></span></div>"
    },
    {
      "kind": "choice",
      "q": "<p>Peut-on écrire ce calcul comme une seule puissance de 10\u00a0?</p><p class=\"mq\"><span class=\"m nw\">10<sup>4</sup> + 10<sup>4</sup></span></p>",
      "choices": [
        "Oui : <span class=\"m nw\">10<sup>8</sup></span>",
        "Oui : <span class=\"m nw\">10<sup>16</sup></span>",
        "Non : cela fait <span class=\"m nw\">2 × 10<sup>4</sup> = 20\u00a0000</span>"
      ],
      "correct": 2,
      "fb": [
        "<p>C’est le piège\u00a0: tu as additionné les exposants, mais c’est la règle du <b>produit</b>.<br>Il n’y a pas de règle pour l’addition\u00a0: <span class=\"m nw\">10<sup>8</sup> = 100\u00a0000\u00a0000</span>, alors que <span class=\"m nw\">10<sup>4</sup> + 10<sup>4</sup> = 20\u00a0000</span>.</p>",
        "<p>Tu as multiplié les exposants\u00a0: c’est la règle de la puissance d’une puissance.<br>Il n’y a pas de règle pour l’addition.</p>",
        "<p><b>Oui.</b> Il n’y a pas de règle pour l’addition.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>4</sup> + 10<sup>4</sup></span><span class=\"cd m\">= 2 × 10<sup>4</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 20\u00a0000</span></div><p>Ce n’est pas une puissance de 10, et surtout pas <span class=\"m nw\">10<sup>8</sup> = 100\u00a0000\u00a0000</span>.<br>Compare avec le calcul précédent\u00a0: mêmes nombres, opérations différentes, donc règles différentes.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Peut-on écrire ce calcul comme une seule puissance de 10\u00a0?</p><p class=\"mq\"><span class=\"m nw\">10<sup>3</sup> + 10<sup>2</sup></span></p>",
      "choices": [
        "Oui : <span class=\"m nw\">10<sup>5</sup></span>",
        "Oui : <span class=\"m nw\">10<sup>6</sup></span>",
        "Non : cela fait <span class=\"m nw\">1\u00a0000 + 100 = 1\u00a0100</span>"
      ],
      "correct": 2,
      "fb": [
        "<p>C’est le piège\u00a0: tu as additionné les exposants, mais c’est la règle du <b>produit</b>.<br>Il n’y a pas de règle pour l’addition.</p>",
        "<p>Tu as multiplié les exposants\u00a0: c’est la règle de la puissance d’une puissance.<br>Il n’y a pas de règle pour l’addition.</p>",
        "<p><b>Oui.</b> Il n’y a pas de règle pour l’addition.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>3</sup> + 10<sup>2</sup></span><span class=\"cd m\">= 1\u00a0000 + 100</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 1\u00a0100</span></div><p>Ce n’est pas une puissance de 10.</p>"
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e13",
  "group": "puis",
  "num": "13",
  "src": "fiche de révision",
  "title": "Écriture scientifique",
  "stars": 2,
  "text": "<p>Une écriture scientifique s’écrit <span class=\"m nw\"><i>a</i> × 10<sup><i>n</i></sup></span> avec un seul chiffre, non nul, avant la virgule.</p>",
  "parts": [
    {
      "kind": "fill",
      "q": "<p>Donne l’écriture scientifique.</p><p class=\"mq\"><span class=\"m nw\">45\u00a0000</span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {0} × 10<sup class=\"bxs\">{±1}</sup>",
      "ans": [
        4.5,
        4
      ],
      "traps": [
        {
          "v": [
            4.5,
            -4
          ],
          "fr": "Ce nombre est plus grand que 10\u00a0: l’exposant est positif."
        },
        {
          "v": [
            4.5,
            3
          ],
          "fr": "Compte les rangs\u00a0: la virgule s’est déplacée de 4 rangs."
        },
        {
          "v": [
            4.5,
            5
          ],
          "fr": "Compte les rangs\u00a0: la virgule s’est déplacée de 4 rangs."
        }
      ],
      "hint": "Place la virgule après le premier chiffre non nul, puis compte de combien de rangs elle s’est déplacée.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">45\u00a0000</span><span class=\"cd m res\">= 4,5 × 10<sup>4</sup></span></div>",
      "sci": [
        0,
        1
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Donne l’écriture scientifique.</p><p class=\"mq\"><span class=\"m nw\">0,000\u00a072</span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {0} × 10<sup class=\"bxs\">{±1}</sup>",
      "ans": [
        7.2,
        -4
      ],
      "traps": [
        {
          "v": [
            7.2,
            4
          ],
          "fr": "Ce nombre est plus petit que 1\u00a0: l’exposant est négatif."
        },
        {
          "v": [
            7.2,
            -3
          ],
          "fr": "Compte les rangs\u00a0: la virgule s’est déplacée de 4 rangs."
        },
        {
          "v": [
            7.2,
            -5
          ],
          "fr": "Compte les rangs\u00a0: la virgule s’est déplacée de 4 rangs."
        }
      ],
      "hint": "Place la virgule après le premier chiffre non nul, puis compte de combien de rangs elle s’est déplacée.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">0,000\u00a072</span><span class=\"cd m res\">= 7,2 × 10<sup>−4</sup></span></div>",
      "sci": [
        0,
        1
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Donne l’écriture scientifique.</p><p class=\"mq\"><span class=\"m nw\">382 × 10<sup>3</sup></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {0} × 10<sup class=\"bxs\">{±1}</sup>",
      "ans": [
        3.82,
        5
      ],
      "traps": [
        {
          "v": [
            3.82,
            3
          ],
          "fr": "Tu as déplacé la virgule sans changer l’exposant\u00a0: <span class=\"m nw\">382 = 3,82 × 10<sup>2</sup></span>."
        },
        {
          "v": [
            3.82,
            1
          ],
          "fr": "On additionne les exposants\u00a0: <span class=\"m nw\">10<sup>2</sup> × 10<sup>3</sup> = 10<sup>5</sup></span>."
        }
      ],
      "hint": "Écris d’abord 382 en écriture scientifique\u00a0: <span class=\"m nw\">382 = 3,82 × 10<sup>2</sup></span>.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">382 × 10<sup>3</sup></span><span class=\"cd m\">= 3,82 × 10<sup>2</sup> × 10<sup>3</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 3,82 × 10<sup>5</sup></span></div>",
      "sci": [
        0,
        1
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Donne l’écriture scientifique.</p><p class=\"mq\"><span class=\"m nw\">27 × 10<sup>−5</sup></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {0} × 10<sup class=\"bxs\">{±1}</sup>",
      "ans": [
        2.7,
        -4
      ],
      "traps": [
        {
          "v": [
            2.7,
            -5
          ],
          "fr": "Tu as déplacé la virgule sans changer l’exposant\u00a0: <span class=\"m nw\">27 = 2,7 × 10<sup>1</sup></span>."
        },
        {
          "v": [
            2.7,
            -6
          ],
          "fr": "On additionne les exposants\u00a0: <span class=\"m nw\">1 + (−5) = −4</span>."
        }
      ],
      "hint": "Écris d’abord 27 en écriture scientifique\u00a0: <span class=\"m nw\">27 = 2,7 × 10<sup>1</sup></span>.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">27 × 10<sup>−5</sup></span><span class=\"cd m\">= 2,7 × 10<sup>1</sup> × 10<sup>−5</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 2,7 × 10<sup>−4</sup></span></div>",
      "sci": [
        0,
        1
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Donne l’écriture scientifique.</p><p class=\"mq\"><span class=\"m nw\">0,05 × 10<sup>−2</sup></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {0} × 10<sup class=\"bxs\">{±1}</sup>",
      "ans": [
        5,
        -4
      ],
      "traps": [
        {
          "v": [
            5,
            -2
          ],
          "fr": "Tu as déplacé la virgule sans changer l’exposant\u00a0: <span class=\"m nw\">0,05 = 5 × 10<sup>−2</sup></span>."
        },
        {
          "v": [
            5,
            0
          ],
          "fr": "On additionne les exposants\u00a0: <span class=\"m nw\">−2 + (−2) = −4</span>."
        },
        {
          "v": [
            5,
            4
          ],
          "fr": "Ce nombre est plus petit que 1\u00a0: l’exposant est négatif."
        }
      ],
      "hint": "Écris d’abord 0,05 en écriture scientifique\u00a0: <span class=\"m nw\">0,05 = 5 × 10<sup>−2</sup></span>.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">0,05 × 10<sup>−2</sup></span><span class=\"cd m\">= 5 × 10<sup>−2</sup> × 10<sup>−2</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 5 × 10<sup>−4</sup></span></div>",
      "sci": [
        0,
        1
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Calcule, puis donne le résultat en écriture scientifique.<br>Méthode\u00a0: je regroupe les nombres d’un côté et les puissances de 10 de l’autre.</p><p class=\"mq\"><span class=\"m nw\">6 × 10<sup>5</sup> × 4 × 10<sup>−2</sup></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {0} × 10<sup class=\"bxs\">{±1}</sup>",
      "ans": [
        2.4,
        4
      ],
      "traps": [
        {
          "v": [
            2.4,
            3
          ],
          "fr": "Tu as déplacé la virgule sans changer l’exposant\u00a0: <span class=\"m nw\">24 = 2,4 × 10<sup>1</sup></span>."
        },
        {
          "v": [
            2.4,
            -9
          ],
          "fr": "Pour un produit, on additionne les exposants\u00a0: <span class=\"m nw\">5 + (−2) = 3</span>."
        }
      ],
      "hint": "Regroupe\u00a0: <span class=\"m nw\">6 × 4</span> d’un côté, <span class=\"m nw\">10<sup>5</sup> × 10<sup>−2</sup></span> de l’autre.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">6 × 10<sup>5</sup> × 4 × 10<sup>−2</sup></span><span class=\"cl\"></span><span class=\"ce m\">= (6 × 4) × (10<sup>5</sup> × 10<sup>−2</sup>)</span><span class=\"cl\"></span><span class=\"ce m\">= 24 × 10<sup>3</sup></span><span class=\"cl\"></span><span class=\"ce m\">= 2,4 × 10<sup>1</sup> × 10<sup>3</sup></span><span class=\"cl\"></span><span class=\"ce m res\">= 2,4 × 10<sup>4</sup></span></div>",
      "sci": [
        0,
        1
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Calcule, puis donne le résultat en écriture scientifique.<br>Méthode\u00a0: je regroupe les nombres d’un côté et les puissances de 10 de l’autre.</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>9 × 10<sup>8</sup></span><span>3 × 10<sup>2</sup></span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {0} × 10<sup class=\"bxs\">{±1}</sup>",
      "ans": [
        3,
        6
      ],
      "traps": [
        {
          "v": [
            3,
            10
          ],
          "fr": "Pour un quotient, on soustrait les exposants\u00a0: celui du haut moins celui du bas."
        },
        {
          "v": [
            3,
            4
          ],
          "fr": "Pour un quotient, on soustrait les exposants\u00a0: <span class=\"m nw\">8 − 2 = 6</span>."
        },
        {
          "v": [
            6,
            6
          ],
          "fr": "On divise 9 par 3\u00a0: cela fait 3."
        }
      ],
      "hint": "Regroupe\u00a0: <span class=\"m nw\"><span class=\"frac\"><span>9</span><span>3</span></span></span> d’un côté, <span class=\"m nw\"><span class=\"frac\"><span>10<sup>8</sup></span><span>10<sup>2</sup></span></span></span> de l’autre.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>9 × 10<sup>8</sup></span><span>3 × 10<sup>2</sup></span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>9</span><span>3</span></span> × <span class=\"frac\"><span>10<sup>8</sup></span><span>10<sup>2</sup></span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 3 × 10<sup>6</sup></span></div>",
      "sci": [
        0,
        1
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Calcule, puis donne le résultat en écriture scientifique.<br>Méthode\u00a0: je regroupe les nombres d’un côté et les puissances de 10 de l’autre.</p><p class=\"mq\"><span class=\"m nw\">2 × 10<sup>−3</sup> × 5 × 10<sup>6</sup></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {0} × 10<sup class=\"bxs\">{±1}</sup>",
      "ans": [
        1,
        4
      ],
      "traps": [
        {
          "v": [
            1,
            3
          ],
          "fr": "Dix est aussi une puissance de 10\u00a0: <span class=\"m nw\">10 × 10<sup>3</sup> = 10<sup>4</sup></span>, car <span class=\"m nw\">10 = 10<sup>1</sup></span>."
        },
        {
          "v": [
            1,
            -18
          ],
          "fr": "Pour un produit, on additionne les exposants\u00a0: <span class=\"m nw\">−3 + 6 = 3</span>."
        }
      ],
      "hint": "Regroupe\u00a0: <span class=\"m nw\">2 × 5</span> d’un côté, <span class=\"m nw\">10<sup>−3</sup> × 10<sup>6</sup></span> de l’autre.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">2 × 10<sup>−3</sup> × 5 × 10<sup>6</sup></span><span class=\"cl\"></span><span class=\"ce m\">= (2 × 5) × (10<sup>−3</sup> × 10<sup>6</sup>)</span><span class=\"cl\"></span><span class=\"ce m\">= 10 × 10<sup>3</sup></span><span class=\"cl\"></span><span class=\"ce m\">= 10<sup>4</sup></span><span class=\"cl\"></span><span class=\"ce m res\">= 1 × 10<sup>4</sup></span></div><p>Piège\u00a0: <span class=\"m nw\">10 × 10<sup>3</sup></span> n’est pas une écriture scientifique, car 10 n’est pas strictement inférieur à 10.</p>",
      "sci": [
        0,
        1
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e14",
  "group": "puis",
  "num": "14",
  "src": "fiche de révision",
  "title": "Vrai ou faux\u00a0? (puissances)",
  "stars": 2,
  "tag": "VRAI / FAUX",
  "text": "<p>Réponds vrai ou faux, puis justifie en une ligne <b>sur ton cahier</b>.</p>",
  "parts": [
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\">2<sup>3</sup> = 6</span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 1,
      "fb": [
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2<sup>3</sup></span><span class=\"cd m\">= 2 × 2 × 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 8</span></div>",
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2<sup>3</sup></span><span class=\"cd m\">= 2 × 2 × 2</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 8</span></div>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\">−2<sup>4</sup> = 16</span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 1,
      "fb": [
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">−2<sup>4</sup></span><span class=\"cd m\">= −(2 × 2 × 2 × 2)</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= −16</span></div>",
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">−2<sup>4</sup></span><span class=\"cd m\">= −(2 × 2 × 2 × 2)</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= −16</span></div>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\">(−2)<sup>4</sup> = 16</span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 0,
      "fb": [
        "<p><b>Vrai.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">(−2)<sup>4</sup></span><span class=\"cl\"></span><span class=\"ce m\">= (−2) × (−2) × (−2) × (−2)</span><span class=\"cl\"></span><span class=\"ce m res\">= 16</span></div><p>Quatre facteurs négatifs donnent un résultat positif.</p>",
        "<p><b>Vrai.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"ce m\">(−2)<sup>4</sup></span><span class=\"cl\"></span><span class=\"ce m\">= (−2) × (−2) × (−2) × (−2)</span><span class=\"cl\"></span><span class=\"ce m res\">= 16</span></div><p>Quatre facteurs négatifs donnent un résultat positif.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p><span class=\"m nw\">10<sup>−2</sup></span> est un nombre négatif.</p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 1,
      "fb": [
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>−2</sup></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>100</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 0,01</span></div><p>Ce nombre est positif.</p>",
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>−2</sup></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>100</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 0,01</span></div><p>Ce nombre est positif.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\">3<sup>2</sup> × 3<sup>4</sup> = 9<sup>6</sup></span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 1,
      "fb": [
        "<p><b>Faux.</b></p><p>On garde la base et on additionne les exposants.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">3<sup>2</sup> × 3<sup>4</sup></span><span class=\"cd m\">= 3<sup>2 + 4</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 3<sup>6</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 729</span></div><p>Alors que <span class=\"m nw\">9<sup>6</sup> = 531\u00a0441</span>.</p>",
        "<p><b>Faux.</b></p><p>On garde la base et on additionne les exposants.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">3<sup>2</sup> × 3<sup>4</sup></span><span class=\"cd m\">= 3<sup>2 + 4</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 3<sup>6</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 729</span></div><p>Alors que <span class=\"m nw\">9<sup>6</sup> = 531\u00a0441</span>.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\">2<sup>5</sup> × 2<sup>−5</sup> = 1</span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 0,
      "fb": [
        "<p><b>Vrai.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2<sup>5</sup> × 2<sup>−5</sup></span><span class=\"cd m\">= 2<sup>5 + (−5)</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 2<sup>0</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 1</span></div>",
        "<p><b>Vrai.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">2<sup>5</sup> × 2<sup>−5</sup></span><span class=\"cd m\">= 2<sup>5 + (−5)</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 2<sup>0</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 1</span></div>"
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1e15",
  "group": "puis",
  "num": "15",
  "src": "fiche de révision",
  "title": "Problème\u00a0: quelle opération\u00a0?",
  "stars": 3,
  "text": "<p>Une bactérie mesure environ <span class=\"m nw\">2 × 10<sup>−6</sup></span> m de long.<br>On aligne des bactéries les unes derrière les autres sur une longueur de 1 mm.</p>",
  "parts": [
    {
      "kind": "fill",
      "q": "<p>Écris 1 mm en mètres, avec une puissance de 10.</p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "1 mm = 10<sup class=\"bxs\">{±0}</sup> m",
      "ans": [
        -3
      ],
      "traps": [
        {
          "v": [
            3
          ],
          "fr": "Un millimètre est plus petit qu’un mètre\u00a0: l’exposant est négatif."
        },
        {
          "v": [
            -2
          ],
          "fr": "Un centième de mètre, c’est un centimètre\u00a0: <span class=\"m nw\">10<sup>−2</sup></span> m = 1 cm."
        },
        {
          "v": [
            -6
          ],
          "fr": "Un millionième de mètre, c’est un micromètre, mille fois plus petit qu’un millimètre."
        }
      ],
      "hint": "Dans un mètre, il y a 1 000 millimètres.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">1 mm</span><span class=\"cd m\">= 0,001 m</span><span class=\"cl\"></span><span class=\"cg m\">1 mm</span><span class=\"cd m\">= 10<sup>−3</sup> m</span></div>"
    },
    {
      "kind": "choice",
      "q": "<p>Quelle opération permet de trouver le nombre de bactéries\u00a0?</p>",
      "choices": [
        "Une multiplication : <span class=\"m nw\">10<sup>−3</sup> × 2 × 10<sup>−6</sup></span>",
        "Une division : <span class=\"m nw\"><span class=\"frac\"><span>10<sup>−3</sup></span><span>2 × 10<sup>−6</sup></span></span></span>",
        "Une soustraction : <span class=\"m nw\">10<sup>−3</sup> − 2 × 10<sup>−6</sup></span>",
        "Une division : <span class=\"m nw\"><span class=\"frac\"><span>2 × 10<sup>−6</sup></span><span>10<sup>−3</sup></span></span></span>"
      ],
      "correct": 1,
      "fb": [
        "<p>En multipliant deux longueurs, on n’obtient pas un nombre de bactéries.<br>On cherche combien de fois une longueur est contenue dans une autre.</p>",
        "<p><b>Oui.</b> On cherche combien de fois la longueur d’une bactérie est contenue dans 1 mm\u00a0: c’est une division (longueur totale divisée par la longueur d’une bactérie).</p>",
        "<p>Une soustraction donne une longueur qui reste, pas un nombre de bactéries.<br>On cherche combien de fois une longueur est contenue dans une autre.</p>",
        "<p>C’est bien une division, mais dans l’autre sens\u00a0: on divise la longueur totale par la longueur d’une bactérie.</p>"
      ]
    },
    {
      "kind": "num",
      "q": "<p>Calcule ce nombre de bactéries.</p>",
      "label": "Nombre de bactéries",
      "unit": "",
      "ans": 500,
      "tol": 0,
      "sign": "strict",
      "pm": true,
      "signMsg": "Presque : le nombre est bon, mais vérifie le signe.",
      "traps": [
        {
          "v": 0.002,
          "fr": "Tu as divisé dans l’autre sens\u00a0: on divise la longueur totale par la longueur d’une bactérie."
        },
        {
          "v": 2000,
          "fr": "On divise par 2, on ne multiplie pas\u00a0: <span class=\"m nw\"><span class=\"frac\"><span>1</span><span>2</span></span> = 0,5</span>, et <span class=\"m nw\">0,5 × 10<sup>3</sup> = 500</span>."
        },
        {
          "v": 5e-10,
          "fr": "Pour un quotient, on soustrait les exposants\u00a0: <span class=\"m nw\">−3 − (−6) = 3</span>."
        }
      ],
      "hint": "Sépare les nombres et les puissances de 10\u00a0: <span class=\"m nw\"><span class=\"frac\"><span>1</span><span>2</span></span> × <span class=\"frac\"><span>10<sup>−3</sup></span><span>10<sup>−6</sup></span></span></span>.",
      "sol": "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>10<sup>−3</sup></span><span>2 × 10<sup>−6</sup></span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>2</span></span> × <span class=\"frac\"><span>10<sup>−3</sup></span><span>10<sup>−6</sup></span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 0,5 × 10<sup>−3 − (−6)</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 0,5 × 10<sup>3</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 500</span></div><p>On peut aligner <b>500 bactéries</b> sur 1 mm.</p>"
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1b1",
  "group": "brevet",
  "num": "B1",
  "src": "fiche de révision",
  "title": "Première partie\u00a0: automatismes",
  "stars": 2,
  "tag": "6 POINTS",
  "text": "<p><b>Conditions du contrôle blanc.</b><br>35 minutes en tout, sans calculatrice, sur une copie, comme le jour du DS.</p><p><b>Première partie\u00a0: 10 minutes au maximum, 6 points.</b><br>Pour chaque question, une seule réponse est exacte.<br>Aucune justification n’est demandée.<br>1 point par bonne réponse.</p>",
  "parts": [
    {
      "kind": "choice",
      "q": "<p class=\"mq\"><span class=\"m nw\">5 − 3 × 2 + 1</span></p>",
      "choices": [
        "<span class=\"m nw\">5</span>",
        "<span class=\"m nw\">0</span>",
        "<span class=\"m nw\">−4</span>"
      ],
      "correct": 1,
      "fb": [
        "<p>C’est <span class=\"m nw\">(5 − 3) × 2 + 1</span>\u00a0: la priorité de la multiplication a été oubliée.</p>",
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">5 − <span class=\"prem\">3 × 2</span> + 1</span><span class=\"cd m\">= 5 − 6 + 1</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 0</span></div>",
        "<p>C’est <span class=\"m nw\">5 − 3 × (2 + 1)</span>\u00a0: il n’y a pas de parenthèses autour de <span class=\"m nw\">2 + 1</span>.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1</span><span>6</span></span> × 2</span></p>",
      "choices": [
        "<span class=\"m nw\"><span class=\"frac\"><span>1</span><span>3</span></span></span>",
        "<span class=\"m nw\">1</span>",
        "<span class=\"m nw\"><span class=\"frac\"><span>1</span><span>2</span></span></span>"
      ],
      "correct": 0,
      "fb": [
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"prem\"><span class=\"frac\"><span>1</span><span>6</span></span> × 2</span></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>2</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1</span><span>3</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>1</span><span>3</span></span></span></div>",
        "<p>La soustraction a été faite en premier.<br>La multiplication passe avant.</p>",
        "<p>Le <span class=\"m nw\">× 2</span> a été oublié.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>L’écriture scientifique de <span class=\"m nw\">0,000\u00a056</span> est\u00a0:</p>",
      "choices": [
        "<span class=\"m nw\">56 × 10<sup>−5</sup></span>",
        "<span class=\"m nw\">5,6 × 10<sup>−4</sup></span>",
        "<span class=\"m nw\">5,6 × 10<sup>4</sup></span>"
      ],
      "correct": 1,
      "fb": [
        "<p>Ce nombre est bien égal, mais ce n’est pas une écriture scientifique\u00a0: il faut un seul chiffre non nul avant la virgule.</p>",
        "<p>Un seul chiffre non nul avant la virgule, et la virgule s’est décalée de 4 rangs vers la droite.</p>",
        "<p><span class=\"m nw\">5,6 × 10<sup>4</sup> = 56\u00a0000</span>\u00a0: c’est un grand nombre.<br>Ici le nombre est plus petit que 1, donc l’exposant est négatif.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>10<sup>5</sup> × 10<sup>−2</sup></span><span>10<sup>6</sup></span></span></span></p>",
      "choices": [
        "<span class=\"m nw\">10<sup>−3</sup></span>",
        "<span class=\"m nw\">10<sup>9</sup></span>",
        "<span class=\"m nw\">10<sup>−16</sup></span>"
      ],
      "correct": 0,
      "fb": [
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>10<sup>5</sup> × 10<sup>−2</sup></span><span>10<sup>6</sup></span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>10<sup>5 + (−2)</sup></span><span>10<sup>6</sup></span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>10<sup>3</sup></span><span>10<sup>6</sup></span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 10<sup>3 − 6</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 10<sup>−3</sup></span></div>",
        "<p>Une addition à la place de la soustraction\u00a0: pour un quotient, on soustrait les exposants.</p>",
        "<p>Une multiplication des exposants à la place de l’addition\u00a0: pour un produit, on additionne les exposants.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p class=\"mq\"><span class=\"m nw\">(−3)<sup>2</sup> − 3<sup>2</sup></span></p>",
      "choices": [
        "<span class=\"m nw\">0</span>",
        "<span class=\"m nw\">18</span>",
        "<span class=\"m nw\">−18</span>"
      ],
      "correct": 0,
      "fb": [
        "<div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">(−3)<sup>2</sup> − 3<sup>2</sup></span><span class=\"cd m\">= 9 − 9</span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 0</span></div>",
        "<p>Erreur de signe sur l’un des carrés\u00a0: <span class=\"m nw\">(−3)<sup>2</sup> = 9</span> et <span class=\"m nw\">3<sup>2</sup> = 9</span>.</p>",
        "<p>Erreur de signe sur l’un des carrés\u00a0: <span class=\"m nw\">(−3)<sup>2</sup> = 9</span> et <span class=\"m nw\">3<sup>2</sup> = 9</span>.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Les <span class=\"m nw\"><span class=\"frac\"><span>2</span><span>5</span></span></span> de 30 font\u00a0:</p>",
      "choices": [
        "<span class=\"m nw\">12</span>",
        "<span class=\"m nw\">75</span>",
        "<span class=\"m nw\">6</span>"
      ],
      "correct": 0,
      "fb": [
        "<p>«\u00a0Les <span class=\"m nw\"><span class=\"frac\"><span>2</span><span>5</span></span></span> de\u00a0» veut dire «\u00a0<span class=\"m nw\"><span class=\"frac\"><span>2</span><span>5</span></span> ×</span>\u00a0».</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>5</span></span> × 30</span><span class=\"cd m\">= <span class=\"frac\"><span>60</span><span>5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 12</span></div>",
        "<p>C’est <span class=\"m nw\">30 ÷ 2 × 5</span>\u00a0: la fraction a été retournée.</p>",
        "<p>C’est <span class=\"m nw\">30 ÷ 5</span>\u00a0: la multiplication par 2 a été oubliée.</p>"
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1b2",
  "group": "brevet",
  "num": "B2",
  "src": "fiche de révision",
  "title": "Deuxième partie\u00a0: vrai ou faux",
  "stars": 2,
  "tag": "4,5 POINTS",
  "text": "<p><b>Deuxième partie\u00a0: 25 minutes, 14 points.</b><br>Toutes les étapes doivent être écrites sur ta copie.</p><p>Pour chaque affirmation, dis si elle est vraie ou fausse, puis justifie par un calcul détaillé.<br>Barème\u00a0: 1,5 point par affirmation (0,5 pour la réponse, 1 pour le calcul).</p>",
  "parts": [
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>3</span><span>4</span></span> + <span class=\"frac\"><span>1</span><span>4</span></span> × 2 = 2</span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 1,
      "fb": [
        "<p><b>Faux.</b></p><p>En premier la multiplication.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>3</span><span>4</span></span> + <span class=\"prem\"><span class=\"frac\"><span>1</span><span>4</span></span> × 2</span></span><span class=\"cd m\">= <span class=\"frac\"><span>3</span><span>4</span></span> + <span class=\"frac\"><span>2</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>5</span><span>4</span></span></span></div><p>Et <span class=\"m nw\"><span class=\"frac\"><span>5</span><span>4</span></span> ≠ 2</span>.<br>On trouve 2 seulement en faisant l’addition en premier.</p>",
        "<p><b>Faux.</b></p><p>En premier la multiplication.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>3</span><span>4</span></span> + <span class=\"prem\"><span class=\"frac\"><span>1</span><span>4</span></span> × 2</span></span><span class=\"cd m\">= <span class=\"frac\"><span>3</span><span>4</span></span> + <span class=\"frac\"><span>2</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>5</span><span>4</span></span></span></div><p>Et <span class=\"m nw\"><span class=\"frac\"><span>5</span><span>4</span></span> ≠ 2</span>.<br>On trouve 2 seulement en faisant l’addition en premier.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\">10<sup>4</sup> + 10<sup>4</sup> = 10<sup>8</sup></span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 1,
      "fb": [
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>4</sup> + 10<sup>4</sup></span><span class=\"cd m\">= 2 × 10<sup>4</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 20\u00a0000</span></div><p>Alors que <span class=\"m nw\">10<sup>8</sup> = 100\u00a0000\u00a0000</span>.<br>Il n’y a pas de règle pour additionner des puissances.</p>",
        "<p><b>Faux.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">10<sup>4</sup> + 10<sup>4</sup></span><span class=\"cd m\">= 2 × 10<sup>4</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 20\u00a0000</span></div><p>Alors que <span class=\"m nw\">10<sup>8</sup> = 100\u00a0000\u00a0000</span>.<br>Il n’y a pas de règle pour additionner des puissances.</p>"
      ]
    },
    {
      "kind": "choice",
      "q": "<p>Vrai ou faux\u00a0?</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>2</span><span>5</span></span> ÷ <span class=\"frac\"><span>4</span><span>15</span></span> = <span class=\"frac\"><span>3</span><span>2</span></span></span></p>",
      "choices": [
        "Vrai",
        "Faux"
      ],
      "correct": 0,
      "fb": [
        "<p><b>Vrai.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>5</span></span> ÷ <span class=\"frac\"><span>4</span><span>15</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>5</span></span> × <span class=\"frac\"><span>15</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 15</span><span>5 × 4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 3 × 5</span><span>5 × 2 × 2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>3</span><span>2</span></span></span></div>",
        "<p><b>Vrai.</b></p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>2</span><span>5</span></span> ÷ <span class=\"frac\"><span>4</span><span>15</span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>5</span></span> × <span class=\"frac\"><span>15</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 15</span><span>5 × 4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 3 × 5</span><span>5 × 2 × 2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= <span class=\"frac\"><span>3</span><span>2</span></span></span></div>"
      ]
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1b3",
  "group": "brevet",
  "num": "B3",
  "src": "fiche de révision",
  "title": "Deuxième partie\u00a0: montrer que",
  "stars": 3,
  "tag": "4,5 POINTS",
  "text": "<p>Rappel\u00a0: dans «\u00a0montrer que\u00a0», le résultat est donné.<br>Ce sont les étapes qui rapportent les points.</p>",
  "parts": [
    {
      "kind": "self",
      "sol": "<p>Barème\u00a0: 2 points.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= <span class=\"bp\">(</span><span class=\"frac\"><span>7</span><span>4</span></span> − <span class=\"frac\"><span>1 × 2</span><span>2 × 2</span></span><span class=\"bp\">)</span> ÷ <span class=\"bp\">(</span><span class=\"frac\"><span>1 × 2</span><span>2 × 2</span></span> + <span class=\"frac\"><span>3</span><span>4</span></span><span class=\"bp\">)</span></span><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= <span class=\"bp\">(</span><span class=\"frac\"><span>7</span><span>4</span></span> − <span class=\"frac\"><span>2</span><span>4</span></span><span class=\"bp\">)</span> ÷ <span class=\"bp\">(</span><span class=\"frac\"><span>2</span><span>4</span></span> + <span class=\"frac\"><span>3</span><span>4</span></span><span class=\"bp\">)</span></span><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= <span class=\"frac\"><span>5</span><span>4</span></span> ÷ <span class=\"frac\"><span>5</span><span>4</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= <span class=\"frac\"><span>5</span><span>4</span></span> × <span class=\"frac\"><span>4</span><span>5</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= <span class=\"frac\"><span>20</span><span>20</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>A</i></span><span class=\"cd m\">= 1</span></div>",
      "q": "<p>Montre que <span class=\"m nw\"><i>A</i> = 1</span>.</p><p class=\"mq\"><span class=\"m nw\"><i>A</i> = <span class=\"bp\">(</span><span class=\"frac\"><span>7</span><span>4</span></span> − <span class=\"frac\"><span>1</span><span>2</span></span><span class=\"bp\">)</span> ÷ <span class=\"bp\">(</span><span class=\"frac\"><span>1</span><span>2</span></span> + <span class=\"frac\"><span>3</span><span>4</span></span><span class=\"bp\">)</span></span></p>",
      "hint": "Les deux parenthèses d’abord, avec le dénominateur 4.<br>Ensuite, la division\u00a0: je multiplie par l’inverse."
    },
    {
      "kind": "self",
      "sol": "<p>Barème\u00a0: 2,5 points.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><i>B</i></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1</span><span>3</span></span> × <span class=\"bp\">(</span><span class=\"frac\"><span>5</span><span>2</span></span> − <span class=\"frac\"><span>2</span><span>2</span></span><span class=\"bp\">)</span></span><span class=\"cl\"></span><span class=\"cg m\"><i>B</i></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1</span><span>3</span></span> × <span class=\"frac\"><span>3</span><span>2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>B</i></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1 × 3</span><span>3 × 2</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>B</i></span><span class=\"cd m\">= <span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>3</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>B</i></span><span class=\"cd m\">= <span class=\"frac\"><span>2 × 2</span><span>3 × 2</span></span> − <span class=\"frac\"><span>3</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>B</i></span><span class=\"cd m\">= <span class=\"frac\"><span>4</span><span>6</span></span> − <span class=\"frac\"><span>3</span><span>6</span></span></span><span class=\"cl\"></span><span class=\"cg m\"><i>B</i></span><span class=\"cd m\">= <span class=\"frac\"><span>1</span><span>6</span></span></span></div>",
      "q": "<p>Montre que <span class=\"m nw\"><i>B</i> = <span class=\"frac\"><span>1</span><span>6</span></span></span>.</p><p class=\"mq\"><span class=\"m nw\"><i>B</i> = <span class=\"frac\"><span>2</span><span>3</span></span> − <span class=\"frac\"><span>1</span><span>3</span></span> × <span class=\"bp\">(</span><span class=\"frac\"><span>5</span><span>2</span></span> − 1<span class=\"bp\">)</span></span></p>",
      "hint": "La parenthèse d’abord (<span class=\"m nw\">1 = <span class=\"frac\"><span>2</span><span>2</span></span></span>), puis la multiplication, puis la soustraction."
    }
  ]
});
EXOS.push({
  "ch": "t1",
  "id": "t1b4",
  "group": "brevet",
  "num": "B4",
  "src": "fiche de révision",
  "title": "Deuxième partie\u00a0: la lumière du Soleil",
  "stars": 3,
  "tag": "3 POINTS",
  "text": "<p>La lumière parcourt environ <span class=\"m nw\">3 × 10<sup>5</sup></span> km en une seconde.<br>Le Soleil est à environ <span class=\"m nw\">1,5 × 10<sup>8</sup></span> km de la Terre.</p>",
  "parts": [
    {
      "kind": "choice",
      "q": "<p>Quelle opération permet de calculer le temps mis par la lumière du Soleil pour arriver sur Terre\u00a0?</p>",
      "choices": [
        "Une multiplication : <span class=\"m nw\">1,5 × 10<sup>8</sup> × 3 × 10<sup>5</sup></span>",
        "Une division : <span class=\"m nw\"><span class=\"frac\"><span>1,5 × 10<sup>8</sup></span><span>3 × 10<sup>5</sup></span></span></span>",
        "Une division : <span class=\"m nw\"><span class=\"frac\"><span>3 × 10<sup>5</sup></span><span>1,5 × 10<sup>8</sup></span></span></span>"
      ],
      "correct": 1,
      "fb": [
        "<p>En multipliant deux distances, on n’obtient pas un temps.<br>On cherche combien de secondes il faut.</p>",
        "<p><b>Oui (1 point).</b> On connaît la distance parcourue en une seconde.<br>Pour savoir combien de secondes il faut, on divise la distance entre la Terre et le Soleil par la distance parcourue en une seconde\u00a0: c’est une division.</p>",
        "<p>C’est bien une division, mais dans l’autre sens\u00a0: on divise la distance totale par la distance parcourue en une seconde.</p>"
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Calcule ce temps en secondes.<br>Donne le résultat en écriture scientifique.</p><p class=\"mq\"><span class=\"m nw\"><span class=\"frac\"><span>1,5 × 10<sup>8</sup></span><span>3 × 10<sup>5</sup></span></span></span></p>",
      "label": "Complète les cases.<br>Touche + ou − pour changer un signe.",
      "tpl": "= {0} × 10<sup class=\"bxs\">{±1}</sup>",
      "ans": [
        5,
        2
      ],
      "traps": [
        {
          "v": [
            5,
            13
          ],
          "fr": "Pour un quotient, on soustrait les exposants\u00a0: celui du haut moins celui du bas."
        },
        {
          "v": [
            2,
            -3
          ],
          "fr": "Tu as divisé dans l’autre sens\u00a0: on divise la distance totale par la distance parcourue en une seconde."
        }
      ],
      "hint": "Sépare les nombres et les puissances de 10\u00a0: <span class=\"m nw\"><span class=\"frac\"><span>1,5</span><span>3</span></span> × <span class=\"frac\"><span>10<sup>8</sup></span><span>10<sup>5</sup></span></span></span>.",
      "sol": "<p>Barème\u00a0: 1,5 point.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\"><span class=\"frac\"><span>1,5 × 10<sup>8</sup></span><span>3 × 10<sup>5</sup></span></span></span><span class=\"cd m\">= <span class=\"frac\"><span>1,5</span><span>3</span></span> × <span class=\"frac\"><span>10<sup>8</sup></span><span>10<sup>5</sup></span></span></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m\">= 0,5 × 10<sup>3</sup></span><span class=\"cl\"></span><span class=\"cg m\"></span><span class=\"cd m res\">= 5 × 10<sup>2</sup></span></div><p>La lumière met <span class=\"m nw\">5 × 10<sup>2</sup></span> s, soit <b>500 s</b>.</p>",
      "sci": [
        0,
        1
      ]
    },
    {
      "kind": "fill",
      "q": "<p>Convertis ce temps en minutes et secondes.</p>",
      "label": "Complète les cases.",
      "tpl": "500 s = {0} min {1} s",
      "ans": [
        8,
        20
      ],
      "traps": [
        {
          "v": [
            8,
            33
          ],
          "fr": "Attention\u00a0: 8,33 minutes ne font pas 8 minutes 33 secondes.<br>Cherche combien de fois 60 secondes sont contenues dans 500 secondes."
        },
        {
          "v": [
            5,
            0
          ],
          "fr": "Il y a 60 secondes dans une minute, pas 100."
        }
      ],
      "hint": "Combien de fois 60 dans 500\u00a0?<br>Et combien reste-t-il\u00a0?",
      "sol": "<p>Barème\u00a0: 0,5 point.</p><div class=\"calc\"><span class=\"cl\"></span><span class=\"cg m\">500</span><span class=\"cd m res\">= 8 × 60 + 20</span></div><p>La lumière met <b>8 min 20 s</b>.</p><p><b>Rédaction (2 points)</b>\u00a0: 1 point si toutes les étapes sont visibles, 1 point pour les phrases réponses et le vocabulaire juste (somme, produit, numérateur, dénominateur).</p><p><b>Total</b>\u00a0: 6 points (première partie) + 14 points (deuxième partie) = 20 points.</p>"
    }
  ]
});
