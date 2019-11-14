function load() {
  let q = 10;
  var tempgraph = document.getElementById('tempg');
  let long;
  let lat;
  let temperatureDegree = document.getElementById('tval');
  let locationTimezone = document.getElementById('timezone');
  let summarydiv = document.getElementById('summary');
  let oval = document.getElementById('oval');
  let hval = document.getElementById('hval');
  let pval = document.getElementById('pval')
  let mode = 'f';
  let t;
  var d = new Date();
  var h = d.getHours();
  var hours = [];
  var i = 0;
  while (i < 24) {
    hours[i] = ((h + i) % 24) + ':00';
    i = i + 1
  }
  console.log(hours);
  console.log(temperatureDegree);
  const proxy2 = 'https://corsproxy.github.io/';
  const proxy = `https://cors-anywhere.herokuapp.com/`;
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
      sendloc(Math.round(lat * 100) / 100, Math.round(long * 100) / 100)
      document.getElementById('longitude').innerHTML = "Longitude: " + (Math.round(long * 100) / 100);
      document.getElementById('latitude').innerHTML = "Latitude: " + Math.round(lat * 100) / 100;
      header = new Headers();

      fetch(apidark, {
          header: header
        })
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
            pressure,
            visibility,
            windGust,
            windSpeed,
            precipProbability
          } = data.currently;
          t = temperature;
          q = getq(windGust, windSpeed, cloudCover, precipProbability, visibility);
          setq(q);
          summarydiv.innerHTML = summary;
          oval.innerHTML = (cloudCover * 100) + '%';
          hval.innerHTML = Math.floor(humidity * 1000) / 10 + '%';
          pval.innerHTML = pressure + ' hPa'
          let celsius = (temperature - 32) * (5 / 9);
          const hourly = data.hourly.data;
          let forecast = [];
          let hour = 0;
          let temp = [];
          let precp = [];
          let qs = [];
          locationTimezone.innerHTML = 'Timezone: '+data.timezone;
          //--------------------------------------------------------
          for (i of hourly) {
            temp[hour] = i.temperature;
            precp[hour] = i.precipProbability * 100;
            qs[hour] = getq(i.windGust, i.windSpeed, i.cloudCover, i.precipProbability, i.visibility) * 10;
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

          console.log(qs);
          var pdata = {
            x: hours,
            y: precp,
            line: {
              color: '#1E90FF',
              width: 3
            },
            textfont: {
              family: 'sans serif',
              size: 18,
              color: 'rgb(100, 153, 255)'
            }
          };
          var layout = {
            title: 'Rain forecast',

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
              range: [0, 100]
            },
            fig_bgcolor: "rgb(255, 255, 255)",
            plot_bgcolor: "rgba(0, 0, 0, 0)",
            paper_bgcolor: "rgba(0, 0, 0, 0)"
          };
          document.getElementById('raing').innerHTML = '';
          Plotly.newPlot('raing', [pdata], layout);
          var qdata = {
            x: hours,
            y: qs,
            line: {
              color: '#4CAF50',
              width: 3
            },
            textfont: {
              family: 'sans serif',
              size: 18,
              color: 'rgb(100, 153, 255)'
            }
          };
          var layout = {
            title: 'Quality of the sky for astronomical observation forecast',

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
              range: [0, 100]
            },
            fig_bgcolor: "rgb(255, 255, 255)",
            plot_bgcolor: "rgba(0, 0, 0, 0)",
            paper_bgcolor: "rgba(0, 0, 0, 0)"
          };
          document.getElementById('quality').innerHTML = '';
          Plotly.newPlot('quality', [qdata], layout);




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

    tempgraph.innerHTML = '';

    if (mode == "f") {
      temperatureDegree.innerHTML = Math.floor(celsius) + 'ºC';
      var trace1 = {
        x: hours,
        y: datac,
        line: {
          color: 'rgb(219, 64, 82)',
          width: 3
        },
        textfont: {
          family: 'sans serif',
          size: 18,
          color: 'rgb(100, 153, 255)'
        }
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

        },
        fig_bgcolor: "rgb(255, 255, 255)",
        plot_bgcolor: "rgba(0, 0, 0, 0)",
        paper_bgcolor: "rgba(0, 0, 0, 0)"
      };

      Plotly.newPlot('tempg', [trace1], layout);
      return 'c';
    } else {
      temperatureDegree.innerHTML = Math.floor(temperature) + 'ºF';
      var trace1 = {
        x: hours,
        y: data,
        line: {
          color: 'rgb(219, 64, 82)',
          width: 3
        },
        textfont: {
          family: 'sans serif',
          size: 18,
          color: 'rgb(100, 153, 255)'
        }
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
        },
        fig_bgcolor: "rgb(255, 255, 255)",
        plot_bgcolor: "rgba(0, 0, 0, 0)",
        paper_bgcolor: "rgba(0, 0, 0, 0)"
      };
      Plotly.newPlot('tempg', [trace1], layout);
      return 'f';

    }

  }

}

function getq(ws, wg, cc, pp, vb) {
  ws *= 1.60934;
  wg *= 1.60934;
  vb *= 1.60934;
  qw = 1 - 30 / (ws + wg);
  qc = 1 - cc / 0.5;
  qp = 1 - pp / 0.5;
  qv = (1 - 1 / vb);
  q = (Math.pow(qw, 2) * qp * qv * Math.pow(qc, 4))
  if (q < 0) {
    q = 0;
  }
  qg = Math.pow(q, 1 / 8);
  qg2 = Math.floor(qg * 100) / 10;
  if (qg2 > 10) {
    qg2 = 10;
  } else if (qg2 < 0) {
    qg2 = 0;
  }
  return qg2;
}

function setq(q) {
  console.log(q);
  var elem = document.getElementById("myBar");
  elem.style.width = q * 10 + '%';
  console.log(q);
  elem.innerHTML = q * 10 + '%';

}

function sendloc(lat, lon) {
  console.log('inf');
  data = {
    lat: lat,
    lon: lon
  };
  data = JSON.stringify(data);
  console.log(data);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log('in');
    if (this.readyState == 4 && this.status == 200) {
      var resp = this.responseText;
      console.log(resp);
      if (resp[0] == '1') {
        // Simulate a mouse click:
        console.log('sended');
      } else {
        console.log('nothing')
        console.log(resp);

      }
    }
  }

  xhttp.open("POST", "backend/city.php", true);
  xhttp.send(data);
}
