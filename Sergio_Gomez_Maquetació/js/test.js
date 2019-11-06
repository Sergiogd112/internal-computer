
let mode = 'c';

function load() {
  var tempgraph = document.getElementById('tempg');
  let long;
  let lat;
  let temperatureDegree = document.getElementById('tval');
  let locationTimezone = document.getElementById('timezone');
  let mode = 'c';

  var d = new Date();
  var h = d.getHours();
  var hours = [];
  console.log(hours);
  console.log(h);
  var i = 0;
  while (i < 24) {
    hours[i] = ((h + i) % 24) + ':00';
    i = i + 1
  }
  console.log(hours);
  console.log(temperatureDegree);
  const proxy = `http://cors-anywhere.herokuapp.com/`;
  fetch('https://www.meteoblue.com/en/server/search/query3?query=basel').then(locdata => {
    return locdata.json();
  }).then(locdata => {
    console.log(locdata);
  })


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const meteobluebase = `https://www.meteoblue.com/en/weather/api/show/apikey/d9edb6a08987&lat=${lat}&lon=${long}&asl=15`;
      const apidark = `${proxy}https://api.darksky.net/forecast/b9dd7cda13788fa81e8c8062c4aedc28/${lat},${long}`;
      console.log('in')
      console.log(lat, long);
      document.getElementById('longitude').innerHTML = "Longitude: " + (Math.round(long * 100) / 100);
      document.getElementById('latitude').innerHTML = "Latitude: " + Math.round(lat * 100) / 100;
      fetch(apidark)
        .then(data => {
          return data.json();
        })
        .then(data => {
          console.log(data);
          const {
            temperature,
            humidity,
            summary,
            icon
          } = data.currently;
          let celsius = (temperature - 32) * (5 / 9);
          const hourly = data.hourly.data;
          console.log(hourly);
          let forecast = [];
          console.log('in');
          console.log(hourly[0]);
          let hour = 0;
          let temp = [];
          let precp = [];
          console.log(data.timezone);
          locationTimezone.innerHTML = data.timezone;
          //--------------------------------------------------------
          for (i of hourly) {
            temp[hour] = i.temperature;
            precp[hour] = i.precipProbability;
            if (hour > 24) {
              break
            }
            hour += 1;
          }
          console.log(temp);
          //display the forecast
          var trace1 = {
            x: hours,
            y: temp,
            line: {
              color: 'rgb(219, 64, 82)',
              width: 3
            },
            margin: 0
          };
          var layout = {
            margin: {
              l: 50,
              r: 50,
              b: 50,
              t: 50,
              pad: 4
            }
          };
          var trace2 = {
            x: hours,
            y: precp,
            type: 'scatter'
          };

          var data = [trace1];
          tempgraph.innerHTML = '';
          Plotly.newPlot('tempg', [trace1], layout);
          tempgraph.addEventListener('click', () => {
            if (true) {

            } else {

            }
          });
          // Set DOM Elements from the API
          temperatureDegree.innerHTML = Math.floor(celsius) + 'ºC';
          //setIcons(data.currently.icon, document.querySelector('.icon'));

          //Formula for celsius
          //Change temperature to celsius/farenheit
          temperatureDegree.addEventListener('click', () => {
            mode=changetmode(mode,celsius,temperature);
          })

        });


    });

  } else {
    h1.textContent = "hey this doesn't work"
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({
      color: 'black'
    });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);

  }
}

function changetmode(mode, data,celsius,temperature) {
  var tempgraph = document.getElementById('tempg');
  let long;
  let lat;
  let temperatureDegree = document.getElementById('tval');
  if (mode == "f") {
    temperatureDegree.innerHTML = Math.floor(celsius) + 'ºC';
    for (i = 0; i < 24; i++) {
      console.log((data[i] - 32) * (5 / 9););
    }
    return 'c';


  } else {
    temperatureDegree.innerHTML = Math.floor(temperature) + 'ºF';
    return'f';

  }

}
