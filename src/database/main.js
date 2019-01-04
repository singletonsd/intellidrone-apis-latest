const mongoose = require('mongoose');

require('dotenv').config();
var fs = require('fs');
var database = JSON.parse(fs.readFileSync('./database.json', 'utf8'));

var uri = 'mongodb://';
uri = uri + database.main[process.env.DB_MAIN_CLIENT].connection.host;//+'/';
// uri = uri +database.main[process.env.DB_MAIN_CLIENT].connection.database;
var mongo_options = {
  dbName: database.main[process.env.DB_MAIN_CLIENT].connection.database,
  useNewUrlParser: true,
  user: database.main[process.env.DB_MAIN_CLIENT].connection.user,
  pass: database.main[process.env.DB_MAIN_CLIENT].connection.password
  //,auth:{authdb:"admin"}
};

mongoose.connect(uri,mongo_options)
  .then(db => console.log('Base de datos corriendo'))
  .catch(err => console.error(err));

module.exports = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userModel = require('./models/users');
userModel.find({user:'admin'},function (err, user){
  if (err)
      throw err;
  if(user.length <= 0){
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash('superAdmin!!', salt, function(err, hash) {
          // Store hash in your password DB.
        const userDatabase = new userModel({
          user:'admin',
          email: 'soporte@singleton.com.ar',
          password:hash,
          type: 'ADMIN'
        });
        userDatabase.save(function (err) {
          if (err)
            throw err;
          console.log("Created admin user");
        });
      });
    });
  }
});
