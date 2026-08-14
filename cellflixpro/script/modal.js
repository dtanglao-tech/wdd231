const modal = document.querySelector("#service-modal");
const closeButton = document.querySelector("#modal-close");

const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalDescription = document.querySelector("#modal-description");
const modalTime = document.querySelector("#modal-time");
const modalPrice = document.querySelector("#modal-price");
const imageContainer =
    document.querySelector("#normal-image-container") ||
    document.querySelector("#modal-image-container");

export function openModal(service) {
    if (!modal) {
        console.warn("Modal element not found.");
        return;
    }

    if (!service) {
        console.warn("No service data was provided.");
        return;
    }

    if (modalTitle) modalTitle.textContent = service.name || "";
    if (modalCategory) modalCategory.textContent = service.category || "";
    if (modalDescription) modalDescription.textContent = service.description || "";
    if (modalTime) modalTime.textContent = service.repairTime || "";
    if (modalPrice) modalPrice.textContent = service.price || "";

    if (imageContainer) {
        imageContainer.innerHTML = `
            <img
                src="${service.image || ""}"
                alt="${service.name || "Repair service"}"
                width="600"
                height="400"
            >
        `;
    }

    modal.showModal();
}

export function closeModal() {
    if (modal && modal.open) {
        modal.close();
    }
}

closeButton?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.open) {
        closeModal();
    }
});