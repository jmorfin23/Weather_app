// all imports should be at the top, imort config to access the api KEY
import Config from '../../config.js';


let config = new Config();

const API_KEY = config.getKey();


//create callback function that inserts the response into the nav div


function loadNavbar(response) {
  $('header').html(response);
}

// use the .get() method to call the header.hmtl component
$.get('./components/header.html', loadNavbar);

//trying to get navbar in animals.html
// $.get('./header.html', loadNavbar);

// create a function for the form when submitted
$('#submit-btn').click(function(e) {
  e.preventDefault();
  let city = $('#city_search').val();

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`;

  //USE JQUERY to send a call for the current weather data
  $.get(url, function(response) {
    console.log(response);

    $('#city_name').text(`${response.name}, ${response.sys.country}`);

    $('#high').html(`${response.main.temp_max.toFixed(0)}&#8457;`);
    $('#low').html(`${response.main.temp_min.toFixed(0)}&#8457;`);
    $('#forecast').text(`${response.weather[0].main}`);
    $('#humidity').text(`${response.main.humidity.toFixed(0)}%`);
  });

    $('#weather-info').css('display', 'block');
});

// hide the weather-info section immediately on loadNavbar

$('#weather-info').css('display', 'none');

//sending request to json page for homework
let url1 = `https://learnwebcode.github.io/json-example/animals-1.json`;

// table doesnt look pretty but did it. 
//starting table for thead
$.get(url1, function(resp) {
  console.log(resp);
  let n = ``
  let l = `<tr><th>#</th>`
  n += `<th>`
  let head = Object.keys(resp[1])
  //iterating through names, species foods
  for (let i in head) {
    n += head[i]
    n+= `</th>`
    if (i != 2) {
      n+= `<th>`
    }
  }
  n += `</tr>`
  l+=n
  $('#head').html(`${l}`);
  //body for table
  l = `<tr>`
  n = ``
  let body = Object.keys(resp) //this gets numbers
  for (let i in body) {
    l += `<td>`
    l +=body[i]
    l += `</td>`
    l += `<td>`
      for (let z in resp[i]) {
        if (typeof(resp[i][z]) == 'object') {
          let keys = Object.keys(resp[i][z]);
          for (let j in keys) {
            l += keys[j]
            l+= `: `
            let u = resp[i][z][keys[j]]
              for (let v in u) {
                if (keys[j] == 'dislikes') {
                  l += u[v]
                  l+= `,`
                } else {
                  l += u[v]
                  l+= `,`
                }
                if (u.length-1 == v) {
                  l+= '<br>'
                }
              }
          }
          l += `</td>`
      } else {
        l += resp[i][z]
        l += `</td>`
        l += `<td>`
      }
    }
    l += `</tr>`
  }
    console.log(l );
    $('#body').html(`${l}`)
});
