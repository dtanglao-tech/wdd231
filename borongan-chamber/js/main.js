






//------footer------//
function updateFooter() {
    const yearElement = document.getElementById('currentyear');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', updateFooter);