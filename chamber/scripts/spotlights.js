async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        const premiumMembers = members.filter(m =>
            ["Gold", "Silver"].includes(m.membership)
        );

        const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        const container = document.getElementById("spotlight-container");
        container.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement("article");
            card.classList.add(
                "member-card",
                "spotlights-card",
                member.membership.toLowerCase());

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" class="member-logo" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                <p class="tagline">${member.membership} Member</p>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Spotlights error:", error);
        document.getElementById("spotlight-container").innerHTML =
            "<p>Unable to load spotlights.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadSpotlights)