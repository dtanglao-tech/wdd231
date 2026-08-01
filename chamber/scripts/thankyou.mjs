function displaySubmittedData() {
    const params = new URLSearchParams(window.location.search);

    document.getElementById("firstName").textContent = params.get("firstname") || "";
    document.getElementById("lastName").textContent = params.get("lastname") || "";
    document.getElementById("email").textContent = params.get("email") || "";
    document.getElementById("phone").textContent = params.get("phone") || "";
    document.getElementById("organization").textContent = params.get("organization") || "";

    const timestamp = params.get("timestamp");
    document.getElementById("timestamp").textContent =
        timestamp ? new Date(timestamp).toLocaleString() : "";
}

document.addEventListener("DOMContentLoaded", displaySubmittedData);