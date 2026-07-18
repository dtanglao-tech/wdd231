document.addEventListener("DOMContentLoaded", () => {
    const hamBtn = document.getElementById("ham-btn");
    const navLinks = document.getElementById("nav-links");

    if (!hamBtn || !navLinks) {
        return;
    }

    const setMenuState = (isOpen) => {
        hamBtn.setAttribute("aria-expanded", String(isOpen));
        navLinks.classList.toggle("open", isOpen);
    };

    setMenuState(false);

    hamBtn.addEventListener("click", () => {
        const expanded = hamBtn.getAttribute("aria-expanded") === "true";
        setMenuState(!expanded);
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target.tagName === "A" && navLinks.classList.contains("open")) {
            setMenuState(false);
        }
    });

    window.addEventlistener("resize", () => {
        if (window.innerWidth >= 768) {
            setMenuState(false);
        }
    })

});