document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        alert('Login successful!');

        // Save token securely
        sessionStorage.setItem('token', data.access_token);

        // Redirect to the initial page
        window.location.href = '/home.html';
    } catch (error) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
});
