async function loadSidebar() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.warn("No token found, skipping sidebar rendering.");
        return;
    }

    try {
        // Verifica si el usuario tiene el permiso "Operar"
        const response = await fetch(`${window.CONFIG.API_URL}/permissions/Operar/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.warn("User doesn't have the 'Operar' permission, skipping sidebar rendering.");
            return;
        }

        // Carga el archivo sidebar.html
        const sidebarResponse = await fetch('/src/js/sidebar.html');
        if (!sidebarResponse.ok) throw new Error('Failed to load sidebar.html');

        const sidebarHtml = await sidebarResponse.text();
        const sidebarContainer = document.createElement('div');
        sidebarContainer.innerHTML = sidebarHtml;
        document.body.prepend(sidebarContainer); // Inserta la barra lateral al inicio del cuerpo
    } catch (error) {
        console.error('Error loading sidebar:', error.message);
    }
}

// Llama a la función al cargar el archivo
loadSidebar();
