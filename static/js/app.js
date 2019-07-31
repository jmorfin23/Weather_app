// all imports should be at the top, imort config to access the api KEY
import Config from '../../config.js';


let config = new Config();

const API_KEY = config.getKey();


//create callback function that inserts the response into the nav div


function loadNavbar(response) {
  $('header').html(response);
}

//use the .get() method to call the header.hmtl component
$.get('./components/header.html', loadNavbar);


//create a function for the form when submitted
$('#submit-btn').click(function(e) {
  e.preventDefault();
  let city = $('#city_search').val();

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`;

  //USE JQUERY to send a call for the current weather data
  $.get(url, function(response) {
    console.log(response);

    $('#city_name').text(`${response.name}, ${response.sys.country}`);

    $('#high').text(`${response.main.temp_max.toFixed(0)}&#8457;`);
    $('#low').text(`${response.main.temp_min.toFixed(0)}&#8457;`);
    $('#forecast').text(`${response.weather[0].main}&#8457;`);
    $('#low').text(`${response.main.humidity.toFixed(0)}%`);
  });

    $('#weather-info').css('display', 'block');
});

// hide the weather-info section immediately on loadNavbar
