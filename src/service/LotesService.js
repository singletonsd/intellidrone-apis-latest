'use strict';

const loteModel = require('../database/models/lotes');
const userModel = require('../database/models/users');
/**
 * Add one lote.
 * Add one lote.
 *
 * lote Lotes
 * returns Lotes
 **/
exports.addLote = async function(lote) {
  if(!lote.owner_id){
    if(lote.owner && lote.owner._id)
      lote.owner_id = lote.owner._id;
    else
      throw { message: 'Owner ID missing.'};
  }
  let user = await userModel.findOne({ _id: lote.owner_id });
  if(!user)
    throw { message: 'Owner ID does not exist (${lote.owner_id}).'};
  let loteDatabase = new loteModel({
    name: lote.name,
    latitude: lote.latitude,
    longitude: lote.longitude,
    owner: lote.owner_id,
  });
  await loteDatabase.save();
  loteDatabase = loteDatabase.toObject();
  delete loteDatabase['__v'];
}


/**
 * Delete one lote.
 * Delete one lote.
 *
 * id Long id to delete
 * returns DeletedResponse
 **/
exports.deleteLote = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit one lote.
 * Edit one lote.
 *
 * lote Lotes 
 * returns Lotes
 **/
exports.editLote = function(lote) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "latitude" : 6.0274563,
  "name" : "name",
  "id" : 0,
  "longitude" : 1.4658129
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get one lote.
 * Get one lote.
 *
 * id Long id to delete
 * returns Lotes
 **/
exports.getLoteById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "latitude" : 6.0274563,
  "name" : "name",
  "id" : 0,
  "longitude" : 1.4658129
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all lotes.
 * Get all lotes.
 *
 * skip Integer number of item to skip (not included the first)
 * limit Integer max records to return (included the last)
 * orderBy String order by property. Put '-' at the beginning to descendant order. (optional)
 * filter String filter data. NOT SUPPORTED YET. (optional)
 * userId Long id of user. Only for admin users. (optional)
 * returns List
 **/
exports.getLotes = function(skip,limit,orderBy,filter,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "latitude" : 6.0274563,
  "name" : "name",
  "id" : 0,
  "longitude" : 1.4658129
}, {
  "latitude" : 6.0274563,
  "name" : "name",
  "id" : 0,
  "longitude" : 1.4658129
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

