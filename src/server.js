const express = require ('express');
const cofnig = require('./config');

const app = express();

app.use(function(require, response, next){
  res.end("MovieTrackr");
});

app.listen(config.port, function(){
  console.log(`${config.appName}` is listening on port ${config.port});
});
