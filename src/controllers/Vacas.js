'use strict';

var utils = require('../utils/writer.js');
var Vacas = require('../service/VacasService');

module.exports.addVaca = function addVaca (req, res, next) {
  let userId;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
    /*if(lote.owner_id !== req.user.data._id){
      utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
      return;
    }*/
  }
  var vaca = req.swagger.params['Vaca'].value;
  Vacas.addVaca(vaca,userId)
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

module.exports.deleteVaca = function deleteVaca (req, res, next) {
  let userId;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
    /*if(lote.owner_id !== req.user.data._id){
      utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
      return;
    }*/
  }
  var id = req.swagger.params['id'].value;
  Vacas.deleteVaca(id,userId)
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

module.exports.editVaca = function editVaca (req, res, next) {
  let userId;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
    /*if(lote.owner_id !== req.user.data._id){
      utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
      return;
    }*/
  }
  var vaca = req.swagger.params['Vaca'].value;
  Vacas.editVaca(vaca,userId)
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

module.exports.getVacas = function getVacas (req, res, next) {
  var skip = req.swagger.params['skip'].value;
  var limit = req.swagger.params['limit'].value;
  var orderBy = req.swagger.params['orderBy'].value;
  var filter = req.swagger.params['filter'].value;
  var userId = req.swagger.params['userId'].value;
  var loteId = req.swagger.params['loteId'].value;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
  }
  Vacas.getVacas(skip,limit,orderBy,filter,userId,loteId)
    .then(function (response) {
      if(response && response.length)
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

module.exports.getVacasById = function getVacasById (req, res, next) {
  var id = req.swagger.params['id'].value;
  let userId = req.swagger.params['userId'].value;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
  }
  Vacas.getVacasById(id,userId)
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
