import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
let lastSavedMedicineKey = null;

const submitBtn = document.getElementById('submitBtn');
const generateQrBtn = document.getElementById('generateQrBtn');
const qrCodeDiv = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');

submitBtn.addEventListener('click', () => {
    const manufacturer = document.getElementById('manufacturer').value;
    const medicineName = document.getElementById('medicineName').value;
    const medicineId = document.getElementById('medicineId').value;
    
    const quantity = document.getElementById('quantity').value;
    const manufactureDate = document.getElementById('manufactureDate').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const drivelink = document.getElementById('drivelink').value
    const isVerified = document.getElementById('isVerified').checked;

    if (new Date(manufactureDate) >= new Date(expiryDate)) {
        alert('Manufacturing date must precede expiry date.');
        return;
    }

    if (!manufacturer || !medicineName || !medicineId || !quantity || !manufactureDate || !expiryDate || !drivelink) {
        alert('Please fill out all required fields.');
        return;
    }

    const medicinesRef = ref(database, 'medicines');
    const newMedicineRef = push(medicinesRef);

    set(newMedicineRef, {
        manufacturer,
        medicineName,
        medicineId,
        
        quantity,
        manufactureDate,
        expiryDate,
        drivelink,
        isVerified
    }).then(() => {
        alert('Data Saved Successfully!');
        document.getElementById('medicineForm').reset();
        lastSavedMedicineKey = newMedicineRef.key;
    }).catch((error) => {
        console.error('Error saving data:', error);
        alert('Error saving data. Please try again.');
    });
});

generateQrBtn.addEventListener('click', () => {
    if (!lastSavedMedicineKey) {
        alert('Please save the medicine details first.');
        return;
    }

    const qrLink = `https://medverifyweb.netlify.app/medicine-details.html?key=${lastSavedMedicineKey}`;
    qrCodeDiv.innerHTML = '';
    const qrCode = new QRCode(qrCodeDiv, {
        text: qrLink,
        width: 200,
        height: 200
    });

    setTimeout(() => {
        const canvas = qrCodeDiv.querySelector('canvas');
        const qrImage = canvas.toDataURL("image/png");
        downloadBtn.style.display = 'block';
        downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = qrImage;
            a.download = 'medicine_qr_code.png';
            a.click();
        };
    }, 500);
});