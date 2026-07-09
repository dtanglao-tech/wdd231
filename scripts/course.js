const courses = [
    { code: "WDD 130", type: "WDD", credits: 2, completed: true },
    { code: "WDD 131", type: "WDD", credits: 2, completed: true },
    { code: "WDD 231", type: "WDD", credits: 2, completed: false },
    { code: "CSE 110", type: "CSE", credits: 2, completed: true },
    { code: "CSE 111", type: "CSE", credits: 2, completed: true },
    { code: "CSE 210", type: "CSE", credits: 2, completed: true }
];

const courseContainer = document.getElementById("course-cards");
const creditDisplay = document.getElementById("credits");
const filterButtons = document.querySelectorAll(".filters button");

function renderCourses(filter) {
    if (!courseContainer) {
        return;
    }

    courseContainer.innerHTML = "";
    const filtered = courses.filter((course) => filter === "all" || course.type === filter);

    filtered.forEach((course) => {
        const card = document.createElement("div");
        card.className = course.completed ? "course completed" : "course";
        card.innerHTML = `<h3>${course.code}</h3><p>${course.credits} credits</p>`;
        courseContainer.appendChild(card);
    });

    const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
    if (creditDisplay) {
        creditDisplay.textContent = totalCredits;
    }

    filterButtons.forEach((button) => {
        const isActive = button.dataset.filter === filter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => renderCourses(button.dataset.filter));
});

renderCourses("all");