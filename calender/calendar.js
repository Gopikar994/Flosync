// script.js

// Sample data: last cycle start date and cycle length
const lastCycleStartDate = new Date('2023-10-01'); // Example start date
const cycleLength = 28; // Example cycle length in days

// Function to generate the calendar for the current month
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Clear previous calendar

    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    // Fill in the days of the month
    for (let i = 1; i <= totalDays; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = i;

        // Highlight the last cycle start date
        const cycleStartDate = new Date(lastCycleStartDate);
        cycleStartDate.setDate(cycleStartDate.getDate() + (cycleLength * Math.floor((i - 1) / cycleLength)));
        if (i === cycleStartDate.getDate() && cycleStartDate.getMonth() === month) {
            day.style.backgroundColor = '#ffcccb'; // Light red for cycle start
        }

        calendar.appendChild(day);
    }

    // Generate predictions
    generatePredictions();
}

// Function to generate cycle predictions
function generatePredictions() {
    const predictionsList = document.getElementById('predictionsList');
    predictionsList.innerHTML = ''; // Clear previous predictions

    const nextCycleStartDate = new Date(lastCycleStartDate);
    nextCycleStartDate.setDate(nextCycleStartDate.getDate() + cycleLength);

    for (let i = 0; i < 3; i++) { // Show next 3 cycle predictions
        const predictionDate = new Date(nextCycleStartDate);
        predictionDate.setDate(predictionDate