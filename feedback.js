

function handleSubmit() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message  === 0) {
        alert("Please fill in all fields and select a rating before submitting.");
        return false;
    }

    // Hide the form container
    document.getElementById("formContainer").classList.add("hidden");

    // Show the Thank You Popup with the rating
    document.getElementById("thankYouPopup").style.display = "flex";
    
    // Redirect to homepage after 3 seconds
    setTimeout(function() {
        window.location.href = "dashboard.html";  // Replace with your home page URL
    }, 1000);

    return false; // Prevent form submission for demo purposes
}




  