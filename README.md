# Évaluation Service Hôtelier - Application Web

**Une application web interactive permettant aux clients d'évaluer leur expérience dans un hôtel, en temps réel, via des émojis et des commentaires.**

## Table des matières
1. [Description](#description)
2. [Fonctionnalités](#fonctionnalités)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Déploiement sur GitHub Pages](#déploiement-sur-github-pages)
6. [Configuration Supabase](#configuration-supabase)
7. [Licences](#licences)

## Description
Ce projet permet aux clients d’évaluer leur expérience à l’hôtel en utilisant un système d’émojis. Chaque client peut sélectionner un émoji qui reflète son humeur ou son ressenti à propos de l’hôtel, et ajouter un commentaire. Ces évaluations sont ensuite affichées en temps réel dans une section dédiée sur la page d’accueil de l’application.

L'application repose sur une architecture simple côté client avec HTML, CSS, et JavaScript, ainsi qu'un backend minimal utilisé pour gérer les évaluations des clients.

## Fonctionnalités
- **Évaluation en temps réel** : Les clients peuvent sélectionner des émojis pour évaluer leur expérience.
- **Affichage en temps réel** : Les évaluations sont affichées instantanément aux autres utilisateurs grâce à l'intégration de Supabase.
- **Formulaire d’évaluation** : Un formulaire permet de saisir des informations supplémentaires comme des commentaires et des préférences.

## Technologies
- **Frontend** : HTML, CSS, JavaScript
- **Backend** : Supabase (pour la gestion des données)
- **Déploiement** : GitHub Pages, GitHub Actions pour le déploiement automatisé
- **Stockage de données** : Supabase (base de données PostgreSQL)

## Installation

1. Clone le repository sur ta machine locale :

    ```bash
    git clone https://github.com/ton-utilisateur/ton-repository.git
    ```

2. Accède au dossier du projet :
    ```bash
    cd ton-repository
    ```

3. Installe les dépendances nécessaires pour le frontend (si tu utilises un environnement de développement local) :

    ```bash
    npm install
    ```

4. Ouvre `index.html` dans ton navigateur pour voir l'application en local.

### Dépendances principales :
- **Supabase** pour la gestion des données en temps réel.
- **Socket.io** pour la gestion des événements en temps réel (si utilisé).
- **CSS personnalisé** pour le style de l'application.

## Déploiement sur GitHub Pages

Le déploiement se fait automatiquement grâce à **GitHub Actions**. Chaque push sur la branche `main` déclenche un workflow qui compile et déploie l'application sur **GitHub Pages**.

### Étapes :
1. Accède à ton repository sur **GitHub**.
2. Crée un fichier de workflow **GitHub Actions** dans `.github/workflows/deploy.yml` (ou utilise l'interface GitHub pour créer ce fichier).
3. Chaque fois que tu fais un push sur `main`, le workflow s'exécute et déploie automatiquement ton site sur GitHub Pages.

Voici un exemple de fichier `deploy.yml` pour automatiser le déploiement :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}