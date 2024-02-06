const mapContainer = document.getElementById("map-container");
const homepageContainer = document.getElementById("homepage");
// const foodSearch = document.getElementById("btnFoodSearch");
mapContainer.style.display = "none"



// --------------------GoogleMaps--------------------

/*
const googleMapApiKey = "AIzaSyCmDudwunOmVymVH8dlayR-vtBWWOlp8sQ";

const queryGoogleUrl = "https://maps.googleapis.com/maps/api/js?key=";

fetch(queryGoogleUrl+googleMapApiKey)
    .then(response => response.json())
    .then(response => console.log(response));
    

let map;
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

 let map = new map(document.getElementById("map"), {
    center: { lat: 53.3811, lng: 1.4701 },
    zoom: 8,
  });
}

initMap();

$('h1').append('<p>Hello</p>')

*/
// --------------------TripAdvisor--------------------

/*
const myKey = "F84AC397734F44FD8CF42D20CF4653F6";
const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.content.tripadvisor.com/api/v1/location/2552/details?language=en&currency=USD&key=${myKey}`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


fetch('https://api.content.tripadvisor.com/api/v1/location/2552/photos?language=en&key=F84AC397734F44FD8CF42D20CF4653F6', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  
  */
// --------------------MapBox------------------

const userSearch = document.querySelector(".search");
const daySearch = document.querySelector(".daySearch");

const apiKey = "pk.eyJ1IjoibWFmZXI3NCIsImEiOiJjbHMyODV2M3YwZ3NoMmxwaTZyZWJza3Q2In0.j9Y_b9SUoYoJhRFQDzk6QQ"
// const queryUrl = `https://api.mapbox.com/search/searchbox/v1/?access_token=${apiKey}`;


function displayMap( long,lat) {
    mapboxgl.accessToken = apiKey;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [ long, lat], // starting position [lng, lat]
        zoom: 9 // starting zoom

    });

    new mapboxgl.Marker()
        .setLngLat([long, lat])
        .addTo(map);

    map.on('load', () => {
        map.addSource
    });
}
// daySearch.addEventListener("submit", async event => {
//     event.preventDefault();
//     const city = daySearch.value;
//     if(city){
//         try {
//             const location = getLocation(city)
//             //document.location.href = 'index.html';

//         }
//     }
// })    

// sults_LngLconst reat = data.features[0].geometry.coordinates;
const city = "CITY"
const queryUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?proximity=ip&access_token=${apiKey}`

function getLocation(city) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?proximity=ip&access_token=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data, "Arr", data.features[0].center);
            // let geoJson = []
            // for (let i = 0; i < data.feature.length; i++) {
            //     geoJson.push({
            //         "type": "Feature",
            //         "geometry": {
            //             "type": "Point",
            //             "coordinates": [data.features[i].center[0], data.features[i].center[1]]
            //         },
            //         "properties": {
            //             "name":data.features[i].place_name
            //         }
            //     })
            // }
           displayMap(data.features[0].center[0], data.features[0].center[1])
           // displayMap(geoJson)
        });
    // .then(data => {
    // const {lat, lng} = 
    // })
}

var btnFoodSearch = document.getElementById("btnFoodSearch");
btnFoodSearch.addEventListener("click", function () {
    var foodCity = document.getElementById("foodCity").value;
    mapContainer.style.display = "block"
    homepageContainer.style.display = "none"

    console.log(foodCity)
    getLocation(foodCity);
});


function getFoodDrink() {
    const queryUrl = `https://api.mapbox.com/search/searchbox/v1/category/food_and_drink?proximity=ip&access_token=${apiKey}`
    fetch(queryUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}
getLocation(city);
        //ACCESS TO SEARCH FOOD BTN WITH EVENT LISTENER

