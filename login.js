


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZrYUpPbGO0loH9Ep4rHcYW4gWHsjoPtY",
  authDomain: "sih-round-2.firebaseapp.com",
  databaseURL: "https://sih-round-2-default-rtdb.firebaseio.com",
  projectId: "sih-round-2",
  storageBucket: "sih-round-2.appspot.com",
  messagingSenderId: "397271598656",
  appId: "1:397271598656:web:efef153ba7f4dba27e41a5",
  measurementId: "G-4PE6VVXPTZ"
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
            window.location.href = 'user-dashboard.html'; // Redirect based on role
        })
        .catch(error => {
            console.error("Login error:", error);
            alert("Invalid credentials. Please try again.");
        });
});



