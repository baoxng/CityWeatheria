
var city= $("#city-input");
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d389e89705c7dbbceb75857a1482546f";

// selected element variables
var nameCity= $(".city-name")
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
if(JSON.parse(localStorage.getItem("saveStorage")) == null){
 console.log("localStorage not found")
}
else{
    console.log("localStorage loaded into storageArr");
    getSaveStorage();
}

//Get the local storage data, goes through for loop and adds new city to list with class of savedEntry this gets emptied.
function getsaveStorage(cityName){
    saveStorage.empty();
    let storageArr=JSON.parse(localStorage.getItem("saveStorage"));
    for (let i= 0; i < storageArr.length; i++){
        let newCityItem=$("<li>").attr("class", "savedEntry");
        newCityItem.text(storageArr[i]);
        saveStorage.prepend(newCityItem);
    }
}


//click button event
searchBtn.on("click", function(s){
    s.preventDefault();
    if (city.val() === "") {
        alert("You must enter a City");
        return;
    }
    console.log("clicked button")
    getWeather(city.val());
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
function getWeather (cityInput){
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
}
$.ajax({
    url:queryURL,
    method:"GET"
})
.then(function(weatherData){
    let cityObj={
        cityName: weatherData.name,
        cityTemp: weatherData.main.temp,
        cityHumidity: weatherData.wind.speed,
        cityUVIndex: weatherData.coord,
        cityWeatherIconName: weatherData.weather[0].icon
    }
    let queryURL= `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial`
$.ajax({
    url:queryURL,
    method:"GET"
})
.then(function(uvData){
    if(JSON.parse(localStorage.getItem("saveStorage")) == null){
        let saveStorageArr= [];
        if (saveStorageArr.indexOf(cityObj.cityName) === -1){
            saveStorageArr.push(cityObj.cityName);
            localStorage.setItem("saveStorage", JSON.stringify(saveStorageArr));
            let generatedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
            weatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, generatedWeatherIcon, uvData.vaule);
            weatherData(cityObj.cityName);
        }
        else{
            console.log("City already in saveStorage. Unable to add to saved list.")
            let generatedWeatherIcon= `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
            weatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, generatedWeatherIcon, uvData.value);
        }}
        else {
            let saveStorageArr =JSON.parse(localStorage.getItem("saveStorage"));
            if (saveStorageArr.indexOf(cityObj.cityName) === -1){
                saveStorageArr.push(cityObj.cityName);
                localStorage.setItem("saveStorage", JSON.stringify(saveStorageArr));
                let generatedWeatherIcon= `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                weatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, generatedWeatherIcon, uvData.value);
                getsaveStorage(cityObj.cityName);
            }
            else{
                console.log("City already in saveStorage. Unable to add to saved list.")
                let generatedWeatherIcon= `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                weatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed,generatedWeatherIcon, uvData.value);
            }
        }
    }
})
})


//function for city search


//Get five day forecast


//creating forecast on page




