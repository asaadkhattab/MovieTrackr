const router = require('./routes');
const express = require ('express');
const config = require('./config');
const bodyParser = require('body-parser');

const app = express();

const path = require('path');


const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

app.use(function(require, response, next){
  response.end("MovieTrackr");
});

app.listen(config.port, function(){
  console.log(`${config.appName} is listening on port ${config.port}`);
});
