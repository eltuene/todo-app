import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBAe1ZTkiBd6BWXHVvu0HsID_qnk60yIsM",
  authDomain: "projeto-desenv2.firebaseapp.com",
  databaseURL: "https://projeto-desenv2-default-rtdb.firebaseio.com",
  projectId: "projeto-desenv2",
  storageBucket: "projeto-desenv2.appspot.com",
  messagingSenderId: "639152761015",
  appId: "1:639152761015:web:a9de6ac749519218be0532",
  measurementId: "G-C8H6LY18Y9"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db, app };