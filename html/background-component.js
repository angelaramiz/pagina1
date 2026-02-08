// Background Component - NC FiscAl
// Este componente inyecta la imagen de fondo solo en el main

function getBackgroundImage() {
    return window.innerWidth <= 768 ? '/html/src/MTY-Movil.jpeg' : '/html/src/mty.png';
}

function initializeBackground() {
    // Esperar a que el main esté disponible
    function applyBackgroundToMain() {
        const main = document.querySelector('main');
        if (!main) {
            // Si main no existe aún, reintentar
            setTimeout(applyBackgroundToMain, 100);
            return;
        }
        
        // Aplicar el fondo como background-image en el main
        const backgroundImage = getBackgroundImage();
        main.style.backgroundImage = `url('${backgroundImage}')`;
        main.style.backgroundSize = 'cover';
        main.style.backgroundPosition = 'center';
        main.style.backgroundAttachment = 'fixed';
        main.style.position = 'relative';
        main.style.zIndex = '0';
        
        // Crear overlay con pseudo-elemento usando un div
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 102, 204, 0.15)';
        overlay.style.zIndex = '0';
        overlay.style.pointerEvents = 'none';
        
        // Insertar overlay al inicio del main
        main.insertBefore(overlay, main.firstChild);
        
        // Ajustar z-index del contenido del main para que esté sobre el overlay
        const allChildren = main.querySelectorAll(':not([style*="position: absolute"])');
        allChildren.forEach(child => {
            if (child !== overlay) {
                child.style.position = 'relative';
                child.style.zIndex = '1';
            }
        });
        
        // Guardar info para updates en resize
        window.bgConfig = { main, lastImage: backgroundImage };
    }
    
    applyBackgroundToMain();
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
    if (window.bgConfig && !window.bgConfig.lastImage.includes(newImage.split('/').pop())) {
        window.bgConfig.main.style.backgroundImage = `url('${newImage}')`;
        window.bgConfig.lastImage = newImage;
    }
});
