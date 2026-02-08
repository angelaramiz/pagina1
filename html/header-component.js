// Header Component - NC FiscAl
// Este componente inyecta el header y la navegación en todas las páginas

document.addEventListener('DOMContentLoaded', function() {
    // Crear el HTML del header
    const headerHTML = `
    <header style="background-color: #01284f; width: 100%; margin: 0;  box-sizing: border-box;">
        <div class="header-container">
            <a href="/html/index.html" class="logo" style="font-family: 'PT Serif', serif; font-weight: 700; color: var(--color-white); font-size: 2.5rem; text-decoration: none;">NC FiscAl</a>
            <button class="header-toggle" onclick="toggleHeader()">☰</button>
            <nav class="header-nav" id="header-nav">
                <a style="color: var(--color-orange);" href="/html/quienes-somos.html">Quiénes Somos</a>
                <a style="color: var(--color-orange);" href="/html/contactanos.html">Contáctanos</a>
                <a style="color: var(--color-orange);" href="javascript:void(0)" onclick="toggleServicesMenu()">Servicios ▼</a>
            </nav>
        </div>
    </header>
    `;

    // Inyectar el header en el placeholder
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = headerHTML;
        const headerElement = wrapper.firstElementChild;
        headerPlaceholder.replaceWith(headerElement);
    }
});

function toggleHeader() {
    const headerNav = document.getElementById('header-nav');
    const isOpen = headerNav.classList.contains('open');
    if (isOpen) {
        closeHeader();
    } else {
        openHeader();
    }
}

function openHeader() {
    const headerNav = document.getElementById('header-nav');
    const backdrop = document.getElementById('backdrop');
    headerNav.classList.add('open');
    backdrop.style.display = 'block';
}

function closeHeader() {
    const headerNav = document.getElementById('header-nav');
    const backdrop = document.getElementById('backdrop');
    headerNav.classList.remove('open');
    backdrop.style.display = 'none';
}
