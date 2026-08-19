import "./navigation.js";
import { getFavorites } from "./storage.js";
import { getServices } from "./fetch.js";
import "./utils.js";

const appointmentDate = document.querySelector("#appointment-date");
const favoritesContainer = document.querySelector("#booking-favorites");

if (appointmentDate) {
    const today = new Date().toISOString().split("T")[0];
    appointmentDate.min = today;
}

//saved favorite services.
async function displayBookingFavorites() {
    if (!favoritesContainer) {
        return;
    }

    try {
        const favoriteIds = getFavorites();

        if (favoriteIds.length === 0) {
            favoritesContainer.innerHTML = `
                <p>No favorite services saved yet.</p>
                <p class="favorite-hint">
                    Visit the Services page to save a repair service.
                </p>
            `;
            return;
        }

        const services = await getServices();

        const favoriteServices = services.filter((service) =>
            favoriteIds.includes(service.id)
        );

        // Handle invalid or outdated favorite IDs.
        if (favoriteServices.length === 0) {
            favoritesContainer.innerHTML = `
                <p>No favorite services are currently available.</p>
                <p class="favorite-hint">
                    Visit the Services page to choose another repair.
                </p>
            `;
            return;
        }

        favoritesContainer.innerHTML = "";

        favoriteServices.forEach((service) => {
            const article = document.createElement("article");
            article.classList.add("booking-favorite-card");

            article.innerHTML = `
                <img
                    src="${service.image}"
                    alt="${service.name}"
                    width="160"
                    height="107"
                    loading="lazy"
                >

                <div class="booking-favorite-content">
                    <span class="service-category">
                        ${service.category}
                    </span>

                    <h3>${service.name}</h3>

                    <p>${service.description}</p>

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
                </div>
            `;

            favoritesContainer.appendChild(article);
        });
    } catch (error) {
        console.error("Unable to display favorite services:", error);

        favoritesContainer.innerHTML = `
            <p>
                We could not load your saved services. Please try again later.
            </p>
        `;
    }
}

displayBookingFavorites();