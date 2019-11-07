function load() {
  var tempgraph = document.getElementById('tempg');
  let long;
  let lat;
  let temperatureDegree = document.getElementById('tval');
  let locationTimezone = document.getElementById('timezone');
  let summarydiv = document.getElementById('summary');
  let oval = document.getElementById('oval');
  let hval = document.getElementById('hval');
  let pval=document.getElementById('pval')
  let mode = 'f';
  let t;
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
            icon,
            cloudCover,
            pressure
          } = data.currently;
          t = temperature;
          summarydiv.innerHTML = summary;
          oval.innerHTML = (cloudCover * 100) + '%';
          hval.innerHTML = (humidity * 100) + '%';
          pval.innerHTML=pressure+' hPa'
          let celsius = (temperature - 32) * (5 / 9);
          const hourly = data.hourly.data;
          let forecast = [];
          let hour = 0;
          let temp = [];
          let precp = [];
          locationTimezone.innerHTML = data.timezone;
          //--------------------------------------------------------
          for (i of hourly) {
            temp[hour] = i.temperature;
            precp[hour] = i.precipProbability*100;
            if (hour > 24) {
              break
            }
            hour += 1;
          }
          tempc = [];
          for (i = 0; i < 24; i++) {
            tempc[i] = Math.floor((temp[i] - 32) * (5 / 9) * 10) / 10;
            temp[i] = Math.floor(temp[i] * 10) / 10
          }


          var trace1 = {
            x: hours,
            y: precp,
            line: {
              color: '#1E90FF',
              width: 3
            },
          };
          var layout = {
            title:'Rain forecast',

            margin: {
              l: 50,
              r: 50,
              b: 50,
              t: 50,
              pad: 4
            },
            yaxis: {
              ticksuffix: '%',
              autotick: false,
              ticks: 'outside',
              tick0: 0,
              dtick: 10,
              ticklen: 8,
              tickwidth: 4,
              tickcolor: '#000',
              range:[0,100]
            }
          };
          document.getElementById('raing').innerHTML='';
          Plotly.newPlot('raing', [trace1], layout);





          //display the forecast
          console.log(mode, temp, tempc, celsius, t);
          mode = changetmode(mode, temp, tempc, celsius, t);
          // Set DOM Elements from the API
          //setIcons(data.currently.icon, document.querySelector('.icon'));

          //Formula for celsius
          //Change temperature to celsius/farenheit
          temperatureDegree.addEventListener('click', () => {
            mode = changetmode(mode, temp, tempc, celsius, t);
          })
          tempgraph.addEventListener('click', () => {
            mode = changetmode(mode, temp, tempc, celsius, t);
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

  function changetmode(mode, data, datac, celsius, temperature) {
    console.log(mode, data, datac, celsius, temperature);

    tempgraph.innerHTML = '';

    if (mode == "f") {
      temperatureDegree.innerHTML = Math.floor(celsius) + 'ºC';
      console.log(datac);
      var trace1 = {
        x: hours,
        y: datac,
        line: {
          color: 'rgb(219, 64, 82)',
          width: 3
        },
      };
      var layout = {
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
          pad: 4
        },
        yaxis: {
          ticksuffix: 'ºC',
          autotick: false,
          ticks: 'outside',
          tick0: 0,
          dtick: 2.5,
          ticklen: 8,
          tickwidth: 4,
          tickcolor: '#000',

        }
      };

      Plotly.newPlot('tempg', [trace1], layout);


      return 'c';


    } else {
      temperatureDegree.innerHTML = Math.floor(temperature) + 'ºF';
      console.log(mode, ':', data);
      var trace1 = {
        x: hours,
        y: data,
        line: {
          color: 'rgb(219, 64, 82)',
          width: 3
        },
        //        hoverinfo: ‘y+text’
      };
      var layout = {
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
          pad: 4
        },
        yaxis: {
          ticksuffix: 'ºF',
          autotick: false,
          ticks: 'outside',
          tick0: 0,
          dtick: 2.55,
          ticklen: 8,
          tickwidth: 4,
          tickcolor: '#000',
        }
      };
      Plotly.newPlot('tempg', [trace1], layout);
      return 'f';

    }

  }

}
