import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4ZSXE1Bt3N7UA8wLDocUYI3FW384z9Xo",
  authDomain: "miniblog-fa167.firebaseapp.com",
  projectId: "miniblog-fa167",
  storageBucket: "miniblog-fa167.appspot.com",
  messagingSenderId: "109900692836",
  appId: "1:109900692836:web:40ce4a0e69b804cad9ce71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export{db}  

/* RETOMAR A AULA EM 7:25 */