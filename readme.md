# Défi : Système de vote

## Spécifications

Votre Dapp doit permettre : 

* l’enregistrement d’une liste blanche d'électeurs. 
* à l'administrateur de commencer la session d'enregistrement de la proposition.
* aux électeurs inscrits d’enregistrer leurs propositions.
* à l'administrateur de mettre fin à la session d'enregistrement des propositions.
* à l'administrateur de commencer la session de vote.
* aux électeurs inscrits de voter pour leurs propositions préférées.
* à l'administrateur de mettre fin à la session de vote.
* à l'administrateur de comptabiliser les votes.
* à tout le monde de consulter le résultat.

Les recommandations et exigences :

* Votre code doit être optimal. 
* Votre Dapp doit être sécurisée. 
* Vous devez utiliser la box react de Truffle. 

À rendre :

* Vidéo démo des fonctionnalités de votre Front (hébergement youtube, Google Drive ou autre).
* Lien vers votre répertoire Github.

## Analyse fonctionnelle

De manière générale l'app sera présente sous forme d'onglets : chaque onglet permettra d'accéder
aux fonctionalités principales décrites ci-après.
En fonction du statut en cours (rien n'est démarré, enregistrement des votants, enregistrement des propositions...)

Concept d'administrateur (le seul à pouvoir faire certaines actions comme les dmérrages/fins de sessions) : c'est le propriétaire du contrat.

### l’enregistrement d’une liste blanche d'électeurs. 
Nous reprendrons la trame du TP "DApp Système d'une liste blanche".
Quelques point supplémentaires (non décrit dans l'énoncé initial) à prévoir :
* il faudra avoir ajouté un minimum d'électeurs, ce nombre est fixé à trois.
* si ce nombre n'est pas dépassé, l'ouverture des propositions n'est pas possible

### à l'administrateur de commencer la session d'enregistrement de la proposition.
Un onglet "Propositions" permettra à l'administrateur de démarrer et stopper la session d'enregistrement des propositions
(options accessibles par l'administrateur seulement)

### aux électeurs inscrits d’enregistrer leurs propositions.
Le même onglet "propositions" proposera une autre vue pour les utilisateurs non administrateur :
sur le même principe que la saisie de la liste blanche, les utilisateurs pourront ici saisir une nouvelle proposition ou voir leur proposition enregistrée. A voir = possibilité de lister toutes les propositions déjà effectuées.

### à l'administrateur de mettre fin à la session d'enregistrement des propositions.
Voir section précédente de l'admin.

### à l'administrateur de commencer la session de vote.
Un onglet "Votes" permettra à l'administrateur de démarrer et stopper la session de votes
(options accessibles par l'administrateur seulement)

### aux électeurs inscrits de voter pour leurs propositions préférées.
Le même onglet "votes" proposera une autre vue pour les utilisateurs non administrateur :
les utilisateurs pourront ici voter pour une des propositions.

### à l'administrateur de mettre fin à la session de vote.
Voir section précédente de l'admin.

### à l'administrateur de comptabiliser les votes.
Un onglet "Résultats" permettra à l'administrateur dde comptabiliser les votes.

### à tout le monde de consulter le résultat.
Le même onglet "Résultats" permettra aux utilisateurs de voir le résultat des votes.

## TODO liste, problèmes rencontrés

* problème déploiement ganache, impossible de déployer mais pas de messages d'erreur, seulement le message "Pausing for 2 confirmations..." et ça ne rend jamais la main donc l'opération n'aboutit/fonctionne pas -> je m'en suis sorti en créant un network à part entière, sans passer par un HDWalletProvider, pb lié à localhost ? (j'avais bien mis cette adresse dans var infuraUrl, pas eu le temps de renommer de façon plus générique)

* Propositions sauvegardées = accentués non sauvés ou réaffichés ?

* Problème de temps de réponse asynchrone = comment savoir si une transaction est en cours ? Exemple = le workflow status est passé de RegisteringVoters à ProposalsRegistrationStarted mais la transaction n'est pas encore validée, quel sera le statut en cours ? Si toujours en RegisteringVoters cela permettra de retenter un start ? Pas normal. Je ne vois pas trop de solutions si pas de serveur centralisé avec minimum de données (temporaires/cache) centralisées aussi. Pas facile à tester en localhost. -> possibilité de récup les tx pending.

* gestion des événements : comment relancer seulement un runInit plutôt qu'un window.location.reload() ? Question vague, voir code...

* mauvaise approche des calls Init dans apps.js ?

* trop de popup en case d'evt. Même pas de question, encore plus vague. On verra si on reproduit...

* pouvoir détecter en amont les comptes qui ne sont pas whitelistés pour leur cacher l'accès au menu (vote...) = j'ai créé une fonction getVoter mais ne renvoie rien, revoir le .sol si on a le temps.

* choix de votes : comment définir la upper bound = propositions.length ? Question liée html/React je pense = comment définir dynamiquement la property max (de toute façon ne semble pas couvrir l'input direct) -> ajouter plutôt bouton sur chaque ligne

* pourquoi certains "nouveaux" accounts (à partir du 4è = Test Ropsten 3) ne sont pas "visibles" par web3js = pas de détection de changement de compte ? Question liée = comment faire l'association ente mon app localhost:3000 et un nouvel account une fois que les autres ont été associés ? -> seul moyen trouvé = aller sur un compte déjà associé, "delete all acounts" et réassocier tous. Mais depuis le nouveau le seul message ="Account x is not connected to any site" et pas d'autres options pour l'associer (cf https://metamask.zendesk.com/hc/en-us/articles/360045901112-How-to-connect-to-a-website-dapp-in-V8-desktop-browser-extension- qui ne semble pas fonctionner)
J'ai trouvé un article sur le mode privacy depuis la v7 (https://medium.com/metamask/privacy-mode-is-now-enabled-by-default-1c1c957f4d57) mais le menu a changé depuis.

* tests dapp : en situation normale plutôt ok, mais dès que problèmes "QA" (re-vote alors que déjà voté, pas assez d'ethers, reject...)

