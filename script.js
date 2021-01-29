// selected element variables
var apiKey= "d389e89705c7dbbceb75857a1482546f";
var cityInput= $("#city-input");
var cityName= $(".city-name")
var searchBtn= $(".searchBtn");
var currentDate= $(".current-date");
var weatherIcon= $(".weather-icon");
var saveStorage= $(".save-storage");
var temps= $(".temperature");
var humidity= $(".humidity");
var windSpeed= $(".windSpeed");
var uvIndex= $(".uvIndex");
var cardRow= $(".card-row");

//make a current date
var today= new Date();
let dd = String(today.getDate()).padStart(2,"0");
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
var today = mm + '/' + dd + '/' + yyyy;

//put the search history into local storage
if(JSON.parse(localStorage.getItem("save-storage")) == null){
 console.log("savedStorage not found")
}
else{
    console.log("savedStorage loaded into storageArr");
    getsaveStorage();
}

//Get the local storage data, goes through for loop and adds new city to list with class of savedEntry this gets emptied.
function getsaveStorage(cityName){
    saveStorage.empty();
    let storageArr=JSON.parse(localStorage.getItem("save-storage"));
    for (let i= 0; i < storageArr.length; i++){
        let newCityItem=$("<li>").attr("class", "savedEntry");
        newCityItem.text(storageArr[i]);
        saveStorage.prepend(newCityItem);
    }
}


//click button event
searchBtn.on("click", function(s){
    s.preventDefault();
    if (cityInput.val() === "") {
        alert("You must enter a City");
        return;
    }
    console.log("clicked button")
    getWeather(cityInput.val());
});
$(document).on("click", ".storageEntry", function(){
    console.log("clicked saved storage entry")
    let thisElement =$(this);
    getWeather(thisElement.text());
});

//function to pull weather data
function pullWeather(cityName, cityTemp,cityHumidity, cityWindSpeed, cityWeatherIcon,uvValu){
    nameCity.text(cityName);
    currentDate.text(`(${today}`);
    temps.text(`Temperature:${cityTemp}\u00B0 F`);
    humidity.text(`Humidity: ${cityHumidity}%`);
    windSpeed.text(`Wind Speed: ${cityWindSpeed} MPH`);
    uvIndex.text(`UV Index: ${uvValu}`);
    weatherIcon.attr("src", cityWeatherIcon);
}

//get weather data
function getWeather (desiredCity){
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&appid=${apiKey}`;
$.ajax({
    url: queryURL,
    method:"GET"
})
.then(function(weatherData){
    let cityObj={
        cityName: weatherData.name,
        cityTemp: weatherData.main.temp,
        cityHumidity: weatherData.main.humidity,
        cityWindSpeed: weatherData.wind.speed,
        cityUVIndex: weatherData.coord,
        cityWeatherIconName: weatherData.weather[0].icon
    }
    let queryURL= `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&appid=${apiKey}`
$.ajax({
    url:queryURL,
    method:"GET"
})
.then(function(uvData){
    if(JSON.parse(localStorage.getItem("save-storage")) == null){
        let storageArr= [];
        if (storageArr.indexOf(cityObj.cityName) === -1){
            storageArr.push(cityObj.cityName);
            localStorage.setItem("save-storage", JSON.stringify(storageArr));
            let generatedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
            getWeather(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, generatedWeatherIcon, uvData.vaule);
            getsaveStorage(cityObj.cityName);
        }
        else{
            console.log("City already in saveStorage. Unable to add to saved list.")
            let generatedWeatherIcon= `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
            getWeather(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, generatedWeatherIcon, uvData.value);
        }}

     else {
            let storageArr =JSON.parse(localStorage.getItem("save-storage"));
            if (storageArr.indexOf(cityObj.cityName) === -1){
                storageArr.push(cityObj.cityName);
                localStorage.setItem("save-storage", JSON.stringify(storageArr));
                let generatedWeatherIcon= `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                getWeather(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, generatedWeatherIcon, uvData.value);
                getsaveStorage(cityObj.cityName);
            }
            else{
                console.log("City already in save-storage. Unable to add to saved list.")
                let generatedWeatherIcon= `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                getWeather(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed,generatedWeatherIcon, uvData.value);
            }
        }
    })
});

//Get five day forecast

getFiveDayForecast();

function getFiveDayForecast() {
    cardRow.empty();
    let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${desiredCity}&appid=${apiKey}`;
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(fiveDayReponse) {
        for (let i = 0; i != fiveDayReponse.list.length; i += 8 ) {
            let cityObj = {
                date: fiveDayReponse.list[i].dt_txt,
                icon: fiveDayReponse.list[i].weather[0].icon,
                temp: fiveDayReponse.list[i].main.temp,
                humidity: fiveDayReponse.list[i].main.humidity
            }
            let dateStr = cityObj.date;
            let trimmedDate = dateStr.substring(0, 10); 
            let weatherIco = `https:///openweathermap.org/img/w/${cityObj.icon}.png`;
            createForecastCard(trimmedDate, weatherIco, cityObj.temp, cityObj.humidity);
        }
    })
}   



//creating forecast on page
function createForecastCard(date, icon, temp, humidity) {

    // HTML elements we will create to later
    let fiveDayCardEl = $("<div>").attr("class", "five-day-card");
    let cardDate = $("<h3>").attr("class", "card-text");
    let cardIcon = $("<img>").attr("class", "weatherIcon");
    let cardTemp = $("<p>").attr("class", "card-text");
    let cardHumidity = $("<p>").attr("class", "card-text");

    cardRow.append(fiveDayCardEl);
    cardDate.text(date);
    cardIcon.attr("src", icon);
    cardTemp.text(`Temp: ${temp} \u00B0`);
    cardHumidity.text(`Humidity: ${humidity}%`);
    fiveDayCardEl.append(cardDate, cardIcon, cardTemp, cardHumidity);
}
}
