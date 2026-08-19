import "./navigation.js";
import "./utils.js";

const resultContainer = document.querySelector("#form-result");

if (resultContainer) {
    const params = new URLSearchParams(window.location.search);

    const fullName = params.get("fullName");
    const email = params.get("email");
    const phone = params.get("phone");
    const deviceBrand = params.get("device-brand");
    const deviceModel = params.get("deviceModel");
    const repairNeeded = params.get("repairNeeded");
    const appointment = params.get("appointment");
    const notes = params.get("notes");

    if (!fullName) {
        resultContainer.textContent =
            "No repair request information was submitted.";
    } else {
        const formattedDate = appointment
            ? new Date(`${appointment}T00:00:00`).toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            )
            : "Not provided";

        resultContainer.innerHTML = "";

        const resultCard = document.createElement("div");
        resultCard.classList.add("result-card");

        resultCard.innerHTML = `
            <div class="result-card-header">
                <h2>Repair Request Received</h2>
                <p>
                    Thank you, ${fullName}. We have received your repair request.
                </p>
            </div>

            <section class="result-group" aria-labelledby="contact-result-title">
                <h3 id="contact-result-title">Contact Information</h3>

                <dl>
                    <div>
                        <dt>Full Name</dt>
                        <dd>${fullName}</dd>
                    </div>

                    <div>
                        <dt>Email</dt>
                        <dd>${email || "Not provided"}</dd>
                    </div>

                    <div>
                        <dt>Phone</dt>
                        <dd>${phone || "Not provided"}</dd>
                    </div>
                </dl>
            </section>

            <section class="result-group" aria-labelledby="device-result-title">
                <h3 id="device-result-title">Device Information</h3>

                <dl>
                    <div>
                        <dt>Brand</dt>
                        <dd>${deviceBrand || "Not provided"}</dd>
                    </div>

                    <div>
                        <dt>Model</dt>
                        <dd>${deviceModel || "Not provided"}</dd>
                    </div>

                    <div>
                        <dt>Repair Needed</dt>
                        <dd>${repairNeeded || "Not provided"}</dd>
                    </div>
                </dl>
            </section>

            <section class="result-group" aria-labelledby="appointment-result-title">
                <h3 id="appointment-result-title">Appointment Details</h3>

                <dl>
                    <div>
                        <dt>Preferred Date</dt>
                        <dd>${formattedDate}</dd>
                    </div>

                    <div>
                        <dt>Additional Notes</dt>
                        <dd>${notes || "No additional notes provided."}</dd>
                    </div>
                </dl>
            </section>
        `;

        resultContainer.appendChild(resultCard);
    }
}