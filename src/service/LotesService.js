'use strict';


/**
 * Add one lote.
 * Add one lote.
 *
 * lote Lotes 
 * returns Lotes
 **/
exports.addLote = function(lote) {
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

