var api_Key = "de3eea8f17c1c1fc772302f0de5232c3";
var cityNameHtml = $("#cityName");
var cityIcon = $("#cityIcon");
var oneDayTemp = $("#temp");
var oneDayHumidity = $("#humidity");
var oneDayWindSpeend = $("#windspeed");
var oneDayUV = $("#UV-Index");
var recentBox = $("#recentSearches");
var recentArr = [];


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
  var longitude = Math.round(data.coord.lon);
  console.log(longitude);
  var latitude = Math.round(data.coord.lat);
  var cityName = data.name;
  var weatherIcon = data.weather[0].icon
  var currentDate = new Date(data.dt * 1000);
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var dayTemp = Math.round(data.main.temp) + "°F";
  var dayWind = Math.round(data.wind.speed) + " MPH";
  var dayHumidity = Math.round(data.main.humidity) + "%";
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
  var UVURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "&appid=" + api_Key + "&cnt=1";
  // format the github api url

  // make a get request to url
  fetch(UVURL)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          var UV_Index = $("span");
          if (data[0].value < 2 ) {
            UV_Index.attr("class", "badge badge-success");
        }
        else if (data[0].value < 5) {
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
  let fiveDayApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&exclude=hourly,minutely&lon=" + long + "&appid=" + api_Key + "&cnt=5&units=imperial";
  fetch(fiveDayApi)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        fiveDayForecast(data);
    })} else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
  alert("Unable to connect to OpenWeather");
})};

var fiveDayForecast = function(data) {
    for (var i = 0; i < 5; i++) {
    var fiveDayDate = (new Date(data.daily[i].dt * 1000))
    var fiveDayTemp = Math.round(data.daily[i].feels_like.day) + "°F";
    var fiveDayDay = fiveDayDate.getDate();
    var fiveDayMonth = fiveDayDate.getMonth() + 1;
    var fiveDayYear = fiveDayDate.getFullYear();
    var fiveDayIcon = data.daily[i].weather[0].icon;
    var fiveDayIconDescription = data.daily[i].weather[0].description;
    var fiveDayWindSpeed = data.daily[i].wind_speed + " MPH";
    var fiveDayHumidity = data.daily[i].humidity + "%";
    $("#cardHolder").append(
      "<div class='bg-secondary col-2 col-md-2 mx-2' id=fiveCards> <h3>"
       + fiveDayMonth +
        "/"
         + fiveDayDay + 
         "/" 
         + fiveDayYear +
       "</h3> <img id="
        + fiveDayIcon + 
        " alt="
        + fiveDayIconDescription + 
        " src=https://openweathermap.org/img/wn/" + fiveDayIcon +
         "@2x.png> </br> <p>Temp: "
        + fiveDayTemp +
         "</p> </br> <p>Wind: "
         + fiveDayWindSpeed +
         "</p> </br><p>Humidity: "
          + fiveDayHumidity +
           "</p> </br>")
  };
};

var recentSearches = function() {
  recentBox.html("");
  if (!recentArr){
    recentArr = [];
  }
  for (let i = 0; i < recentArr.length; i++) {
    var recentCity = $("<input class=mt-1></input>");
    recentCity.attr("type", "text");
    recentCity.attr("readonly", true);
    recentCity.attr("class", "bg-secondary rounded text-white");
    recentCity.attr("style", "text-align: center")
    recentCity.attr("id", "searches")
    recentCity.val(recentArr[i]);
    recentCity.on("click", function() {
      let recentValue = $(this).val();
      fiveDayRemove();
      getWeather(recentValue);
    })
    recentBox.append(recentCity);
    }
};

var fiveDayRemove = function() {
  for (let i = 0; i < 5; i++) {
    $("#fiveCards").remove();
  }
};


$(".btn").on("click",  function() {
  fiveDayRemove();
  var cityName = $("#citySearch").val();
  recentArr.push(cityName);
  getWeather(cityName);
  // recentSearches(cityName);
  localStorage.setItem("search", JSON.stringify(recentArr));
  loadSearches();
});

$(".bg-danger").on("click", function() {
  recentArr.forEach(element => $("#searches").remove());
  recentArr = [];
  localStorage.setItem("search", JSON.stringify(recentArr));
})

var loadSearches = function() {
  let loadedSearches = JSON.parse(localStorage.getItem("search"));
  recentArr = loadedSearches;
  recentSearches();
}
loadSearches();