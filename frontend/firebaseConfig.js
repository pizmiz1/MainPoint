import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDNLZK0CPEYKnRUGFbV8F25lGZBISMCYZU",
  authDomain: "onepoint-d4b63.firebaseapp.com",
  projectId: "onepoint-d4b63",
  storageBucket: "onepoint-d4b63.appspot.com",
  messagingSenderId: "273023219999",
  appId: "1:273023219999:web:31768b5ef37c54cebf182a",
  databaseURL: "https://onepoint-d4b63.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
