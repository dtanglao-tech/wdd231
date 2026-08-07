import { places } from '../data/discover.mjs';
console.log(places);


const showHere = document.querySelector("#allplaces");
const visitMessage = document.querySelector("#visit-message");


function displayItems(places) {
    places.forEach(place => {

        const card = document.createElement("section");
        card.classList.add("card");
        card.classList.gridArea = `card${place.id}`;

        const title = document.createElement("h2")
        title.textContent = place.name;

        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = `images/${place.image}`;
        image.alt = place.alt;
        image.loading = "lazy";

        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = place.address;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";

        card.append(
            title,
            figure,
            description,
            address,
            button
        );

        showHere.appendChild(card);
    });
}

function displayVisitMessage() {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor(
            (now - Number(lastVisit)) / (1000 * 60 * 60 * 24)
        );

        if (daysBetween < 1) {
            visitMessage.textContent =
                "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitMessage.textContent =
                "You last visited 1 day ago.";
        } else {
            VisitMessage.textContent =
                `You last visited ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
}

displayVisitMessage();
displayItems(places);