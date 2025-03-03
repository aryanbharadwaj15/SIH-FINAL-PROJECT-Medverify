import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYgjAAVKC3AuzvEzH402PcxFF66MdUEaA",
    authDomain: "manufacturer-database.firebaseapp.com",
    databaseURL: "https://manufacturer-database-default-rtdb.firebaseio.com",
    projectId: "manufacturer-database",
    storageBucket: "manufacturer-database.appspot.com",
    messagingSenderId: "921165353469",
    appId: "1:921165353469:web:74690781fae7d32eda8994",
    measurementId: "G-Z8L28GCVR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const medicineDataTbody = document.getElementById("medicineData");
const addDetailsBtn = document.getElementById("addDetailsBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Load medicines data
const medicinesRef = ref(database, "medicines");
onValue(medicinesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        let rows = "";
        Object.values(data).forEach((medicine) => {
            rows += `
                        <tr>
                            <td>${medicine.manufacturer}</td>
                            <td>${medicine.medicineName}</td>
                            <td>${medicine.medicineId}</td>
                            <td>${medicine.manufactureDate}</td>
                            <td>${medicine.expiryDate}</td>
                            <td class="${medicine.isVerified ? 'verified-yes' : 'verified-no'}">${medicine.isVerified ? 'Yes' : 'No'}</td>
                        </tr>
                    `;
        });
        medicineDataTbody.innerHTML = rows;
    } else {
        medicineDataTbody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center;">No data found.</td>
                    </tr>
                `;
    }
});

// Button handlers
addDetailsBtn.addEventListener("click", () => {
    window.location.href = "manufacturer.html";
});

logoutBtn.addEventListener("click", () => {
    alert("Logged out successfully!");
    window.location.href = "logintype.html"; // Update with your login page path
});

const rejectedBtn = document.getElementById("rejectedBtn");

rejectedBtn.addEventListener("click", () => {
    window.location.href = "rejected.html";
});

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const rows = Array.from(medicineDataTbody.querySelectorAll("tr"));
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll("td"));
        const match = cells.some(cell => cell.textContent.toLowerCase().includes(query));
        row.style.display = match ? "" : "none";
    });
});