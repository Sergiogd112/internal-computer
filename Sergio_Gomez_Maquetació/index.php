<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Astroweather</title>

  <link rel="stylesheet" href="css/main.css">


  <link rel="stylesheet" href="css/style.css">
  <!-- Plotly.js -->
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script src="js/skycons2.js" charset="utf-8"></script>
  <script src="js/test.js" charset="utf-8"></script>
</head>
<body onload="load()">
  <div class="topnav"w3-include-html="embeds/topnav.html">
</div>


  <div class="graph">
    <div id="tempg">
      Here goes the temperature graph
    </div>
    <div id="raing">
      Here goes the rain graph
    </div>
    <div id="quality">
      Here goes the quality graph
    </div>
  </div>
  <p id="longitude">40</p>
  <p id="latitude">-3</p>
  <div id="timezone">PAtata</div>
  <canvas class='icon' width="128" height="128"></canvas>
  <div class="temperature">Temperature</div>
  <div id="tval">25ºC</div>
  <div id="summary">
    It's OK
  </div>
  <div class="humidity">Humidity</div>
  <div class="pressure">Pressure</div>
  <div class="opacity">Cloud cover</div>
  <div id="oval">0%</div>
  <div class="seeing">Seeing</div>
  <div class="quality">Quality</div>
  <div id='pval'></div>
<div class="qval">
  <div id="myProgress">
    <div id="myBar"></div>
  </div>
</div>
  <div id="hval">20%</div>
  <div id="sval"></div>
  <div class="about">
    <div class="copyright">
      &copy; 2019 Sergio Gómez all rights reserved
    </div>

  </div>

</body>

</html>
