$(document).ready(function(){
  var cityKey = "c003cc4458b2813e2dda6cdbdeeb2c5c84569d4803165d0f5f516cd3ae158d28";
  var cityApi = "http://api.ipinfodb.com/v3/ip-city/?key=" + cityKey + "&format=json";
  $.getJSON(cityApi, getCity);
  $('#main').fadeTo(2000, 1);
  $('.btn').click(toggleTemp)
});

// sets #city = to the users current location **not exact**
var getCity = function(data){
  var city = data.cityName;
  var state = data.regionName;
  zip = data.zipCode;
  $('#city').text(city + ", " + state);
  
  // retrieve weather data
  var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?zip=";
  var zip = data.zipCode + "," + data.countryCode;
  var weatherKey = "&APPID=523af8b42c7084b89eb2e44ba3b9df79";
  var weather = weatherAPI + zip + weatherKey;
  $.getJSON(weather, getWeather);
};

var getWeather = function(forecast){
  var desc = forecast.weather[0]["description"];
  var temp = forecast.main.temp - 273.15;
  $('#temp').html(Math.floor(temp) + String.fromCharCode(176) + "C");
  $('#forecast').html(desc);
  setBackground();
};

function setBackground(){
  var weather = $('#forecast').text();
  var i = weather.indexOf('cloud');
  var j = weather.indexOf('rain');
  var k = weather.indexOf('sun');
  var l = weather.indexOf('snow');
  var m = weather.indexOf('storm');
  if (i != -1){
    $('body').css("background-image", "http://randomwallpapers.net/beautiful-green-field-in-the-cloudy-sky-nature-2560x1600-wallpaper340092.jpg'");
  }
  else if(j != -1){
    $('body').css("background-image", "url('https://i.ytimg.com/vi/n-9ZLWnFbOI/maxresdefault.jpg')");
    $('body').animate({ opacity: 1 }, { duration: 3000 });
  }
  else if(k != -1){
    $('body').css("background-image", "url('http://www.hdwallpapersact.com/wp-content/uploads/2013/04/clear-sky-view-wallpaper1.jpg')");
  }
  else if(l != -1){
    $('body').css("background-image", "url('https://i.ytimg.com/vi/kJGjueu-s0U/maxresdefault.jpg')");
  }
  else if(m != -1){
    $('body').css("background-image", "url('http://wallpapercave.com/wp/NuvIjjc.jpg')");
  }
  else{
    $('body').css("background-image", "url('http://ayay.co.uk/backgrounds/weather/clouds/blue-sea-horizon.jpg')");
  }
};

var toggleTemp = function(){
  var temp = parseInt($('#temp').html());
  var c = Math.round(temp * (9/5) + 32);
  var f = Math.round((temp - 32) * (5/9));
  if ($('.btn').text() == "Farenheit"){
    $('#temp').html(c + String.fromCharCode(176) + 'F');
    $('.btn').html("Celcius");
  }
  else{
    $('#temp').html(f + String.fromCharCode(176) + 'C');
    $('.btn').html("Farenheit");
  }
};