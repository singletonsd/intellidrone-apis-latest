'use strict';

const userModel = require('../database/models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
/**
 * Add one User.
 * Add one User.
 *
 * handedOvers Users
 * returns Users
 **/
exports.addUser = async function (user) {
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash('superAdmin!!', salt);
  const userDatabase = new userModel({
    _id: user.id,
    user: user.user,
    password: hash,
    type: user.type
  });
  await userDatabase.save();
  return userDatabase;
}


/**
 * Delete one Users.
 * Delete one User.
 *
 * id Long id to delete
 * returns DeletedResponse
 **/
exports.deleteUsers = function (id) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "id": 0
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit one User.
 * Edit one User.
 *
 * user Users
 * returns Users
 **/
exports.editUser = function (user) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "password": "password",
      "lotes": [{
        "latitude": 6.0274563,
        "name": "name",
        "id": 0,
        "longitude": 1.4658129
      }, {
        "latitude": 6.0274563,
        "name": "name",
        "id": 0,
        "longitude": 1.4658129
      }],
      "id": 0,
      "type": "COMMON",
      "user": "user",
      "Password": "Password"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get one User.
 * Get one User.
 *
 * id Long id to delete
 * deleted String Get all, daleted, not deleted data. Default not deleted. (optional)
 * returns Users
 **/
exports.getUserById = function (id, deleted) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "password": "password",
      "lotes": [{
        "latitude": 6.0274563,
        "name": "name",
        "id": 0,
        "longitude": 1.4658129
      }, {
        "latitude": 6.0274563,
        "name": "name",
        "id": 0,
        "longitude": 1.4658129
      }],
      "id": 0,
      "type": "COMMON",
      "user": "user",
      "Password": "Password"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all Users.
 * Get all Users.
 *
 * skip Integer number of item to skip
 * limit Integer max records to return
 * orderBy String order by property. (optional)
 * filter String filter data. (optional)
 * deleted String Get all, daleted, not deleted data. Default not deleted. (optional)
 * userId Long id of user. Only for admin, editor or viewer users. (optional)
 * returns List
 **/
exports.getUsers = function (skip, limit, orderBy, filter, deleted, userId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
      "password": "password",
      "lotes": [{
        "latitude": 6.0274563,
        "name": "name",
        "id": 0,
        "longitude": 1.4658129
      }, {
        "latitude": 6.0274563,
        "name": "name",
        "id": 0,
        "longitude": 1.4658129
      }],
      "id": 0,
      "type": "COMMON",
      "user": "user",
      "Password": "Password"
    }, {
      "password": "password",
      "lotes": [{
        "latitude": 6.0274563,
        "name": "name",
        "id": 0,
        "longitude": 1.4658129
      }, {
        "latitude": 6.0274563,
        "name": "name",
        "id": 0,
        "longitude": 1.4658129
      }],
      "id": 0,
      "type": "COMMON",
      "user": "user",
      "Password": "Password"
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs user into the system
 *
 * email String The user email for login
 * password String The password for login in clear text
 * returns Error
 **/
exports.login = async function (username, password) {
  let user = await userModel.findOne({ user: username });
  if (user) {
    const res = await bcrypt.compare(password, user.password);
    if (!res)
      throw { message: 'Invalid username and password combination.'};
    user = user.toObject();
    delete user['password'];
    delete user['lotes'];
    let token = jwt.sign({
      data: user
    }, require('../utils/jwt-util').publicKey, {
        expiresIn: '24h',
        algorithm: 'HS256'
      });
    return { 'user': user, 'token': token };
  }else
    throw { message: 'Invalid username and password combination.'};
}


/**
 * Logs out current logged in user session
 *
 * returns String
 **/
exports.logout = function () {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

