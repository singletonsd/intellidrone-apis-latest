'use strict';

require('dotenv').config();

var fs = require('fs'),
    path = require('path');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');

// swaggerRouter configuration
var options = {
  controllers: path.join(__dirname, './controllers'),
  useStubs: false
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

if(process.env.SWAGGER_HOST){
  swaggerDoc.host = process.env.SWAGGER_HOST;
}
var SWAGGER_BASE_PATH = process.env.SWAGGER_BASE_PATH;
if(!SWAGGER_BASE_PATH)
  SWAGGER_BASE_PATH='/';
if(process.env.SWAGGER_BASE_PATH){
  swaggerDoc.basePath = process.env.SWAGGER_BASE_PATH;
}

//Allow cross origin
require('./utils/cors-util')(app);

//Enable JWT tokens
require("./utils/jwt-util").addJWT(app,SWAGGER_BASE_PATH);

//Connect to mongodb
const mongoose = require('./database/main');
if(process.env.DATABASE_LOCAL){
  console.log("Running with local database.");
  var shell = require('shelljs');
  shell.exec('./scripts/run_mongo_local.sh');
}

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi({
    apiDocs: SWAGGER_BASE_PATH + 'api-docs',
    swaggerUi: SWAGGER_BASE_PATH + 'docs'
  }));
});

process.on('uncaughtException', function(err) {
  // handle the error safely
  console.log(err);
});

module.exports = app;