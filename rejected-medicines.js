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

const rejectedList = document.getElementById("rejectedList");

// Retrieve previously seen medicine IDs from localStorage
const seenMedicineIds = JSON.parse(localStorage.getItem("seenMedicineIds")) || [];

// Load rejected medicines
const medicinesRef = ref(database, "medicines");
onValue(medicinesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        let rejectedItems = "";
        const currentMedicineIds = [];

        Object.values(data).forEach((medicine) => {
            if (!medicine.isVerified) {
                currentMedicineIds.push(medicine.medicineId);

                const isNew = !seenMedicineIds.includes(medicine.medicineId);

                rejectedItems += `
                    <li style="background-color: ${isNew ? "#c3e6cb" : "#f8d7da"};">
                        <strong>Manufacturer:</strong> ${medicine.manufacturer}<br>
                        <strong>Medicine Name:</strong> ${medicine.medicineName}<br>
                        <strong>Medicine ID:</strong> ${medicine.medicineId}<br>
                        <strong>Manufacture Date:</strong> ${medicine.manufactureDate}<br>
                        <strong>Expiry Date:</strong> ${medicine.expiryDate}
                    </li>`;
            }
        });

        rejectedList.innerHTML = rejectedItems || "<li>No rejected medicines found.</li>";

        // Update localStorage with the latest list of rejected medicine IDs
        localStorage.setItem("seenMedicineIds", JSON.stringify(currentMedicineIds));
    } else {
        rejectedList.innerHTML = "<li>No data found in the database.</li>";
    }
});
