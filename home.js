// Initialize Firebase App in your main HTML file if not done already
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";





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
const database = getDatabase(app);
let isLoggedIn = false;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        isLoggedIn = true;
        console.log('User is logged in:', user);
        // You can also get the user's info if needed
        const uid = user.uid;
        const displayName = user.displayName;
        // Update your UI accordingly
    } else {
        // User is signed out
        isLoggedIn = false;
        console.log('No user is logged in');
        // Update your UI accordingly
    }
});



document.getElementById('started-link').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior
    if (isLoggedIn) {
        alert('You have already logged in.');
    } else {
        window.location.href = 'logintype.html'; // Redirect to login page
    }
});

document.getElementById('login-link').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior
    if (isLoggedIn) {
        alert('You have already logged in.');
    } else {
        window.location.href = 'logintype.html'; // Redirect to login page
    }
});

document.getElementById('register-link').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior
    if (isLoggedIn) {
        alert('You have already logged in.');
    } else {
        window.location.href = 'signup.html'; // Redirect to signup page
    }
});

// You can use the following function to log out
function logout() {
    isLoggedIn = false; // Set the login status to false
    // You may also want to clear session storage or cookies here
}

// Call this function on logout event
// logout(); // Uncomment this line to test logout functionality

const newsContainer = document.querySelector('.news-images');
const newsItems = document.querySelectorAll('.news-image');
let currentIndex = 0;
const totalNews = newsItems.length;

// Function to clone images infinitely
function cloneImages() {
    newsItems.forEach(item => {
        const clone = item.cloneNode(true);
        newsContainer.appendChild(clone);
    });
}

// Call the clone function to duplicate images
cloneImages();

function showNews() {
    currentIndex++;

    if (currentIndex >= totalNews) {
        currentIndex = 0; // Reset to the first image
        newsContainer.style.transition = 'none'; // Disable transition for instant jump
        newsContainer.style.transform = `translateX(0)`; // Reset position
        setTimeout(() => {
            newsContainer.style.transition = 'transform 0.5s ease-in-out'; // Enable transition
        }, 50); // Small delay to allow for the reset
    } else {
        newsContainer.style.transition = 'transform 0.5s ease-in-out';
    }

    newsContainer.style.transform = `translateX(-${(currentIndex * (100 / totalNews))}%)`; // Adjust for visible items
}

// Automatic news slideshow
setInterval(showNews, 700); // Change every 0.7 seconds

// Initial display
showNews();
