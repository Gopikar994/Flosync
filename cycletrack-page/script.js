// This will hold the tracked cycles
let cycles = [];

// Function to save cycle data to localStorage
function saveCycles() {
    localStorage.setItem('cycles', JSON.stringify(cycles));
}

// Function to load cycles from localStorage
function loadCycles() {
    const storedCycles = localStorage.getItem('cycles');
    if (storedCycles) {
        cycles = JSON.parse(storedCycles);
        renderCycles();
    }
}

// Function to render cycles in the list
function renderCycles() {
    const cycleList = document.getElementById('cycleList');
    cycleList.innerHTML = ''; // Clear the current list

    cycles.forEach((cycle, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Cycle ${index + 1}: Start Date: ${cycle.startDate}, Cycle Length: ${cycle.cycleLength} days`;
        cycleList.appendChild(listItem);
    });
}

// Event listener for form submission
document.getElementById('cycleForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get the form input values
    const startDate = document.getElementById('startDate').value;
    const cycleLength = document.getElementById('cycleLength').value;

    // Validate input
    if (!startDate || !cycleLength) {
        alert('Please fill in both fields.');
        return;
    }

    // Create a new cycle object and add it to the cycles array
    const newCycle = { startDate, cycleLength };
    cycles.push(newCycle);

    // Save the updated cycles array to localStorage
    saveCycles();

    // Clear the form
    document.getElementById('cycleForm').reset();

    // Re-render the cycle list
    renderCycles();
});

// Load stored cycles when the page loads
window.onload = loadCycles;
