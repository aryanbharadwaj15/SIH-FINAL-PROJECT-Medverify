
// Toggle Sections
function showSection(sectionId) {
    document.getElementById('inventory').style.display = sectionId === 'inventory' ? 'block' : 'none';
    document.getElementById('analytics').style.display = sectionId === 'analytics' ? 'block' : 'none';
}

// Main Chart
const ctx = document.getElementById('mainChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Medicine Stock (Units)',
            data: [200, 180, 250, 220, 300, 270],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
        }
    }
});

// Secondary Chart
const ctx2 = document.getElementById('secondaryChart').getContext('2d');
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Paracetamol', 'Amoxicillin', 'Ibuprofen'],
        datasets: [{
            label: 'Stock Level',
            data: [200, 150, 80],
            backgroundColor: ['#4CAF50', '#FF5722', '#FFC107']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
        }
    }
});


const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
    alert("Logged out successfully!");
    window.location.href = "logintype.html"; // Update with your login page path
});
