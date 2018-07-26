

const router = require('./routes');
const express = require ('express');
const config = require('./config');
const bodyParser = require('body-parser');



const path = require('path');
const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.use('/api', router);

const mongoose = require('mongoose');
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);


//IMPORT MODULES
require('./models/movie.model.js');

app.use(function(require, response, next){
  response.end("MovieTrackr");
});

app.use(function(require, response, next){
  console.log("require.body BEFORE parsing", require.body);
  next();
})

app.use(bodyParser.json());

app.use(function (require, response, next){
  console.log("require.body AFTER parsing", require.body);
  next();
})

app.listen(config.port, function(){
  console.log(`${config.appName} is listening on port ${config.port}`);
});
