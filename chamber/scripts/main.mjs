






//------footer------//
export function updateFooter() {
    const yearElement = document.getElementById("currentyear");
    const modifiedElement = document.getElementById("lastModified");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (modifiedElement) {
        modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
}


function initSite() {
    updateFooter();

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
}

document.addEventListener('DOMContentLoaded', initSite);