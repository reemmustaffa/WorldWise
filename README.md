# 🌍 WorldWise

A modern, interactive **Single Page Application (SPA)** built with **React Router**, designed to help users explore, save, and manage information about cities and countries they’ve visited or plan to visit.

---

## 🧠 Learning Focus

This project was created as part of my journey to master advanced React concepts, specifically:

- **React Router:** Building **Single Page Applications (SPA)** with nested routes and protected routes.
- **Advanced State Management:** Using the **Context API** and **Reducers** for scalable app-wide state.
- **Advanced useEffect:** Managing dependencies and optimizing API calls.
- **Performance Optimization:** Lazy loading and code-splitting to reduce bundle size.
- **Component Design:** Reusable, modular, and scalable architecture.

---

## 🧩 Key Features

- **Single Page Application (SPA)** using React Router for seamless navigation.
- **Dynamic city and country data** loaded from a mock JSON server.
- **Protected routes** with a simple authentication layer.
- **Context API for global state management** (cities and authentication).
- **Performance optimization** with code-splitting (`React.lazy` + `Suspense`).
- **Advanced useEffect hooks** for precise data fetching and side effect control.
- **Modular component and folder structure** for clean, scalable code.

---

## 🛠️ Tech Stack

- **React 18**
- **React Router v6**
- **Vite**
- **Context API + useReducer**
- **CSS Modules**
- **JavaScript**
- **JSON Server**
- **React.lazy, Suspense**

---

## 📂 Folder Structure

```
WorldWise/
├── data/
│   └── cities.json
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AppNav/
│   │   ├── BackButton/
│   │   ├── Button/
│   │   ├── City/
│   │   ├── CityItem/
│   │   ├── CityList/
│   │   ├── CountryItem/
│   │   ├── CountryList/
│   │   ├── Form/
│   │   ├── Logo/
│   │   ├── Map/
│   │   ├── Message/
│   │   ├── PageNav/
│   │   ├── Sidebar/
│   │   ├── Spinner/
│   │   ├── SpinnerFullPage/
│   │   └── User/
│   │
│   ├── contexts/
│   │   ├── CitiesContext.jsx
│   │   └── FakeAuthContext.jsx
│   │
│   ├── hooks/
│   │   ├── useGeolocation.js
│   │   └── useUrlPosition.js
│   │
│   ├── pages/
│   │   ├── AppLayout/
│   │   ├── HomePage/
│   │   ├── Login/
│   │   ├── PageNotFound/
│   │   ├── Pricing/
│   │   ├── Product/
│   │   └── ProtectedRoute/
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## ⚙️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SamerYaserr/WorldWise.git
   cd WorldWise
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the mock backend:**

   ```bash
   npm run server
   ```

   _(This starts `json-server` and watches `data/cities.json` on port 4000.)_

4. **Start the React app:**

   ```bash
   npm run dev
   ```

---

## 🌟 Key Highlights

- **ProtectedRoute** component ensures only authenticated users can access certain pages.
- **CitiesContext** uses `useReducer` to manage async states (loading, success, error).
- **SpinnerFullPage** provides a global loading state fallback for lazy-loaded pages.
- **AppLayout** integrates all parts into a cohesive, navigable user interface.
