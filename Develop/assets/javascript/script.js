var api_Key = "de3eea8f17c1c1fc772302f0de5232c3";
var cityNameHtml = $("#cityName");
var cityIcon = $("#cityIcon");
var oneDayTemp = $("#temp");
var oneDayHumidity = $("#humidity");
var oneDayWindSpeend = $("#windspeed");
var oneDayUV = $("#UV-Index");

var getWeather = function(cityName) {

    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + api_Key + "&units=imperial";

    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            var latitude = Math.round(data.coord.lat);
            var longitude = Math.round(data.coord.lon);
            console.log("lat: " + latitude + " Long: " + longitude)
            fiveDayForecast(data);
            dailyForecast(data);
        })} else {
          alert("Error: " + response.statusText);
        })
      .catch(function(error) {
        alert("Unable to connect to OpenWeather");
      });

};

var dailyForecast = function(data) {
  var cityName = data.name;
  var weatherIcon = data.weather[0].icon
  var currentDate = new Date(data.dt * 1000);
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var dayTemp = Math.round(data.main.temp);
  var dayWind = Math.round(data.wind.speed);
  var dayHumidity = Math.round(data.main.humidity);
  oneDayTemp.html("Temperature: " + dayTemp + " </br></br> Humidity: " + dayHumidity + " </br></br> Wind Speed: " + dayWind)
  cityIcon.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
  cityIcon.attr("alt", data.weather[0].description);
  cityNameHtml.html(cityName + " (" + month + "/" + day + "/" + year + ") ");
    // City name + Date
    // temp, wind, humidity, uv index
}

var fiveDayForecast = function(data) {
  var fiveDayTemp = Math.round(data.main.temp);
  var fiveDayWind = Math.round(data.wind.speed);
  var fiveDayHumidity = Math.round(data.main.humidity);
    for (var i = 0; i < 5; i++) {
    $("#cardHolder").append("<div class='bg-primary col-2 mx-2' id=fiveCards><h3>Date</h3> </br> <p>Temp: " + fiveDayTemp + "F</p> </br> <p>Wind:"  + fiveDayWind +"mph </p> </br><p>Humidity: " + fiveDayHumidity + "%</p> </br>")
};
    // Temp, wind, and humidity
}

$(".btn").on("click",  function() {
    var cityName = $("#citySearch").val();
    getWeather(cityName)
});