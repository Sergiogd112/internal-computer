fetch("https://location.services.mozilla.com/v1/geolocate?key=test").then(poss=>{
  return poss.json()
}).then(poss=>{
  console.log(poss.location)
});
