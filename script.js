var APIKey = "d389e89705c7dbbceb75857a1482546f";
var city= $("#city-input").val();
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// selected element variables
var searchBtn= $(".searchBtn");
var currentDate= $(".current-date");
var weatherIcon= $(".weather-icon");
var localStorage= $(".local-storage");
var temps= $(".temperature");
var windSpeed= $(".windSpeed");
var uvIndex= $(".uvIndex");
var cardRow= $(".card-row");

//make a current date
var today= new Date();
let dd = String(today.getDate()).padStart(2,"0");
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
var today = mm + '/' + dd + '/' + yyyy;
document.write(today);
//put the search history into local storage


//click button event


//function to pull weather data


//function for city search


//Get five day forecast


//creating forecast on page




