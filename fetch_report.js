import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, update, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration for reports
const firebaseConfigReports = {
    apiKey: "AIzaSyCqxYq1sTUz1sTICtQgT6qhKyxEn_2il5I",
    authDomain: "report-d7fdc.firebaseapp.com",
    databaseURL: "https://report-d7fdc-default-rtdb.firebaseio.com",
    projectId: "report-d7fdc",
    storageBucket: "report-d7fdc.firebasestorage.app",
    messagingSenderId: "157809266663",
    appId: "1:157809266663:web:db01d06ae6822f843d7742",
    measurementId: "G-HX886C1E3X"
};

// Firebase configuration for manufacturers
const firebaseConfigManufacturers = {
    apiKey: "AIzaSyAYgjAAVKC3AuzvEzH402PcxFF66MdUEaA",
    authDomain: "manufacturer-database.firebaseapp.com",
    databaseURL: "https://manufacturer-database-default-rtdb.firebaseio.com",
    projectId: "manufacturer-database",
    storageBucket: "manufacturer-database.firebasestorage.app",
    messagingSenderId: "921165353469",
    appId: "1:921165353469:web:74690781fae7d32eda8994",
    measurementId: "G-Z8L28GCVR2"
};

// Initialize Firebase for both databases
const appReports = initializeApp(firebaseConfigReports, "reports");
const appManufacturers = initializeApp(firebaseConfigManufacturers, "manufacturers");
const databaseReports = getDatabase(appReports);
const databaseManufacturers = getDatabase(appManufacturers);

const medicineTableBody = document.getElementById("medicineTableBody");
const reportsContainer = document.getElementById("reportsContainer");
const medicinesTab = document.getElementById("medicinesTab");
const reportsTab = document.getElementById("reportsTab");
const medicineTable = document.getElementById("medicineTable");

// Ban medicine function
function banMedicine(key, medicineName) {
    if (confirm(`Are you sure you want to ban ${medicineName}?`)) {
        const medicineRef = ref(databaseReports, `medicines/${key}`);
        update(medicineRef, { isVerified: false })
            .then(() => alert(`${medicineName} has been banned.`))
            .catch((error) => console.error("Error banning medicine:", error));
    }
}

// Attach the function to the global window object
window.banMedicine = banMedicine;

// Reject report function
function rejectReport(key, medicineName) {
    if (confirm(`Are you sure you want to reject ${medicineName}?`)) {
        const reportRef = ref(databaseReports, `reports/${key}`);
        update(reportRef, { isVerified: false })
            .then(() => {
                alert(`${medicineName} has been rejected.`);
                
                // Query the manufacturer database for the medicine based on its name
                const medicinesRef = ref(databaseManufacturers, "medicines");
                const queryMedicines = query(medicinesRef, orderByChild("medicineName"), equalTo(medicineName));
                
                // Search for the medicine by its name in the manufacturers database
                onValue(queryMedicines, (snapshot) => {
                    if (snapshot.exists()) {
                        snapshot.forEach((childSnapshot) => {
                            const medicineKey = childSnapshot.key;
                            const medicineRef = ref(databaseManufacturers, `medicines/${medicineKey}`);
                            update(medicineRef, { isVerified: false })
                                .then(() => {
                                    console.log(`${medicineName}'s isVerified status has been updated in the manufacturer database.`);
                                })
                                .catch((error) => console.error("Error updating medicine verification status:", error));
                        });
                    } else {
                        console.log(`No medicine found with name: ${medicineName}`);
                    }
                });
            })
            .catch((error) => console.error("Error rejecting report:", error));
    }
}

// Attach the function to the global window object
window.rejectReport = rejectReport;

// Fetch medicines
function loadMedicines() {
    const medicinesRef = ref(databaseReports, "medicines");
    onValue(medicinesRef, (snapshot) => {
        const data = snapshot.val();
        medicineTableBody.innerHTML = ""; // Clear previous data
        for (const key in data) {
            const medicine = data[key];
            const row = `
                <tr>
                    <td>${medicine.medicineName}</td>
                    <td>${medicine.manufacturer}</td>
                    <td>${medicine.manufactureDate}</td>
                    <td>${medicine.expiryDate}</td>
                    <td>${medicine.isVerified ? "Yes" : "No"}</td>
                    <td><button class="ban-button" onclick="banMedicine('${key}', '${medicine.medicineName}')">Ban</button></td>
                </tr>
            `;
            medicineTableBody.insertAdjacentHTML("beforeend", row);
        }
    });
}

// Fetch reports
function loadReports() {
    const reportsRef = ref(databaseReports, "reports");
    onValue(reportsRef, (snapshot) => {
        const data = snapshot.val();
        reportsContainer.innerHTML = ""; // Clear previous data
        if (!data) {
            reportsContainer.innerHTML = "<p>No reports available.</p>";
            return;
        }
        for (const key in data) {
            const report = data[key];
            const reportCard = `
                <div class="report-card">
                    <p><strong>Medicine Name:</strong> ${report.medicineName || "N/A"}</p>
                    <p><strong>Medicine ID:</strong> ${report.medicineId || "N/A"}</p>
                    <p><strong>Fault Description:</strong> ${report.faultDescription || "N/A"}</p>
                    <p><strong>QR Code Link:</strong> <a href="${report.qrLink}" target="_blank">View QR</a></p>
                    <p><strong>Submitted On:</strong> ${report.timestamp ? new Date(report.timestamp).toLocaleString() : "N/A"}</p>
                    <button class="reject-button" onclick="rejectReport('${key}', '${report.medicineName}')">Reject</button>
                </div>
            `;
            reportsContainer.insertAdjacentHTML("beforeend", reportCard);
        }
    });
}

// Tab switching logic
medicinesTab.addEventListener("click", () => {
    medicineTable.style.display = "block";
    reportsContainer.style.display = "none";
    medicinesTab.classList.add("active");
    reportsTab.classList.remove("active");
    loadMedicines();
});

reportsTab.addEventListener("click", () => {
    reportsContainer.style.display = "block";
    medicineTable.style.display = "none";
    reportsTab.classList.add("active");
    medicinesTab.classList.remove("active");
    loadReports();
});

// Load medicines by default
loadMedicines();