// API key
var apiKey = "cead2a3023567e3257c8bf4d76c421c3";
var date = dayjs().format("DD-MM-YYYY");
const city = "CITY"


// $(document).ready(function () {
//   var city;
//   var lat;
//   // Get value on button click and show alert
//   $("#search-button").click(function (event) {
//     event.preventDefault();
//     var cityInput = $("#search-input").val();
//     // alert("this works" + cityInput);
//     city = cityInput;
//     displayWeather(city);
//     createButton(city);
//   });
// });

// displayWeather ()

function displayWeather(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

  fetch(queryURL)
    .then(function (response) {
      // console.log("check then")
      return response.json();
    })
    .then(function (data) {
      showData(data);
      console.log(data, "this is the data");
    }
}

    // function displayWeather(city)

//       fetch(
//         "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=metric")
//         .then(function (response) {
//           console.log("secondapi");
//           // does this need to be json.prson for date
//           return response.json();
//         })
//         .then(function (data) {
//           // showData(data)
//           console.log(data, "this is 5day  data");
//           showFiveDay(data);

//     });
// })
// }

// function showData(data) {
// // $(".todayimg").append(data.weather[0].icon);
//   $(".location").append(data.name + " ")
//   $(".todaydate").append(date);
//   $(".temp").append("Temp: " + Math.floor(data.main.temp) + "ºC");
//   $(".wind").append ("Wind: " + data.wind.speed);
//   $(".humidity").append("Humidity: " + data.main.humidity);

// }


