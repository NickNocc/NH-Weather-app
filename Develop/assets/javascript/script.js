var api_Key = "de3eea8f17c1c1fc772302f0de5232c3";
var cityNameHtml = $("#cityName");
var cityIcon = $("#cityIcon");
var oneDayTemp = $("#temp");
var oneDayHumidity = $("#humidity");
var oneDayWindSpeend = $("#windspeed");
var oneDayUV = $("#UV-Index");
var cityNameMaster = "";


var getWeather = function(cityName) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + api_Key + "&units=imperial";

    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            dailyForecast(data);
          })} else {
          alert("Error: " + response.statusText);
        }
})
.catch(function(error) {
  alert("Unable to connect to OpenWeather");
})};



var dailyForecast = function(data) {
  var currentCity = data.name;
  var longitude = Math.round(data.coord.lon);
  var latitude = Math.round(data.coord.lat);
  var cityName = data.name;
  var weatherIcon = data.weather[0].icon
  var currentDate = new Date(data.dt * 1000);
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var dayTemp = Math.round(data.main.temp);
  var dayWind = Math.round(data.wind.speed);
  var dayHumidity = Math.round(data.main.humidity);
  oneDayTemp.html("Temperature: " + dayTemp + " </br></br> Humidity: " + dayHumidity + " </br></br> Wind Speed: " + dayWind + "</br>")
  cityIcon.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
  cityIcon.attr("alt", data.weather[0].description);
  cityNameHtml.html(cityName + " (" + month + "/" + day + "/" + year + ") ");
    // City name + Date
    // temp, wind, humidity, uv index
  getUV(latitude, longitude);
  fiveDayRequest(latitude, longitude);
}

var getUV = function(lat, long) {

  // format the github api url
  var UVURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "&appid=" + api_Key + "&cnt=1";

  // make a get request to url
  fetch(UVURL)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          var UV_Index = $("span");
          if (data[0].value < 4 ) {
            UV_Index.attr("class", "badge badge-success");
        }
        else if (data[0].value < 8) {
            UV_Index.attr("class", "badge badge-warning");
        }
        else {
            UV_Index.attr("class", "badge badge-danger");
        }
        UV_Index = data[0].value;
        oneDayUV.html("UV Index: " + UV_Index)
      })} else {
        alert("Error: " + response.statusText);
      }
})
.catch(function(error) {
alert("Unable to connect to OpenWeather");
})};

var fiveDayRequest = function(lat, long) {
  let fiveDayApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&exclude=hourly,minutely&lon=" + long + "&appid=" + api_Key;
  console.log("tyest")
  fetch(fiveDayApi)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        for (var i = 0; i < 5; i++) {
        }

    })} else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
  alert("Unable to connect to OpenWeather");
})};

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
    getWeather(cityName);
});