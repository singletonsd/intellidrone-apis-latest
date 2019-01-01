require('dotenv').config();

var fs = require('fs');
var file = process.env.JWT_FILE;

const _ = require('lodash');
const writer = require("./writer");

if(!file)
  file = './keys/key.b64.pub';
var publicKey = fs.readFileSync(file).toString();
module.exports.publicKey = publicKey;

const APP_TOKENS = JSON.parse(fs.readFileSync('./app_tokens.json', 'utf8'));
module.exports.checkAppToken = function (err, req, res, next) {
  let app_token = req.headers.x_app_id;
  if(!app_token)
    writer.writeJson(res, new writer.respondWithCode(401,'No x_app_id provided'));
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