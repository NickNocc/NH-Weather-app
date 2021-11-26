var api_Key = "de3eea8f17c1c1fc772302f0de5232c3";

var getWeather = function(cityName) {

    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={" + cityName + "}&appid={" + api_Key + "}";
  
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            dailyForecast(data);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to OpenWeather");
      });

};

var dailyForecast = function(data) {
    // City name + Date
    // temp, wind, humidity, uv index
}

var fiveDayForecast = function() {
    // for the following 5 days I need
    var fiveDayTemp = "frick";
    var fiveDayHumidity = "frack";
    var fiveDayWind = "fruck";
    for (var i = 0; i < 5; i++) {
    $("#cardHolder").append("<div class='bg-primary col-2 mx-2'><h3>Date</h3> </br> <p>Temp: " + fiveDayTemp + "</p> </br> <p>Wind:"  + fiveDayWind +" </p> </br><p>Humidity: " + fiveDayHumidity + "</p> </br>")
};
    // Temp, wind, and humidity
}

$(".btn").on("click",  function() {
    var cityName = $("#citySearch").val();
    getWeather(cityName)
});

fiveDayForecast();

