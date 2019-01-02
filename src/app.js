'use strict';

var fs = require('fs'),
    path = require('path');

var app = require('connect')();
var cors = require('cors');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');

//Connect to mongodb
const mongoose = require('./database/main');

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

const jwt_util = require("./utils/jwt-util");
const PUBLIC_URLs = [/\/Users\/Login*/,'/docs/',/\/docs*/,'/api-docs'];
var jwt = require("express-jwt");
app.use(jwt({
  secret: jwt_util.publicKey,
  // credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    var token = req.headers.x_user_key;
    if (token){
      if(token.split(' ')[0] === 'Bearer')
        return token.split(' ')[1];
      return token;
    }
    return null;
  }
}).unless({path: PUBLIC_URLs}));

app.use(jwt_util.checkAppToken);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  //Allow cross origin
  app.use(cors());

  if(process.env.DATABASE_LOCAL){
    console.log("Running with local database.");
    var shell = require('shelljs');
    shell.exec('./scripts/run_mongo_local.sh');
  }
});

process.on('uncaughtException', function(err) {
  // handle the error safely
  console.log(err);
});

module.exports = app;