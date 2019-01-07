const pathToRegexp = require('path-to-regexp');
const _ = require('lodash');

var whitelist = [pathToRegexp('http://localhost:port*'), pathToRegexp('http://web.robotagro.com')];

module.exports.corsOptions = {
    origin: function (origin, callback) {
      let finalToken = 0;
      _.forEach(whitelist || [], (reg) => {
        finalToken++;
        if(reg.exec(origin)){
          finalToken--;
          return false;
        }
      });
      if(finalToken === whitelist.length){
        callback(new Error('Not allowed by CORS'));
      }else{
        callback(null, true);
      }
    }
  }