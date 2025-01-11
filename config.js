window.CONFIG = {
    API_URL: window.location.origin.includes("localhost")
        ? "http://127.0.0.1:8000" // Desarrollo
        : window.location.origin, // Producción
};

console.log("CONFIG cargado:", window.CONFIG); // Verifica que se carga correctamente
