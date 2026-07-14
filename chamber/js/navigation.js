document.addEventListener("DOMContentLoaded", () => {
    const hamBtn = document.getElementById("ham-btn");
    const navLinks = document.getElementById("nav-links");

        if (hamBtn && navLinks) {
            hamBtn.addEventListener("click", () => {
            const expanded = hamBtn.getAttribute("aria-expanded") === "true";

            hamBtn.setAttribute("aria-expanded", !expanded);
        
            navLinks.classList.toggle("open");
        });
    }
});
