window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

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
      const meteobluebase = 'https://www.meteoblue.com/en/weather/api/show/apikey/d9edb6a08987&lat=41.3888&lon=2.159&asl=15';
      const apidark = `${proxy}https://api.darksky.net/forecast/b9dd7cda13788fa81e8c8062c4aedc28/${lat},${long}`;

      fetch(apidark)
        .then(data =>{
          return data.json();
        })
        .then(data => {
            const {temperature,summary,icon} = data.currently;
            // Set DOM Elements from the API
            temperatureDegree.textContent = Math.floor(temperature);
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;
            setIcons(icon, document.querySelector('.icon'));
            //Formula for celsius
            let celsius=(temperature-32)*(5/9)
            //Change temperature to celsius/farenheit
            temperatureSection.addEventListener('click',()=>{
              if (temperatureSpan.textContent == "F") {
                temperatureSpan.textContent="C";
                temperatureDegree.textContent=Math.floor(celsius);


              }else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent= Math.floor(temperature);

              }
            })

        });


    });

  }else {
    h1.textContent="hey this doesn't work"
  }
  function setIcons(icon,iconID) {
    const skycons = new Skycons({color:'white'});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID,Skycons[currentIcon]);

  }
} )
