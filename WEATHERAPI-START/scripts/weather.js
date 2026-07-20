const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

// create required variables for the url //
const myKey = "1c69ef7f4ac29e69c924c3cc36bd0016"
const myLat = "11.60447914836498"
const myLong = "125.44591108643222"

// construct a full path using template literals
const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;


// try to grab the current weather data //
async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
        const data = await response.json();
        displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
    
// display the json data onto my web page //
function displayResults(data) {

    myTown.innerHTML = data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F`

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    myGraphic.setAttribute('SRC', iconsrc)
    myGraphic.setAttribute('alt',  data.weather[0].description)
}

apiFetch();