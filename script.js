var APIKey = "d389e89705c7dbbceb75857a1482546f";
var city= $("#city-input").val();
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


$("#submit")
$.ajax({
    url: queryUrl,
    method: 'GET'
})
.then(function(response) {
    var data= response.main
    console.log(data);
});
