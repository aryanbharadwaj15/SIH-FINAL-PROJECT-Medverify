import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const urlParams = new URLSearchParams(window.location.search);
const medicineKey = urlParams.get("key");

const detailsDiv = document.getElementById("details");

if (!medicineKey) {
  detailsDiv.textContent = "Invalid or missing key.";
  document.getElementById("report").disabled = true;
} else {
  const medicineRef = ref(database, `medicines/${medicineKey}`);
  get(medicineRef)
    .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        detailsDiv.innerHTML = `
          <p><strong>Manufacturer:</strong> ${data.manufacturer || "Not available"}</p>
          <p><strong>Medicine Name:</strong> ${data.medicineName || "Not available"}</p>
          <p><strong>Medicine ID:</strong> ${data.medicineId || "Not available"}</p>
          <p><strong>Manufacture Date:</strong> ${data.manufactureDate || "Not available"}</p>
          <p><strong>Expiry Date:</strong> ${data.expiryDate || "Not available"}</p>
          <p><strong>Verified:</strong> ${data.isVerified ? "Yes" : "No"}</p>
          <p><strong>Quality Check Report:</strong> 
            ${data.drivelink ? `<a href="${data.drivelink}" target="_blank">View Report</a>` : "Not available"}</p>
        `;
      } else {
        detailsDiv.textContent = "No details found for this key.";
      }
    })
    .catch(error => {
      console.error("Error fetching details:", error);
      detailsDiv.textContent = "Error fetching details. Please try again later.";
    });
}
