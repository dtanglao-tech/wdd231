const weatherContainer = document.querySelector("#weather-info");

const myKey = "1c69ef7f4ac29e69c924c3cc36bd0016"
const myLat = "11.60447914836498";
const myLong = "125.44591108643222";

const myURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

if (!weatherContainer) {
    console.warn("Weather container not found.");
} else {
    apiFetch();
}

async function apiFetch() {
    try {
        const response = await fetch(myURL);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        displayResults(data);

    } catch (error) {
        console.error(error);
        weatherContainer.innerHTML = "<p> Unable to load weather data.</p>";
    }
}

function displayResults(data) {
    // current weather //
    const current = data.list[0]

    let html = `
        <h3>${data.city.name}</h3>
        <p><strong>${Math.round(current.main.temp)}°C</strong></p>
        <p>${current.weather[0].description}</p>

        <h4>3-day Forecast</h4>
        <ul>
    `;

    for (let i = 8; i < data.list.length && i <= 24; i += 8) {
        const forecast = data.list[i];
        const day = new Date(forecast.dt_txt).toLocaleDateString("en-PH", {
            weekday: "long"
        });

        const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

        html += `
            <li>
                <strong>${day}</strong><br>
                <img src="${icon}" alt="${forecast.weather[0].description}">
                ${Math.round(forecast.main.temp)}°C -
                ${forecast.weather[0].description}
            </li>
        `;
    }

    html += "</ul>";

    weatherContainer.innerHTML = html;
}