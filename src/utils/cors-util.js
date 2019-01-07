const pathToRegexp = require('path-to-regexp');
const _ = require('lodash');
const cors = require('cors');

const whitelist = [pathToRegexp('http://localhost:port*'), pathToRegexp('http://web.robotagro.com')];
module.exports = function(app){
  app.use(cors(corsOptions));
};

const corsOptions = {
  origin: whitelist
  ,credentials: true
  ,methods: ['GET','HEAD','OPTIONS','POST','PUT']
  ,allowedHeaders: ['Access-Control-Allow-Headers'
    , 'Origin,Accept'
    , 'X-Requested-With'
    , 'Content-Type'
    , 'Access-Control-Request-Method'
    , 'Access-Control-Request-Headers'
    ,'x_app_id','x_user_key']
};