function load() {
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter'
  };

  var trace2 = {
    x: [1, 2, 3, 4],
    y: [16, 5, 11, 9],
    type: 'scatter'
  };

  var data = [trace1, trace2];

  Plotly.newPlot('tempg', data);
  
  let long;
  let lat;
  let temperatureDegree = document.getElementById('tval');
  let locationTimezone = document.getElementById('timezone');
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
      console.log(lat,long);
      document.getElementById('longitude').innerHTML=long;
      document.getElementById('latitude').innerHTML=lat;
      fetch(apidark)
        .then(data =>{
          return data.json();
        })
        .then(data => {
            console.log(data);
            const {temperature,humidity,summary,icon} = data.currently;
            let celsius=(temperature-32)*(5/9);

            // Set DOM Elements from the API
            temperatureDegree.innerHTML = Math.floor(celsius)+'ºC';
            locationTimezone.innerHTML = data.timezone;
            setIcons(data.currently.icon, document.querySelector('.icon'));
            
            //Formula for celsius
            //Change temperature to celsius/farenheit
            temperatureDegree.addEventListener('click',()=>{
              if (temperatureDegree.innerHTML[temperatureDegree.innerHTML.length-1] == "F") {
                temperatureDegree.innerHTML=Math.floor(celsius)+'ºC';


              }else {
                temperatureDegree.innerHTML= Math.floor(temperature)+'F';

              }
            })

        });


    });

  }else {
    h1.textContent="hey this doesn't work"
  }
  function setIcons(icon,iconID) {
    const skycons = new Skycons({color:'black'});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID,Skycons[currentIcon]);

  }
}
