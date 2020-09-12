const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";

function getWheather(lat,lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(response => {
        return response.json();
    })
    .then(json => {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`; 
    })
}


function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWheather(latitude,longitude);
}

function handleGeoError() {
    console.log('Cant access get location');
}


function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}



function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWheather(parseCoords.latitude,parseCoords.longitude);
    }
}


function init() {
    loadCoords();
}

init();