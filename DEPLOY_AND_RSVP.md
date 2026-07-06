# Partager l'invitation + voir les réponses RSVP

## 1) Publier le site
Le plus simple : **Vercel** ou **Netlify**.

### Option Vercel
1. Créez un compte sur https://vercel.com
2. Importez ce projet
3. Cliquez sur **Deploy**
4. Vous obtenez un lien du type :
   `https://votre-invitation.vercel.app`

### Option Netlify
1. Créez un compte sur https://netlify.com
2. Importez ce projet
3. Déployez
4. Vous obtenez un lien du type :
   `https://votre-invitation.netlify.app`

---

## 2) Partager l'invitation
Une fois le site en ligne :
- ouvrez le lien sur votre téléphone
- utilisez le bouton **Partager** intégré au site
- ou copiez le lien pour :
  - WhatsApp
  - Instagram Story
  - Snapchat
  - Messenger
  - TikTok bio

---

## 3) Recevoir les réponses RSVP dans un dashboard
Le projet est prêt pour **Formspree**.

### Étapes
1. Créez un compte sur https://formspree.io
2. Créez un nouveau formulaire
3. Copiez votre endpoint, par exemple :
   `https://formspree.io/f/abcdwxyz`
4. Ajoutez une variable d'environnement dans votre hébergeur :

   **Nom**
   `VITE_FORMSPREE_ENDPOINT`

   **Valeur**
   `https://formspree.io/f/abcdwxyz`

5. Redéployez le site

### Résultat
Quand un invité remplit le formulaire RSVP :
- la réponse part dans **Formspree**
- vous la voyez dans votre **dashboard Formspree**
- vous pouvez aussi recevoir des notifications email

---

## 4) Où voir les réponses ?
Dans votre compte **Formspree** :
- ouvrez votre formulaire
- allez dans **Submissions**
- vous verrez :
  - le nom
  - la présence (Avec plaisir / Avec regret)
  - le nombre d'invités
  - le mot du cœur

---

## 5) Important
Sans `VITE_FORMSPREE_ENDPOINT`, le site reste en **mode démo** :
- l'animation fonctionne
- le formulaire s'affiche
- mais les réponses ne sont pas stockées en ligne

---

## 6) Si vous voulez ensuite
Je peux aussi vous aider à ajouter :
- un **compteur du nombre de réponses**
- un **espace admin**
- l'export vers **Google Sheets**
- l'envoi des réponses vers **email + WhatsApp**
