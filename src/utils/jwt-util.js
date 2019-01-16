require('dotenv').config();

const fs = require('fs');
let file_jwt = process.env.JWT_FILE;

const _ = require('lodash');
const writer = require("./writer");
const jwt = require("express-jwt");
const pathToRegexp = require('path-to-regexp');
if(!file_jwt)
  file_jwt = './keys/key.b64.pub';
const publicKey = fs.readFileSync(file_jwt).toString();
module.exports.publicKey = publicKey;

const file_app_tokens = process.env.APP_TOKENS_FILE;
if(!file_app_tokens)
  file_app_tokens = './app_tokens.json';
const APP_TOKENS = JSON.parse(fs.readFileSync(file_app_tokens, 'utf8'));

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