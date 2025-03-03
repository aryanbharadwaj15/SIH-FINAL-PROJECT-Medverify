// analytics.js

// Sample inventory data
const inventoryData = [
    { id: '001', name: 'Paracetamol', quantity: 50, status: 'In Stock', expiry_date: '2024-10-01' },
    { id: '002', name: 'Amoxicillin', quantity: 30, status: 'Low Stock', expiry_date: '2023-09-30' },
    { id: '003', name: 'Aspirin', quantity: 20, status: 'In Stock', expiry_date: '2025-05-01' },
    { id: '004', name: 'Metformin', quantity: 0, status: 'Out of Stock', expiry_date: '2023-08-15' },
    { id: '005', name: 'Lisinopril', quantity: 30, status: 'Pending Approval', expiry_date: '2023-10-15' },
];

// Calculate total items and expiring soon
const totalItems = inventoryData.length;
const expiringSoon = inventoryData.filter(item => new Date(item.expiry_date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length;
const lowStock = inventoryData.filter(item => item.status === 'Low Stock').length;

// Update metrics on the page
document.getElementById('total-items').innerText = totalItems;
document.getElementById('expiring-soon').innerText = expiringSoon;
document.getElementById('low-stock').innerText = lowStock;

// Data for charts
const categories = {};
const statuses = {};

inventoryData.forEach(item => {
    categories[item.name] = (categories[item.name] || 0) + item.quantity;
    statuses[item.status] = (statuses[item.status] || 0) + 1;
});

// Create Category Bar Chart
const ctxCategory = document.getElementById('categoryChart').getContext('2d');
const categoryChart = new Chart(ctxCategory, {
    type: 'bar',
    data: {
        labels: Object.keys(categories),
        datasets: [{
            label: 'Quantity by Item',
            data: Object.values(categories),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: {
            duration: 1000, // Animation duration
        }
    }
});

// Create Status Pie Chart
const ctxStatus = document.getElementById('statusChart').getContext('2d');
const statusChart = new Chart(ctxStatus, {
    type: 'pie',
    data: {
        labels: Object.keys(statuses),
        datasets: [{
            label: 'Items by Status',
            data: Object.values(statuses),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }]
    },
    options: {
        responsive: true,
        animation: {
            animateScale: true,
            duration: 1000, // Animation duration
        }
    }
});

// Create Expiry Line Chart
const ctxExpiry = document.getElementById('expiryChart').getContext('2d');
const expiryChart = new Chart(ctxExpiry, {
    type: 'line',
    data: {
        labels: inventoryData.map(item => item.name),
        datasets: [{
            label: 'Expiry Dates (Days)',
            data: inventoryData.map(item => Math.ceil((new Date(item.expiry_date) - new Date()) / (1000 * 60 * 60 * 24))),
            borderColor: '#FF9F40',
            fill: false,
            tension: 0.1,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: {
            duration: 1000, // Animation duration
        }
    }
});
