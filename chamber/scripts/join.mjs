const timestampField = document.getElementById("timestamp");

if (timestampField) {
    const timestamp = new Date();
    timestampField.value = timestamp.toISOString();
}

const dialogButtons = document.querySelectorAll("[data-dialog]");
const closeButtons = document.querySelectorAll(".close-dialog");

dialogButtons.forEach(button => {
    button.addEventListener("click", () => {
        const dialog = document.getElementById(button.dataset.dialog);

        if (dialog) {
            dialog.showModal();
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});