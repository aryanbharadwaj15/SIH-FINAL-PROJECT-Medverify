import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

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
getAnalytics(app);


document.querySelector('.signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    

    // Basic validation
    if (!name || !email || !password ) {
        alert("All fields are required.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Show loading indicator (optional)

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            return set(ref(db, 'users/' + user.uid), {
                
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            });
        })
        .then(() => {
            alert("User signed up successfully!");
            document.querySelector('.signup-form').reset();
            window.location.href = 'login.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            let message = "Signup failed. Please try again.";
            if (errorCode === 'auth/email-already-in-use') {
                message = "This email is already registered.";
            } else if (errorCode === 'auth/invalid-email') {
                message = "Invalid email address.";
            } else if (errorCode === 'auth/weak-password') {
                message = "Password is too weak.";
            }
            alert(message);
            console.error("Error: ", error);
        });
});