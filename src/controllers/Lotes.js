'use strict';

var utils = require('../utils/writer.js');
var Lotes = require('../service/LotesService');

module.exports.addLote = function addLote (req, res, next) {
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    return;
  }
  let lote = req.swagger.params['Lote'].value;
  Lotes.addLote(lote)
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

module.exports.deleteLote = function deleteLote (req, res, next) {
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    return;
  }
  let id = req.swagger.params['id'].value;
  Lotes.deleteLote(id)
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

module.exports.editLote = function editLote (req, res, next) {
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    return;
  }
  let lote = req.swagger.params['Lote'].value;
  Lotes.editLote(lote)
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

module.exports.getLoteById = function getLoteById (req, res, next) {
  let id = req.swagger.params['id'].value;
  let userId = req.swagger.params['userId'].value;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
  }
  Lotes.getLoteById(id,userId)
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

module.exports.getLotes = function getLotes (req, res, next) {
  let skip = req.swagger.params['skip'].value;
  let limit = req.swagger.params['limit'].value;
  let orderBy = req.swagger.params['orderBy'].value;
  let filter = req.swagger.params['filter'].value;
  let userId = req.swagger.params['userId'].value;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
  }
  Lotes.getLotes(skip,limit,orderBy,filter,userId)
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
