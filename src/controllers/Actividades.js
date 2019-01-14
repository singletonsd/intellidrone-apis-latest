'use strict';

var utils = require('../utils/writer.js');
var Actividades = require('../service/ActividadesService');

module.exports.addActividad = function addActividad (req, res, next) {
  let userId;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
    //utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    //return;
  }
  let vaca = req.swagger.params['Vaca'].value;
  Actividades.addActividad(vaca,userId)
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

module.exports.addActividades = function addActividades (req, res, next) {
  let upfile = req.swagger.params['upfile'].value;
  let userId = req.swagger.params['userId'].value;
  let loteId = req.swagger.params['loteId'].value;
  let collectingDate = req.swagger.params['collectingDate'].value;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
    //utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    //return;
  }else{
    if(!userId)
      utils.writeJson(res, new utils.respondWithCode(400,{ message: 'Not COMMON user must submit userId of a COMMON USER.'}));
      return;
  }
  Actividades.addActividades(upfile,userId,loteId,collectingDate)
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

module.exports.deleteActividad = function deleteActividad (req, res, next) {
  let userId;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
    //utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    //return;
  }
  let id = req.swagger.params['id'].value;
  Actividades.deleteActividad(id,userId)
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

module.exports.editActividad = function editActividad (req, res, next) {
  let userId;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
    //utils.writeJson(res, new utils.respondWithCode(401,'Not having the privilege.'));
    //return;
  }
  let actividad = req.swagger.params['Actividad'].value;
  Actividades.editActividad(actividad,userId)
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

module.exports.getActividadById = function getActividadById (req, res, next) {
  let id = req.swagger.params['id'].value;
  let userId = req.swagger.params['userId'].value;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
  }
  Actividades.getActividadById(id,userId)
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

module.exports.getActividades = function getActividades (req, res, next) {
  let skip = req.swagger.params['skip'].value;
  let limit = req.swagger.params['limit'].value;
  let orderBy = req.swagger.params['orderBy'].value;
  let filter = req.swagger.params['filter'].value;
  let userId = req.swagger.params['userId'].value;
  let loteId = req.swagger.params['loteId'].value;
  let vacaId = req.swagger.params['vacaId'].value;
  let fromDate = req.swagger.params['fromDate'].value;
  let untilDate = req.swagger.params['untilDate'].value;
  let vacaReference = req.swagger.params['vacaReference'].value;
  if(!req.user || !req.user.data || (req.user.data.type !== 'ADMIN' && req.user.data.type !== 'EDITOR')){
    userId = req.user.data._id;
  }
  Actividades.getActividades(skip,limit,orderBy,filter,userId,loteId,vacaId,fromDate,untilDate,vacaReference)
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
