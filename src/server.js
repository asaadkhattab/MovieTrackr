const bodyParser = require('body-parser');
const express = require ('express');
const path = require('path');

const router = require('./routes');
const config = require('./config');

//MONGOOSE
const mongoose = require('mongoose');
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

//IMPORT MODULES
require('./models/movie.model.js');


const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use('/api', router);


app.listen(config.port, function(){
  console.log(`${config.appName} is listening on port ${config.port}`);
});
