require('dotenv').config();

var fs = require('fs');
var file = process.env.JWT_FILE;

const _ = require('lodash');
const writer = require("./writer");
var jwt = require("express-jwt");
const pathToRegexp = require('path-to-regexp');
if(!file)
  file = './keys/key.b64.pub';
var publicKey = fs.readFileSync(file).toString();
module.exports.publicKey = publicKey;

const APP_TOKENS = JSON.parse(fs.readFileSync('./app_tokens.json', 'utf8'));

module.exports.addJWT = function(app,SWAGGER_BASE_PATH){
  const PUBLIC_URLs = [
    pathToRegexp(SWAGGER_BASE_PATH + 'Users/Login'),
    pathToRegexp([SWAGGER_BASE_PATH + 'docs', SWAGGER_BASE_PATH + 'docs/:option']),
    pathToRegexp(SWAGGER_BASE_PATH + 'api-docs')
  ];
  app.use(jwt({
    secret: publicKey,
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
  app.use(checkAppToken);
};
var checkAppToken = function (err, req, res, next) {
  let app_token = req.headers.x_app_id;
  if(!app_token){
    writer.writeJson(res, new writer.respondWithCode(401,'No x_app_id provided'));
    return;
  }
  let finalToken = 0;
  _.forEach(APP_TOKENS || [], (token) => {
    finalToken++;
    if(token.token === app_token){
      if(finalToken === APP_TOKENS.length)
        finalToken--;
      return false;
    }
  });
  if(finalToken === APP_TOKENS.length){
    writer.writeJson(res, new writer.respondWithCode(401,app_token));
    return;
  }
  if (err) {
    writer.writeJson(res, new writer.respondWithCode(401,err.message));
    return;
  }
  next();
};