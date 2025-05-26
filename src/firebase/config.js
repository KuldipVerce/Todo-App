import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyAMUivfZOPlk6tWgIKGUgQpveRcBOehjtk",
	authDomain: "todo-app-5aa43.firebaseapp.com",
	projectId: "todo-app-5aa43",
	storageBucket: "todo-app-5aa43.firebasestorage.app",
	messagingSenderId: "737456322733",
	appId: "1:737456322733:web:dd23c4e9091dee583aee24",
	databaseURL: "https://todo-app-5aa43-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
