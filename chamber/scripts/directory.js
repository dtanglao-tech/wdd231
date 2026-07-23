const directory = document.getElementById("directory");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

async function loadMembers() {
    if (!directory) return;

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const members = await response.json();

        renderMembers(members);
        toggleView("grid");
    } catch (error) {
        console.error("Error loading members:", error);
        directory.innerHTML = "<p>Unable to load directory data.</p>";
    }
}

function renderMembers(members) {
    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("member-card", "directory-card");

        if (member.membership) {
            const membershipClass = member.membership
                .toLowerCase()
                .replace(/\s+/g, "-");

            card.classList.add(membershipClass);
        }

        const websiteLink =
            member.website?.trim()
                ? `<p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>`
                : "";

        card.innerHTML = `
            <img src="${member.image}" alt="Logo of ${member.name}" class="member-logo" loading="lazy">
            <h2>${member.name}</h2>
            <p class="tagline">${member.membership} Member</p>
            <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
            <p>Phone: ${member.phone}</p>
            ${websiteLink}
        `;

        directory.appendChild(card);
    });
}

function toggleView(view) {
    if (!directory || !gridBtn || !listBtn) return;

    const isGrid = view === "grid";

    directory.classList.toggle("grid-view", isGrid);
    directory.classList.toggle("list-view", !isGrid);

    gridBtn.setAttribute("aria-pressed", String(isGrid));
    listBtn.setAttribute("aria-pressed", String(!isGrid));
}

if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", () => toggleView("grid"));
    listBtn.addEventListener("click", () => toggleView("list"));
}

document.addEventListener("DOMContentLoaded", loadMembers);