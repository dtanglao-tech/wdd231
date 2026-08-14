import { getServices } from "./fetch.js";
import { getFavorites, toggleFavorite } from "./storage.js";
import { openModal } from "./modal.js";

const servicesContainer = document.querySelector("#services-container");
const servicesStatus = document.querySelector("#services-status");
const servicesInput = document.querySelector("#service-search");
const filterSelect = document.querySelector("#service-filter");
const favoriteCount = document.querySelector("#favorite-count");
const noResults = document.querySelector("#no-results");

let allServices = [];
let currentServices = [];

// service card dynamically //
function createServiceCard(service) {
    const article = document.createElement("article");
    article.classList.add("service-card");

    const favorites = getFavorites();
    const isFavorite = favorites.includes(service.id);

    article.innerHTML = `
        <div class="service-image-wrapper">
            <img src="${service.image}" alt="${service.name}" width="600" height="400" loading="lazy">        
        </div>

        <div class="service-card-content">
            <span class="service-category">${service.category}</span>
            <h3>${service.name}</h3>
            <p class="service-description">${service.description}</p>
            
            <dl class="service-meta">
                <div>
                    <dt>Time</dt>
                    <dd>${service.repairTime}</dd>
                </div>

                <div>
                    <dt>Price</dt>
                    <dd>${service.price}</dd>
                </div>
            </dl>

            <div class="service-card-actions">
                <button
                    class="button-secondary view-details"
                    type="button"
                    data-service-id="${service.id}">
                    View Details
                </button>

                <button
                    class="favorite-button ${isFavorite ? "is-favorite" : ""}"
                    type="button"
                    data-service-id="${service.id}"
                    aria-label="${isFavorite
                            ? `Remove ${service.name} from favorites`
                            : `Save ${service.name} to favorites`}"
                    aria-pressed="${isFavorite}">
                    <span aria-hidden="true">${isFavorite ? "★" : "☆"}</span>
                    <span class="favorite-text">${isFavorite ? "Saved" : "Save"}</span>
                </button>
            </div>
        </div>
    `;

    return article;

}

// Service Cards
function displayServices(services) {
    servicesContainer.innerHTML = "";
    const favorites = getFavorites();

    if (services.length === 0) {
        noResults.hidden = false;
        return;
    }

    noResults.hidden = true;

    services.forEach((service) => {
        const card = createServiceCard(service);
        servicesContainer.appendChild(card);
    });

    addCardEventListeners();
    updateFavoriteCount();
}

// buttons
function addCardEventListeners() {
    const detailButtons = document.querySelectorAll(".view-details");
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    detailButtons.forEach((button) => {
        button.addEventListener("click", handleDetailsClick);
    });

    favoriteButtons.forEach((button) => {
        button.addEventListener("click", handleFavoriteClick);
    });
}

// Modal for a selected service
function handleDetailsClick(event) {
    const serviceId = Number(event.currentTarget.dataset.serviceId);
    const service = allServices.find((item) => item.id === serviceId);

    if (service) {
        openModal(service);
    }
}

// Favorite service
function handleFavoriteClick(event) {
    const button = event.currentTarget;
    const serviceId = Number(button.dataset.serviceId);

    const favorites = toggleFavorite(serviceId);
    updateFavoriteCount();

    const isFavorite = favorites.includes(serviceId);
    button.classList.toggle("is-favorite", isFavorite);
    button.setAttribute("aria-pressed", String(isFavorite));

    const service = allServices.find((item) => item.id === serviceId);

    if (service) {
        button.setAttribute(
            "aria-label",
            isFavorite
                ? `Remove ${service.name} from favorites`
                : `Save ${service.name} to favorites`
        );
    }

    const icon = button.querySelector("span:first-child");
    const text = button.querySelector(".favorite-text");

    if (icon) {
        icon.textContent = isFavorite ? "★" : "☆";
    }

    if (text) {
        text.textContent = isFavorite ? "Saved" : "Save";
    }
}

// Saved favorites
function updateFavoriteCount() {
    const favorites = getFavorites();
    favoriteCount.textContent = `Favorites: ${favorites.length}`;
}

// Filter & search services
function filterServices() {
    const searchTerm = servicesInput.value.trim().toLowerCase();
    const selectedCategory = filterSelect.value;
    
    currentServices = allServices.filter((service) => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchTerm) ||
            service.category.toLowerCase().includes(searchTerm) ||
            service.repairTime.toLowerCase().includes(searchTerm);
        
        const matchesCategory =
            selectedCategory === "all" || service.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayServices(currentServices);
}

// Initialize Service page.
async function initializeServices() {
    try {
        servicesStatus.textContent = "Loading repair services...";
        
        allServices = await getServices();
        currentServices = allServices;

        displayServices(currentServices);
        servicesStatus.textContent = `${allServices.length} repair services available.`;
    } catch (error) {
        console.error("Services initialization failed:", error);
        servicesStatus.textContent = "Sorry, we could not load the repair services. Please try again later.";
        servicesContainer.innerHTML = "";
    }
}

// Search services
servicesInput?.addEventListener("input", filterServices);
filterSelect?.addEventListener("change", filterServices);

initializeServices();