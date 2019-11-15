// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Subscriber Mapping Visualization
// https://youtu.be/Ae73YY_GAU8


const mappa = new Mappa('Leaflet');
let trainMap;
let canvas;

let loc;
const options = {
  lat: 0,
  lng: 0,
  zoom: 3.2,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup() {
  fetch('backend/map.php').then(data => {
    return data.json();
  })
  .then(data => {
  canvas = createCanvas(screen.width, screen.height);
  trainMap = mappa.tileMap(options);
  trainMap.overlay(canvas);
  loc=data;
  let maxSubs = 0;
  let minSubs = Infinity;
  for (row in data) {
    count = data[row].count;
    if (count > maxSubs) {
      maxSubs = count;
    }
    if (count < minSubs) {
      minSubs = count;
    }
  }


  let minD = sqrt(minSubs);
  let maxD = sqrt(maxSubs);
  for (d in data) {
    data[d].diameter = map(sqrt(data[d].count), minD, maxD, 1, 15);
  }

  //console.log(data);



  // console.log(countries);
  //console.log(youtubeData);
});
}

function draw() {
  clear();
  for (country in loc) {
    const pix = trainMap.latLngToPixel(loc[country].lat/10.0, loc[country].lon/10.0);
    fill(255, 0, 200, 100);
    const zoom = trainMap.zoom();
    const scl = pow(2, zoom); // * sin(frameCount * 0.1);
    ellipse(pix.x, pix.y, loc[country].diameter * scl);
  }



}
