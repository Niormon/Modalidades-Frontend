async function verifyPermissionAndRedirect() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.warn("No token found. Redirecting to home.");
        window.location.href = '/home.html';
        return;
    }

    try {
        // Verifica el permiso "Admin"
        const response = await fetch(`${window.CONFIG.API_URL}/permissions/Admin/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Manejo de error 403
        if (response.status === 403) {
            console.warn("User doesn't have the 'Admin' permission. Redirecting to home.");
            window.location.href = '/home.html';
            return;
        }

        // Manejo de otros errores HTTP
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Unexpected error: ${response.status}. Response: ${errorText}`);
            window.location.href = '/home.html';
            return;
        }

        // Analiza la respuesta JSON
        const data = await response.json();

        // Verifica si la respuesta indica éxito
        if (data.status === "success" && data.message.includes("Tienes el permiso 'Admin'")) {
            console.log("User has 'Admin' permission. Access granted.");
            return; // El usuario tiene acceso, no hacer nada
        } else {
            console.warn("Permission not validated. Redirecting to home.");
            window.location.href = '/home.html';
        }
    } catch (error) {
        console.error("Error verifying permission:", error.message);
        window.location.href = '/home.html';
    }
}

// Llama a la función cuando se carga el archivo
verifyPermissionAndRedirect();
