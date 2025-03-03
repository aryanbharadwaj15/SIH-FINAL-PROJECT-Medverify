const videoElement = document.getElementById("video");
const qrResultElement = document.getElementById("qr-result");

let lastScannedCode = "";  // Variable to store the last scanned QR code

// Step 1: Try to access the camera
navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: "environment", // Use the back camera of your phone (for mobile scanning)
        width: { ideal: 1280 },  // Optional: specify resolution
        height: { ideal: 720 }   // Optional: specify resolution
    }
}).then((stream) => {
    videoElement.srcObject = stream; // Display the video feed
    videoElement.play(); // Start video playback
    videoElement.onloadedmetadata = () => {
        // Only start scanning when the video has valid metadata (dimensions)
        requestAnimationFrame(scanQRCode); // Start scanning once the video is ready
    };
}).catch(err => {
    qrResultElement.textContent = "Error accessing camera.";
    console.error(err);
});

// Step 2: Continuously scan QR codes
function scanQRCode() {
    if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
        // If video dimensions are not valid, retry the scan
        requestAnimationFrame(scanQRCode);
        return;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Capture the current frame from the video
    const videoWidth = videoElement.videoWidth;
    const videoHeight = videoElement.videoHeight;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

    // Get image data from the canvas
    const imageData = context.getImageData(0, 0, videoWidth, videoHeight);
    const qrCode = jsQR(imageData.data, videoWidth, videoHeight, { inversionAttempts: "dontInvert" });

    // Check if a QR code is detected
    if (qrCode) {
        const qrText = qrCode.data;

        // Update the result only if the QR code is different from the last one
        if (qrText !== lastScannedCode) {
            lastScannedCode = qrText;
            // Display the scanned QR code as a clickable link
            qrResultElement.innerHTML = `Scanned QR Code: <a href="${qrText}" target="_blank">${qrText}</a>`;
            qrResultElement.style.color = "green"; // Show in green
        }
    } else {
        // If no QR code is detected, keep the previous result visible
        if (!qrResultElement.innerHTML.includes("Scanned QR Code")) {
            qrResultElement.textContent = "Waiting for QR code...";
            qrResultElement.style.color = "black"; // Reset color to black when waiting for QR code
        }
    }

    // Continue scanning by calling scanQRCode again
    requestAnimationFrame(scanQRCode);
}