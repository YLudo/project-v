
# 🌍 Projet V - Votre compagnon de voyage intelligent

> Une application moderne pour planifier, organiser et partager vos voyages en groupe. Gérez vos dépenses, créez des itinéraires et gardez tous vos documents de voyage en un seul endroit.

## 📚 Structure du Projet
```
projet-v/ 
├── app/                # Routes et pages Next.js 
├── components/ 
│   ├── app/            # Composants spécifiques à l'application 
│   ├── layout/         # Composants de mise en page 
│   └── ui/             # Composants UI réutilisables 
├── hooks/              # Custom React hooks 
├── lib/                # Utilitaires et configurations 
├── types/              # Types TypeScript 
└── public/             # Assets statiques
```

## ✨ Fonctionnalités Principales

### 🤝 Planification de Voyage en Groupe

-   Création collaborative d'itinéraires
-   Système de rôles (organisateur, participants, invités)
-   Partage en temps réel des modifications

### 💰 Gestion du Budget via Plaid

-   Synchronisation bancaire en temps réel
-   Catégorisation automatique des dépenses
-   Suivi et alertes budgétaires
-   Répartition des coûts entre participants

### 🗺️ Cartographie Interactive avec MapBox

-   Visualisation des itinéraires
-   Points d'intérêt et informations détaillées
-   Navigation en temps réel
-   Partage de lieux favoris

### 📄 Gestion Documentaire

-   Stockage sécurisé des documents de voyage
-   Accès hors-ligne
-   Organisation intelligente

## 🛠️ Technologies Utilisées

-   **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
-   **Backend**: Appwrite (Authentication, Database, Storage)
-   **API Externes**:
    -   Plaid pour l'intégration bancaire
    -   MapBox pour la cartographie
-   **Déploiement**: Vercel

## 🚀 Installation

1.  **Cloner le repository**

`git clone https://github.com/votre-username/projet-v.git cd projet-v`

2.  **Installer les dépendances**

`npm  install # ou pnpm  install`

3.  **Configuration des variables d'environnement**

`cp .env.example .env.local`

4.  **Remplir les variables d'environnement requises**

```
# NEXT 
NEXT_PUBLIC_SITE_URL=http://localhost:3000   
# APPWRITE 
NEXT_PUBLIC_APPWRITE_ENDPOINT= 
NEXT_PUBLIC_APPWRITE_PROJECT= 
APPWRITE_DATABASE_ID= 
APPWRITE_USER_COLLECTION_ID= 
APPWRITE_TRAVEL_COLLECTION_ID= 
APPWRITE_BANK_COLLECTION_ID= 
NEXT_APPWRITE_KEY=   
# PLAID 
PLAID_CLIENT_ID= 
PLAID_SECRET= 
PLAID_ENV=sandbox 
PLAID_PRODUCTS=auth,transactions,identity 
PLAID_COUNTRY_CODES=FR
```

5.  **Lancer le serveur de développement**

```
npm run dev # ou 
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## 📝 Configuration Requise

-   Node.js 18.0 ou supérieur
-   Compte Appwrite
-   Compte Plaid (pour l'intégration bancaire)
-   Compte MapBox (pour la cartographie)

## 🔧 Scripts Disponibles

```
npm run dev # Lance le serveur de développement 
npm run build # Build l'application pour la production 
npm run start # Lance l'application en mode production 
npm run lint # Vérifie le code avec ESLint
```
## 📞 Support

Pour toute question ou assistance :

-   📧 Email: [ludovic.roux31@ynov.com](mailto:ludovic.roux31@ynov.com)
----------

Développé avec ❤️ par Loud
