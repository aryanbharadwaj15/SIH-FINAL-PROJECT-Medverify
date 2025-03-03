
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjKgWb3cJiERzPhW0ndbqgqdp521f_umA",
    authDomain: "abcdefc-87e99.firebaseapp.com",
    databaseURL: "https://abcdefc-87e99-default-rtdb.firebaseio.com",
    projectId: "abcdefc-87e99",
    storageBucket: "abcdefc-87e99.firebasestorage.app",
    messagingSenderId: "378606601253",
    appId: "1:378606601253:web:3d356bb42e8b94131cabcc"
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
            window.location.href = "manufacturer-dashboard.html"; // Redirect based on role
        })
        .catch(error => {
            console.error("Login error:", error);
            alert("Invalid credentials. Please try again.");
        });
});


