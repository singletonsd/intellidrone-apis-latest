'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.addUser = function addUser (req, res, next) {
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN')){
    utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    return;
  }
  let user = req.swagger.params['User'].value;
  Users.addUser(user)
    .then(function (response) {
      if(response)
        utils.writeJson(res, response);
      else
        utils.writeJson(res,utils.respondWithCode(204));
    })
    .catch(function (response) {
      if(typeof response !== 'object' ||  (typeof response === 'object' && !response.message))
        response = { message: response.message };
      utils.writeJson(res, new utils.respondWithCode(400,response));
    });
};

module.exports.deleteUsers = function deleteUsers (req, res, next) {
  if(!req.user || !req.user.data || req.user.data.type !== 'ADMIN'){
    utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    return;
  }
  let id = req.swagger.params['id'].value;
  Users.deleteUsers(id)
    .then(function (response) {
      if(response)
        utils.writeJson(res, response);
      else
        utils.writeJson(res,utils.respondWithCode(204));
    })
    .catch(function (response) {
      if(typeof response !== 'object' ||  (typeof response === 'object' && !response.message))
        response = { message: response.message };
      utils.writeJson(res, new utils.respondWithCode(400,response));
    });
};

module.exports.editUser = function editUser (req, res, next) {
  let user = req.swagger.params['User'].value;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data._id !== user.id)){
    utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    return;
  }
  Users.editUser(user)
    .then(function (response) {
      if(response)
        utils.writeJson(res, response);
      else
        utils.writeJson(res,utils.respondWithCode(204));
    })
    .catch(function (response) {
      if(typeof response !== 'object' ||  (typeof response === 'object' && !response.message))
        response = { message: response.message };
      utils.writeJson(res, new utils.respondWithCode(400,response));
    });
};

module.exports.getUserById = function getUserById (req, res, next) {
  let id = req.swagger.params['id'].value;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data._id !== id)){
    utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    return;
  }
  var deleted = req.swagger.params['deleted'].value;
  Users.getUserById(id,deleted)
    .then(function (response) {
      if(response)
        utils.writeJson(res, response);
      else
        utils.writeJson(res,utils.respondWithCode(204));
    })
    .catch(function (response) {
      if(typeof response !== 'object' ||  (typeof response === 'object' && !response.message))
        response = { message: response.message };
      utils.writeJson(res, new utils.respondWithCode(400,response));
    });
};

module.exports.getUsers = function getUsers (req, res, next) {
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    return;
  }
  let skip = req.swagger.params['skip'].value;
  let limit = req.swagger.params['limit'].value;
  let orderBy = req.swagger.params['orderBy'].value;
  let filter = req.swagger.params['filter'].value;
  let deleted = req.swagger.params['deleted'].value;
  let userId = req.swagger.params['userId'].value;
  Users.getUsers(skip,limit,orderBy,filter,deleted,userId)
    .then(function (response) {
      if(response)
        utils.writeJson(res, response);
      else
        utils.writeJson(res,utils.respondWithCode(204));
    })
    .catch(function (response) {
      if(typeof response !== 'object' ||  (typeof response === 'object' && !response.message))
        response = { message: response.message };
      utils.writeJson(res, new utils.respondWithCode(400,response));
    });
};

module.exports.login = function login (req, res, next) {
  let user = req.swagger.params['user'].value;
  let password = req.swagger.params['password'].value;
  Users.login(user,password)
    .then(function (response) {
      if(response)
        utils.writeJson(res, response);
      else
        utils.writeJson(res,utils.respondWithCode(204));
    })
    .catch(function (response) {
      if(typeof response !== 'object' ||  (typeof response === 'object' && !response.message))
        response = { message: response.message };
      utils.writeJson(res, new utils.respondWithCode(400,response));
    });
};

module.exports.logout = function logout (req, res, next) {
  Users.logout()
    .then(function (response) {
      if(response)
        utils.writeJson(res, response);
      else
        utils.writeJson(res,utils.respondWithCode(204));
    })
    .catch(function (response) {
      if(typeof response !== 'object' ||  (typeof response === 'object' && !response.message))
        response = { message: response.message };
      utils.writeJson(res, new utils.respondWithCode(400,response));
    });
};
