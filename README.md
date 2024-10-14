Voici le contenu complet du fichier `README.md` que vous pouvez copier-coller directement :

# Fact-Check Site

Un site de fact-checking des fake news utilisant l'API Fact Check de Google. Ce projet permet aux utilisateurs de rechercher des affirmations et de vérifier leur véracité, ainsi qu'une section dédiée aux fake news démenties.

## Table des Matières

- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Fonctionnalités](#fonctionnalités)
- [Contribuer](#contribuer)
- [License](#license)

## Technologies Utilisées

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js, Axios
- **API**: Google Fact Check API

## Installation

### Prérequis

Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/get-npm).

### Cloner le Dépôt

```bash
git clone https://github.com/votre_nom_utilisateur/fact-check-site.git
```

### Installer les Dépendances

Accédez au répertoire du projet :

```bash
cd fact-check-site/Front/fact-check-client
```

Installez les dépendances du frontend :

```bash
npm install
```

Ensuite, accédez au répertoire du backend :

```bash
cd ../Back/fact-check-server
```

Installez les dépendances du backend :

```bash
npm install
```

## Utilisation

### Lancer le Backend

Assurez-vous que votre clé API Google Fact Check est configurée dans le fichier `server.js`. Ensuite, lancez le serveur :

```bash
node server.js
```

### Lancer le Frontend

Dans un autre terminal, accédez au répertoire du frontend et lancez le serveur :

```bash
cd fact-check-site/Front/fact-check-client
npm start
```

### Accéder à l'Application

Ouvrez votre navigateur et accédez à [http://localhost:3000](http://localhost:3000) pour utiliser l'application.

## Fonctionnalités

- **Recherche d'affirmations** : Saisissez une affirmation et vérifiez sa véracité.
- **Fake news démenties** : Parcourez une liste de fake news qui ont été démenties.

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le dépôt.
2. Créez une nouvelle branche pour votre fonctionnalité (`git checkout -b feature/YourFeature`).
3. Commitez vos modifications (`git commit -m 'Add some feature'`).
4. Poussez sur la branche (`git push origin feature/YourFeature`).
5. Ouvrez une Pull Request.

## License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.

### Instructions pour l'Utilisation

1. **Copiez le contenu ci-dessus**.
2. **Créez un fichier** nommé `README.md` à la racine de votre projet si ce n'est pas déjà fait.
3. **Collez le contenu** dans le fichier `README.md`.
4. **Personnalisez les informations** : Remplacez `votre_nom_utilisateur` par votre nom d'utilisateur GitHub.

Si vous avez besoin de modifications ou d'ajouts spécifiques, n'hésitez pas à me le faire savoir !
