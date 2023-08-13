import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE__APP_apiKey,
  authDomain: import.meta.env.VITE__APP_authDomain,
  projectId: import.meta.env.VITE__APP_projectId,
  storageBucket: import.meta.env.VITE__APP_storageBucket,
  messagingSenderId: import.meta.env.VITE__APP_messagingSenderId,
  appId: import.meta.env.VITE__APP_appId,
};

const app = initializeApp(firebaseConfig);
export default app;
