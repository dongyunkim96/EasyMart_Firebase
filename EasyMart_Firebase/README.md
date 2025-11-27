# 🛒 EasyMart

A modern e-commerce web app built with **React (Vite)**, **Firebase**, **Redux Toolkit**, and **Material-UI**.

![EasyMart Banner](src/assets/EasyMartLogo.png)

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