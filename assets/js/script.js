const mapContainer = document.getElementById("map-container");
const homepageContainer = document.getElementById("homepage");
const listingcontainer = document.getElementById("listings");
// const foodSearch = document.getElementById("btnFoodSearch");
mapContainer.style.display = "none";
listingcontainer.style.display = "none";



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


function buildLocationList(stores) {
    const listings = document.getElementById('listings');
    // listings.innerHTML = "";
    for (const store of stores.features) {
        /* Add a new listing section to the sidebar. */

        const listing = listings.appendChild(document.createElement('div'));
        /* Assign a unique `id` to the listing. */
        listing.id = `listing-${store.id}`;
        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';

        /* Add the link to the individual listing created above. */
        const link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.id = `link-${store.id}`;
        link.innerHTML = `${store.place_name}`;

        /* Add details to the individual listing. */
        const details = listing.appendChild(document.createElement('div'));
        details.innerHTML = `${store.text}`;
        if (store.properties.phone) {
            details.innerHTML += ` · ${store.properties.phoneFormatted}`;
        }
        if (store.properties.distance) {
            const roundedDistance = Math.round(store.properties.distance * 100) / 100;
            details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
        }
        link.addEventListener('click', function () {
            for (const feature of stores.features) {
                if (this.id === `link-${feature.id}`) {
                    flyToStore(feature);
                    createPopUp(feature);
                }
            }
            const activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
                activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
        });


    }
}

function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
    });
}

function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
        .addTo(map);
}

function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    for (const marker of stores.features) {
        /* Create a div element for the marker. */
        const el = document.createElement('div');
        /* Assign a unique `id` to the marker. */
        el.id = `marker-${marker.properties.id}`;
        /* Assign the `marker` class to each marker for styling. */
        el.className = 'marker';

        /**
         * Create a marker using the div element
         * defined above and add it to the map.
         **/
        new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    }
}


function showAll(data) {
    buildLocationList(data)
    mapboxgl.accessToken = apiKey;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        zoom: 13, // starting zoom
        center: [data.features[0].center[0], data.features[0].center[1]]

    });
    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
        /* Add the data to your map as a layer */
        map.addLayer({
            id: 'locations',
            type: 'circle',
            /* Add a GeoJSON source containing place coordinates and information. */
            source: {
                type: 'geojson',
                data: data
            }
        });
    });

    map.on('click', (event) => {
        /* Determine if a feature in the "locations" layer exists at that point. */
        const features = map.queryRenderedFeatures(event.point, {
            layers: ['locations']
        });

        /* If it does not exist, return */
        if (!features.length) return;

        const clickedPoint = features[0];

        /* Fly to the point */
        flyToStore(clickedPoint);

        /* Close all other popups and display popup for clicked store */
        createPopUp(clickedPoint);

        /* Highlight listing in sidebar (and remove highlight for all other listings) */
        const activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
            activeItem[0].classList.remove('active');
        }
        const listing = document.getElementById(
            `listing-${clickedPoint.properties.id}`
        );
        listing.classList.add('active');
    });
    addMarkers()
}

function displayMap(long, lat) {
    mapboxgl.accessToken = apiKey;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [long, lat], // starting position [lng, lat]
        zoom: 13 // starting zoom

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
            console.log("Data", data)
            // console.log(data, "Arr", data.features[0].center);
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
            /// displayMap(data.features[0].center[0], data.features[0].center[1])
            // displayMap(geoJson)
            showAll(data)
        });
    // .then(data => {
    // const {lat, lng} = 
    // })
}

//FOOD
var btnFoodSearch = document.getElementById("btnFoodSearch");
btnFoodSearch.addEventListener("click", function () {
    var foodCity = document.getElementById("foodCity").value;
    mapContainer.style.display = "block"
    listingcontainer.style.display = "block";
    homepageContainer.style.display = "none"
    console.log(foodCity);
    getLocation(foodCity);
});


function getFoodDrink() {
    const queryUrl = `https://api.mapbox.com/search/searchbox/v1/category/food_and_drink?proximity=ip&access_token=${apiKey}`
    fetch(queryUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showAll(data)
        });
}
getLocation(city);


//SHOPPING
var btnShoppingSearch = document.getElementById("btnShoppingSearch");
btnShoppingSearch.addEventListener("click", function () {
    var shoppingCity = document.getElementById("shoppingCity").value;
    mapContainer.style.display = "block"
    listingcontainer.style.display = "block";
    homepageContainer.style.display = "none"
    console.log(shoppingCity);
    getLocation(shoppingCity);
});

function getShopping() {
    const queryUrl = `https://api.mapbox.com/search/searchbox/v1/category/shopping?proximity=ip&access_token=${apiKey}`
    fetch(queryUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showAll(data)
        });
}
getLocation(city);


//NIGHT OUT
var btnNightLifeSearch = document.getElementById("btnNightLifeSearch");
btnNightLifeSearch.addEventListener("click", function () {
    var nightLifeCity = document.getElementById("nightLifeCity").value;
    mapContainer.style.display = "block"
    listingcontainer.style.display = "block";
    homepageContainer.style.display = "none"
    console.log(nightLifeCity);
    getLocation(nightLifeCity);
});


function getNightLife() {
    const queryUrl = `https://api.mapbox.com/search/searchbox/v1/category/night_life?proximity=ip&access_token=${apiKey}`
    fetch(queryUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showAll(data)
        });
}
getLocation(city);

//ACCESS TO SEARCH FOOD BTN WITH EVENT LISTENER

