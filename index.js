const API_KEY = "ef21917098f74f74b49115054250405";
const BASE_URL = "http://api.weatherapi.com/";
const CURRENT_WEATHER_ENDPOINT = "/v1/current.json";

// alert('Hello')

const geo = navigator.geolocation;
console.log(geo);
geo.getCurrentPosition(
    (position) => {
        console.log(position);
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const formattedPosition = `${lat}, ${long}`;
        const url = new URL(CURRENT_WEATHER_ENDPOINT, BASE_URL);
        url.searchParams.set("key", API_KEY);
        url.searchParams.set("q", formattedPosition);
        const request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.addEventListener('loadend', (event) => {
            console.log(event.target.response);
            const weatherData = JSON.parse(event.target.response);
            console.log(weatherData);

            const headingLocation = document.createElement("h1");
            headingLocation.innerText = `${weatherData.location.name}, ${weatherData.location.country}`;
            document.body.appendChild(headingLocation);

            const tempC = document.createElement("h2");
            tempC.innerText = `${weatherData.current.temp_c} grade o njesh`;
            document.body.appendChild(tempC);
        });
        request.send();
    },
    () => {
        alert('Me vjen keq por me duhet akses te lokacioni yt');
    })

