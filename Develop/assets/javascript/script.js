var api_Key = "de3eea8f17c1c1fc772302f0de5232c3";
var api_Id = "Challenge-6"



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
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to OpenWeather");
      });
};

$(".btn").on("click",  function() {
    var cityName = $("#citySearch").val();
    getWeather(cityName)
});

