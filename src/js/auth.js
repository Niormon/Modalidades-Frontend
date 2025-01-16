(function () {
    const token = sessionStorage.getItem('token');

    if (!token) {
        alert('No tienes una sesión activa. Serás redirigido al inicio de sesión.');
        window.location.href = '/index.html';
    }
})();
