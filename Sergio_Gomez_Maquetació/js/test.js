const express = require('express');
const app = express();

function mypost(url, data) {
  app.listen(3000, () => console.log('listening at 3000'));
  app.use(express.static('public'));
  app.post(url)
};