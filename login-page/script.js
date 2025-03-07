document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to allow for validation

    // Get the values of the form fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform simple validation checks
    if (!email || !password) {
        alert("Both email and password are required.");
        return;
    }

    // Basic email format validation (could be expanded)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    // Simulate a basic login check (hardcoded user credentials)
    const hardcodedEmail = "user@example.com";
    const hardcodedPassword = "password123";

    // Check if entered credentials match the hardcoded ones
    if (email === hardcodedEmail && password === hardcodedPassword) {
        // Simulate successful login - redirect to the next page (e.g., home page)
        alert("Login successful!");
        window.location.href = "cycles.html"; // Redirect to the main period tracker page
    } else {
        // Simulate a failed login
        alert("Incorrect email or password. Please try again.");
    }
});
