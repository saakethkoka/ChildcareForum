require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
// const mysqlConnect = require('./db');


const NSroutes = require('./NSRoutes');
const DBroutes = require('./DBroutes');
const SWroutes = require('./SWroutes');
const ServiceRoutes = require('./ServiceRoutes');
const userRoutes = require('./userRoutes');
const govServicesRoutes = require('./govServicesRoutes');
const postRoutes = require('./postRoutes');
const voteRoutes = require('./voteRoutes');


// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//include routes
//routes(app, logger);
//BSroutes(app, logger);
SWroutes(app, logger);
//NSroutes(app, logger);
DBroutes(app, logger);
ServiceRoutes(app,logger);
userRoutes(app,logger);
govServicesRoutes(app,logger);
voteRoutes(app, logger);


app.use('/discussionBoard', postRoutes);

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});