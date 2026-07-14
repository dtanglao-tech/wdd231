async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        renderMembers(members);

        toggleView('grid');
    } catch (error) {
        console.error('Error loading members:', error);
        document.getElementById('directory').innerHTML = '<p>Unable to load directory data.</p>'; // FIX: Closed the <p> tag properly.
    }
}

function renderMembers(members) {
    const container = document.getElementById('directory');
    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('article');
        card.classList.add('member-card');

        if (member.membership) {
            card.classList.add(member.membership.toLowerCase());
        }

        let websiteLink = '';
        if (member.website && member.website.trim() !== '') {
            websiteLink = `<p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>`;
        }

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" class="member-logo">
            <h2>${member.name}</h2>
            <p class="tagline">${member.membership} Member</p>
            <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
            <p>Phone: ${member.phone}</p>
            ${websiteLink}
        `;

        container.appendChild(card);
    });
}

function toggleView(view) {
    const container = document.getElementById('directory');
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');

    if (view === 'grid') {
        container.classList.add('grid-view');
        container.classList.remove('list-view');
        gridBtn.setAttribute('aria-pressed', 'true');
        listBtn.setAttribute('aria-pressed', 'false');
    } else {
        container.classList.add('list-view');
        container.classList.remove('grid-view');
        gridBtn.setAttribute('aria-pressed', 'false');
        listBtn.setAttribute('aria-pressed', 'true');
    }
}

document.getElementById('grid-view').addEventListener('click', () => toggleView('grid'));

document.getElementById('list-view').addEventListener('click', () => toggleView('list'));

document.addEventListener('DOMContentLoaded', loadMembers);