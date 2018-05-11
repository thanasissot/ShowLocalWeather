let weather, temperature, location2, country, currentWeather, icon ;
$('#pointer').text(String.fromCharCode(176));
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  let crd = pos.coords;
  let xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        weather = JSON.parse(this.response);
        temperature = weather.main.temp;
        location2 = weather.name;
        country = weather.sys.country;
        currentWeather = weather.weather[0].main;
        icon = weather.weather[0].icon;
        $(document).ready(function(){
          $('#img').attr({src: icon});
          $('#city').text(location2);
          $('#country').text(country);
          $('#temperature').text(`${temperature}`);
          $('#currentWeather').html(`${currentWeather}, <img id="icon" src='${icon}' alt='The image goes here' class="mt-3">`);
          $('#icon').attr({src: icon});
        });
      }
    }
  xml.open('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${crd.latitude}&lon=${crd.longitude}`, true);
  xml.send();

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

  $('#change').on('click', () => {
    if(document.querySelector('#temperature').textContent == temperature){
      $('#temperature').text(( temperature * 9 / 5 )+ 32) ;
      $('#change').text('F');
    } else {
      $('#temperature').text(temperature);
      $('#change').text('C');
    }
  });

// $('#change').click(()=>alert('hello'))
