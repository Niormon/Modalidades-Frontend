async function loadSidebar() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.warn("No token found, skipping sidebar rendering.");
        return;
    }

    try {
        // Verifica si el usuario tiene el permiso "Admin"
        const response = await fetch(`${window.CONFIG.API_URL}/permissions/Admin/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.warn("User doesn't have the 'Admin' permission, skipping adminSidebar rendering.");
            return;
        }

        // Carga el archivo adminSidebar.html
        const sidebarResponse = await fetch('/src/js/adminSidebar.html');
        if (!sidebarResponse.ok) throw new Error('Failed to load adminSidebar.html');

        const sidebarHtml = await sidebarResponse.text();
        const sidebarContainer = document.createElement('div');
        sidebarContainer.innerHTML = sidebarHtml;
        document.body.prepend(sidebarContainer); // Inserta la barra lateral al inicio del cuerpo
    } catch (error) {
        console.error('Error loading adminSidebar:', error.message);
    }
}

// Llama a la función al cargar el archivo
loadSidebar();
