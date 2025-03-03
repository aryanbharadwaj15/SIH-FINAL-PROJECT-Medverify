import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

// HTML Elements
const video = document.getElementById("scanner");
const scanStatus = document.getElementById("scan-status");
const errorMessage = document.getElementById("error-message");
const medicineInfo = document.getElementById("medicine-info");
const manufacturerInfo = document.getElementById("manufacturer-info");
const medicineNameInfo = document.getElementById("medicine-name-info");
const quantityInfo = document.getElementById("quantity-info");
const manufactureDateInfo = document.getElementById("manufacture-date-info");
const expiryDateInfo = document.getElementById("expiry-date-info");
const driveLinkInfo = document.getElementById("drive-link-info");

let scannerActive = false;

// Access the user's camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
        video.addEventListener("loadeddata", () => {
            scannerActive = true;
            scanQRCode(); // Start scanning once the video feed is loaded
        });
    })
    .catch((err) => {
        console.error("Error accessing camera:", err);
        scanStatus.textContent = "Unable to access camera.";
    });

// QR Code Scanner
function scanQRCode() {
    if (!scannerActive) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Ensure video dimensions are properly set
    canvas.width = video.videoWidth || 400;
    canvas.height = video.videoHeight || 300;

    if (canvas.width === 0 || canvas.height === 0) {
        // Retry scanning if dimensions are not yet available
        setTimeout(scanQRCode, 500);
        return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
        scannerActive = false; // Stop scanning
        const scannedData = code.data;

        // Display scanned result
        scanStatus.textContent = `Scanned: ${scannedData}`;

        // Check if the scanned data is a valid URL with a `key` query parameter
        const urlPattern = /^(https?:\/\/)/;
        if (urlPattern.test(scannedData)) {
            verifyQRCode(scannedData);
        } else {
            errorMessage.textContent = "QR code does not contain a valid URL.";
            medicineInfo.style.display = "none"; // Hide the details
        }
    } else {
        setTimeout(scanQRCode, 500); // Continue scanning
    }
}

// Verify QR Code against Firebase
function verifyQRCode(link) {
    const queryKey = new URL(link).searchParams.get("key");

    if (!queryKey) {
        errorMessage.textContent = "Invalid QR code link.";
        return;
    }

    const medicineRef = ref(database, `medicines/${queryKey}`);
    get(medicineRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                displayMedicineDetails(data);
            } else {
                errorMessage.textContent = "Data not found in the database.";
            }
        })
        .catch((error) => {
            console.error("Error querying Firebase:", error);
            errorMessage.textContent = "Error accessing database.";
        });
}

// Display Medicine Details
function displayMedicineDetails(data) {
    manufacturerInfo.textContent = data.manufacturer;
    medicineNameInfo.textContent = data.medicineName;
    quantityInfo.textContent = data.quantity;
    manufactureDateInfo.textContent = data.manufactureDate;
    expiryDateInfo.textContent = data.expiryDate;
    driveLinkInfo.href = data.drivelink;
    driveLinkInfo.textContent = "View PDF";

    medicineInfo.style.display = "block";
    errorMessage.textContent = "";
}
