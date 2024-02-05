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


mapboxgl.accessToken = apiKey;
const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [-5.347907,53.390149], // starting position [lng, lat]
        zoom: 9 // starting zoom
        
    });

    new mapboxgl.Marker()
        .setLngLat([-5.347907,53.390149])
        .addTo(map);

        map.on('load', () => {
            map.addSource
        });
        
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
        const city = "Sheffield"
    const queryUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?proximity=ip&access_token=${apiKey}`
        
    function getLocation(city) {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?proximity=ip&access_token=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
        // .then(data => {
            // const {lat, lng} = 
        // })
    }

    getLocation(city);
    