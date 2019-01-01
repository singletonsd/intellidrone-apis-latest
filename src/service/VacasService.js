'use strict';


/**
 * Add one vaca.
 * Add one vaca.
 *
 * vaca Vacas 
 * returns Vacas
 **/
exports.addVaca = function(vaca) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "weigth" : 1.4658129,
  "months" : 6.02745618307040320615897144307382404804229736328125,
  "name" : "name",
  "location" : {
    "latitude" : 6.0274563,
    "name" : "name",
    "id" : 0,
    "longitude" : 1.4658129
  },
  "id" : 0,
  "actividades" : [ {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "latitude" : 5.962134,
    "longitude" : 5.637377
  }, {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "latitude" : 5.962134,
    "longitude" : 5.637377
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete one vaca.
 * Delete one vaca.
 *
 * id Long id to delete
 * returns DeletedResponse
 **/
exports.deleteVaca = function(id) {
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
 * Edit one Actividad.
 * Edit one Actividad
 *
 * lote Vacas 
 * returns Actividades
 **/
exports.editActividad = function(lote) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "latitude" : 5.962134,
  "longitude" : 5.637377
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit one vaca.
 * Edit one vaca
 *
 * lote Vacas 
 * returns Vacas
 **/
exports.editVaca = function(lote) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "weigth" : 1.4658129,
  "months" : 6.02745618307040320615897144307382404804229736328125,
  "name" : "name",
  "location" : {
    "latitude" : 6.0274563,
    "name" : "name",
    "id" : 0,
    "longitude" : 1.4658129
  },
  "id" : 0,
  "actividades" : [ {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "latitude" : 5.962134,
    "longitude" : 5.637377
  }, {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "latitude" : 5.962134,
    "longitude" : 5.637377
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all vacas.
 * Get all vacas.
 *
 * skip Integer number of item to skip (not included the first)
 * limit Integer max records to return (included the last)
 * orderBy String order by property. Put '-' at the beginning to descendant order. (optional)
 * filter String filter data. NOT SUPPORTED YET. (optional)
 * userId Long id of user. Only for admin users. (optional)
 * returns List
 **/
exports.getVacas = function(skip,limit,orderBy,filter,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "weigth" : 1.4658129,
  "months" : 6.02745618307040320615897144307382404804229736328125,
  "name" : "name",
  "location" : {
    "latitude" : 6.0274563,
    "name" : "name",
    "id" : 0,
    "longitude" : 1.4658129
  },
  "id" : 0,
  "actividades" : [ {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "latitude" : 5.962134,
    "longitude" : 5.637377
  }, {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "latitude" : 5.962134,
    "longitude" : 5.637377
  } ]
}, {
  "weigth" : 1.4658129,
  "months" : 6.02745618307040320615897144307382404804229736328125,
  "name" : "name",
  "location" : {
    "latitude" : 6.0274563,
    "name" : "name",
    "id" : 0,
    "longitude" : 1.4658129
  },
  "id" : 0,
  "actividades" : [ {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "latitude" : 5.962134,
    "longitude" : 5.637377
  }, {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "latitude" : 5.962134,
    "longitude" : 5.637377
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get one vaca.
 * Get one vaca.
 *
 * id Long id to delete
 * returns Vacas
 **/
exports.getVacasById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "weigth" : 1.4658129,
  "months" : 6.02745618307040320615897144307382404804229736328125,
  "name" : "name",
  "location" : {
    "latitude" : 6.0274563,
    "name" : "name",
    "id" : 0,
    "longitude" : 1.4658129
  },
  "id" : 0,
  "actividades" : [ {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "latitude" : 5.962134,
    "longitude" : 5.637377
  }, {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "latitude" : 5.962134,
    "longitude" : 5.637377
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

