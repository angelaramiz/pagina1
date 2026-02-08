// Background Component - NC FiscAl
// Este componente inyecta la imagen de fondo con overlay azul en todas las páginas

function getBackgroundImage() {
    return window.innerWidth <= 768 ? '/html/src/MTY-Movil.jpeg' : '/html/src/mty.png';
}

function initializeBackground() {
    // Crear el HTML del fondo con overlay
    const backgroundImage = getBackgroundImage();
    const backgroundHTML = `
        <img src="${backgroundImage}" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2;" alt="Fondo NC FiscAl">
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 102, 204, 0.15); z-index: -1;"></div>
    `;
    
    // Inyectar el fondo al inicio del body
    const body = document.body;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = backgroundHTML;
    
    // Insertar ambos elementos (imagen y overlay)
    const elements = wrapper.querySelectorAll('img, div');
    elements.forEach(el => {
        body.insertBefore(el, body.firstChild);
    });
}

// Inicializar cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBackground);
} else {
    initializeBackground();
}

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    const newImage = getBackgroundImage();
    const bgImg = document.querySelector('body > img[style*="position: fixed"]');
    if (bgImg && !bgImg.src.includes(newImage.split('/').pop())) {
        bgImg.src = newImage;
    }
});