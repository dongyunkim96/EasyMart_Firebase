# 🛒 EasyMart

A modern e-commerce web app built with **React (Vite)**, **Firebase**, **Redux Toolkit**, and **Material-UI**.

[![EasyMart Banner](EasyMart_Firebase/src/assets/EasyMartLogo.png)](https://easymart-kappa.vercel.app)

---

## 🚀 Features

- Firebase Authentication (Register, Login, Logout)
- User Profile CRUD (name, address, delete account)
- Products: add, edit, delete (all in Firestore)
- Shopping Cart (Redux, session storage persistence)
- Order placement & Order History (per user, in Firestore)
- Material-UI responsive design & dark mode
- "Add to cart" snackbar alert and smooth modals
- Scroll to top floating button

---

## 🏗️ Tech Stack

- **Frontend:** React + Vite
- **UI/UX:** Material-UI (MUI)
- **State:** Redux Toolkit
- **Routing:** React Router DOM
- **Backend:** Firebase (Authentication, Firestore)
- **Styling:** MUI theme, CSS

---

## 📁 File Structure

```plaintext
EasyMart/
├── .github
    └── workflows
        └── main.yml
├── .vercel
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── EasyMartLogo.png
│   ├── app/
│   │   └── store.js
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── Profile.jsx
│   │   ├── Products/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductList.jsx
│   │   ├── Orders/
│   │   │   └── OrderHistory.jsx
│   │   ├── Cart.jsx
│   │   ├── EasyMartLogo.jsx
│   │   ├── Navbar.jsx
│   │   └── ScrollToTopButton.jsx
│   ├── features/
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   ├── cart/
│   │   │   └── cartSlice.js
│   │   ├── products/
│   │   │   └── productSlice.js
│   │   └── orders/
│   │       └── orderSlice.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Checkout.jsx
│   ├── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── README.md
├── babel.config.js
├── eslint.config.js
├── index.html
├── jest.setup.js
├── package-lock.json
└── vite.config.js
---
```

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dongyunkim96/EasyMart.git
cd EasyMart
```
### 2. Install dependencies

```bash
npm install
```
---

### 3. Set up Firebase

- Create a [Firebase project](https://console.firebase.google.com/)
- Enable Authentication (email/password)
- Enable Cloud Firestore
- Get your Firebase config and add to `src/firebase.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // ...your config here
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```
---

### 4. Run locally

```bash
npm run dev
```
## 📝 Key Implementation Details

- **Authentication:**  
  Firebase Auth handles secure user login/registration. After sign-up, a user document is auto-created in the Firestore `users` collection.

- **Firestore as Backend:**  
  - `products` collection: All product CRUD (add/edit/delete/fetch) happens directly with Firestore.
  - `orders` collection: Every checkout is stored with user info, items, and totals.
  - `users` collection: Profile CRUD (edit name, address, delete account).
  - All updates are real-time!

- **Redux Toolkit:**  
  - Cart state and operations are global and persistent (sessionStorage).
  - Product, order, and auth slices for scalable management.

- **UI/UX:**  
  - All design with MUI, matching modern e-commerce feel.
  - Responsive layout, mobile-ready, beautiful snackbars & modals.
  - "Add to cart" shows a snackbar; empty cart message is big and clear.
  - "Scroll to top" floating button for better UX.

- **Dark Mode:**  
  - Global dark mode toggle; app bar and all backgrounds switch smoothly.

## 🛒 Sample Product Data (for Firestore)

You can add products in the Firebase console under `products`:

```json
{
  "name": "Oreo Cookies",
  "description": "Classic chocolate sandwich cookies with a sweet cream filling.",
  "price": 2.99,
  "image": "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80"
}
```


## ⚙️ CI/CD Pipeline (GitHub Actions + Vercel)

This project includes a fully automated **CI/CD pipeline** using **GitHub Actions** for Continuous Integration and **Vercel** for Continuous Deployment.  
Every time code is pushed to the `main` branch (or a pull request is opened), the following process runs:

1. **CI Phase:** Build the project and run all Jest tests  
2. **CD Phase:** If CI passes, the workflow automatically deploys the latest version to Vercel

---

### 🔹 1. Continuous Integration (CI)

The CI job handles:

- Checking out the repository  
- Installing dependencies using `npm ci`  
- Building the Vite project  
- Running the Jest test suite  

This ensures the application builds correctly and all tests pass before deployment is allowed.

---

### 🔹 2. Continuous Deployment (CD)

After CI succeeds, the CD job deploys the application to Vercel:

- Installs the Vercel CLI  
- Pulls production environment info with `vercel pull`  
- Builds the production bundle using Vercel’s build system  
- Deploys the prebuilt output to the Vercel project  

Deployment only occurs on the `main` branch and only if the CI job passes.

---

### 🔹 3. Workflow File (`.github/workflows/main.yml`)

```yaml
name: CI-CD

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  ci:
    name: Build & Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install deps
        run: npm ci

      - name: Build (Vite)
        run: npm run build

      - name: Run tests (Jest)
        run: npm test

  deploy:
    name: Deploy to Vercel (on pass)
    needs: ci
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    env:
      VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm i -g vercel@latest

      - name: Pull Vercel env info
        run: vercel pull --yes --environment=production --token=$VERCEL_TOKEN

      - name: Build (using Vercel)
        run: vercel build --prod --token=$VERCEL_TOKEN

      - name: Deploy
        run: vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN

### 🔹 4. Secrets & Environment Variables

The deployment workflow uses a required GitHub repository secret:

- **VERCEL_TOKEN**  
  Generated from **Vercel Dashboard → Account Settings → Tokens**.  
  This token allows GitHub Actions to authenticate and deploy the project to Vercel through the CLI.

Additionally, all Vite environment variables (`VITE_FIREBASE_*`) must be configured inside:

**Vercel Dashboard → Project → Settings → Environment Variables**

This ensures Firebase configuration and all sensitive runtime values are available during Vercel production builds.


---

### 🔹 5. Deployment Flow Summary

1. Push code to the **main** branch  
2. GitHub Actions triggers the **CI job**  
3. The project installs dependencies, builds, and runs Jest tests  
4. If all CI steps succeed, the **CD job** automatically starts  
5. Vercel receives the new build, deploys it to Production, and updates the live site automatically  
