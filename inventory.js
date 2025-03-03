// inventory.js

// Sample inventory data (replace with real data as needed)
const inventoryData = [
    { id: '001', name: 'Paracetamol', category: 'Antipyretic', quantity: 50, expiry_date: '21/9/2028', status: 'In Stock' },
    { id: '002', name: 'Amoxicillin', category: 'Antibiotic', quantity: 30, expiry_date: '1/10/2024', status: 'In Stock' },
    { id: '003', name: 'Aspirin', category: 'Painkiller', quantity: 20, expiry_date: '21/9/2027', status: 'Low Stock' },
    { id: '004', name: 'Metformin', category: 'Antidiabetic', quantity: 0, expiry_date: '19/10/2026', status: 'Out of Stock' },
    { id: '005', name: 'Lisinopril', category: 'ACE Inhibitor', quantity: 30, expiry_date: '13/3/2027', status: 'Pending Approval' },
    { id: '006', name: 'Ciprofloxacin', category: 'Antibiotic', quantity: 25, expiry_date: '2/11/2029', status: 'Quality Check' },
    // Add more items as needed
];

// Function to render inventory list
function renderInventory(items) {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear existing items

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.expiry_date}</td>
            <td>${item.status}</td>
            <td>
                <button class="edit-btn" onclick="editItem('${item.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteItem('${item.id}')">Delete</button>
            </td>
        `;
        inventoryList.appendChild(row);
    });
}

// Search and filter functionality
document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredItems = inventoryData.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.category.toLowerCase().includes(searchTerm)
    );
    renderInventory(filteredItems);
});

// Function to add a new item (placeholder function)
document.getElementById('add-item-btn').addEventListener('click', function() {
    const newItem = prompt('Enter new item details in the format: ID,Name,Category,Quantity,Expiry Date,Status');
    if (newItem) {
        const [id, name, category, quantity, expiry_date, status] = newItem.split(',');
        inventoryData.push({ id, name, category, quantity: Number(quantity), expiry_date, status });
        renderInventory(inventoryData); // Re-render the list
        showNotification('Item added successfully!');
    }
});

// Function to edit an item (placeholder function)
function editItem(itemId) {
    const item = inventoryData.find(i => i.id === itemId);
    if (item) {
        const newDetails = prompt('Edit item details in the format: ID,Name,Category,Quantity,Expiry Date,Status', 
            `${item.id},${item.name},${item.category},${item.quantity},${item.expiry_date},${item.status}`);
        if (newDetails) {
            const [id, name, category, quantity, expiry_date, status] = newDetails.split(',');
            item.id = id;
            item.name = name;
            item.category = category;
            item.quantity = Number(quantity);
            item.expiry_date = expiry_date;
            item.status = status;
            renderInventory(inventoryData); // Re-render the list
            showNotification('Item edited successfully!');
        }
    }
}

// Function to delete an item
function deleteItem(itemId) {
    const index = inventoryData.findIndex(item => item.id === itemId);
    if (index > -1) {
        inventoryData.splice(index, 1);
        renderInventory(inventoryData); // Re-render the list
        showNotification('Item deleted successfully!');
    }
}

// Function to show notifications
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    setTimeout(() => {
        notification.innerText = '';
    }, 3000);
}

// Initial render of inventory
renderInventory(inventoryData);
