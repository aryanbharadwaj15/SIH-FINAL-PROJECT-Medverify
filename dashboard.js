
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
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
const db = getDatabase(app);
const analytics = getAnalytics(app);

const auth = getAuth();
document.querySelector('.logout-btn').addEventListener('click', function () {
    

    signOut(auth).then(() => {
        // Sign-out successful.
        alert("You have been logged out!");
        window.location.href = 'login.html'; // Redirect to login page
    }).catch((error) => {
        // An error occurred during sign-out
        console.error("Error during sign-out:", error);
        alert("An error occurred while logging out. Please try again.");
    });
});





// Check if a user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;

        // Fetch the user's data from the database
        const userRef = ref(db, 'users/' + userId);
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userName = userData.name;

                    // Update the welcome message with the user's name
                    const welcomeText = document.querySelector('.user-info span');
                    welcomeText.textContent = `Welcome, ${userName}`;
                } else {
                    console.error("No user data found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    } else {
        // Redirect to login page if no user is logged in
        window.location.href = 'login.html';
    }
});































document.getElementById('menu-toggle').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
});

document.addEventListener('click', function (event) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');

    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Chart.js setup
const ctx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Performance',
            data: [12, 19, 3, 5, 2],
            borderColor: '#007bff',
            borderWidth: 2,
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


