async function addBackToHomeButton() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.warn("No token found. Adding 'Back to Home' button.");
        renderBackToHomeButton();
        return;
    }

    try {
        // Verifica el permiso "Operar"
        const response = await fetch(`${window.CONFIG.API_URL}/permissions/Operar/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Manejo de error 403
        if (response.status === 403) {
            console.warn("User doesn't have the 'Operar' permission. Adding 'Back to Home' button.");
            renderBackToHomeButton();
            return;
        }

        // Manejo de otros errores HTTP
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Unexpected error: ${response.status}. Response: ${errorText}`);
            renderBackToHomeButton();
            return;
        }

        // Analiza la respuesta JSON
        const data = await response.json();

        // Verifica si la respuesta indica éxito
        if (data.status === "success" && data.message.includes("Tienes el permiso 'Operar'")) {
            console.log("User has 'Operar' permission. No need to add 'Back to Home' button.");
            return; // El usuario tiene acceso, no hacer nada
        } else {
            console.warn("Permission not validated. Adding 'Back to Home' button.");
            renderBackToHomeButton();
        }
    } catch (error) {
        console.error("Error verifying permission:", error.message);
        renderBackToHomeButton();
    }
}

function renderBackToHomeButton() {
    const button = document.createElement('button');
    button.textContent = 'Volver a Página Principal';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.backgroundColor = '#007bff';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.padding = '10px 15px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';

    button.addEventListener('click', () => {
        window.location.href = '/home.html';
    });

    document.body.appendChild(button);
}

// Llama a la función cuando se carga el archivo
addBackToHomeButton();
