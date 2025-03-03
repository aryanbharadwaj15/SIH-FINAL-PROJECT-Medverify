
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
// Firebase configuration


const firebaseConfig = {
    apiKey: "AIzaSyC1cSrBtDWZi__E724jvY6EiImyXWfMo6A",
    authDomain: "government-database-ca851.firebaseapp.com",
    databaseURL: "https://government-database-ca851-default-rtdb.firebaseio.com",
    projectId: "government-database-ca851",
    storageBucket: "government-database-ca851.firebasestorage.app",
    messagingSenderId: "879522682688",
    appId: "1:879522682688:web:8be38cd13815db5d818ca5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const analytics = getAnalytics(app);



// Handling form submission





document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;



    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log("User logged in:", userCredential.user);
            alert("Login successful!");
            window.location.href = "government.html"; // Redirect based on role
        })
        .catch(error => {
            console.error("Login error:", error);
            alert("Invalid credentials. Please try again.");
        });
});


