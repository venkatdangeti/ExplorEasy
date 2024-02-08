var weatherapiKey = "cead2a3023567e3257c8bf4d76c421c3";
var date = dayjs().format("DD-MM-YYYY");
// const city = "CITY"
$(document).ready(function () {
  var city;
  var lat;
  // get value from button. shows in console but not console log
  $("#btnFoodSearch").click(function (event) {
    event.preventDefault();
    var cityInput = $("#foodCity").val();
    city = cityInput;
    displayWeather(city);
  });
});
function displayWeather(city) {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherapiKey}&units=metric`;
  fetch(queryURL)
    .then(function (response) {
      // console.log("check then")
      return response.json();
    })
    .then(function (data) {
      console.log(data.main.temp, "is the temp");
      showData(data);
    });
}
function showData(data) {
  let iconLink = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  $("#temp").append("Temp: " + Math.floor(data.main.temp) + "ºC");
  $('#img').append(`<img src="${iconLink}" />`)
  $("#wind").append("Wind: " + data.wind.speed);
  $("#humidity").append("Humidity: " + data.main.humidity);
}