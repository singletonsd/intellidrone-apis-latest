'use strict';


/**
 * Add one Actividad.
 * Add one Actividad.
 *
 * vaca Actividades 
 * returns Vacas
 **/
exports.addActividad = function(vaca) {
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
 * Add actividades from a file.
 * Add actividades from a file.
 *
 * upfile File The file to upload. (optional)
 * userId Long id of user. Only for admin users. (optional)
 * returns UploadResponse
 **/
exports.addActividades = function(upfile,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "nuevas_vacas" : [ {
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
  } ],
  "lineas_con_error" : [ {
    "linea_number" : 6,
    "linea" : "linea"
  }, {
    "linea_number" : 6,
    "linea" : "linea"
  } ],
  "actividades_insertadas" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete one Actividad.
 * Delete one Actividades.
 *
 * id Long id to delete
 * returns DeletedResponse
 **/
exports.deleteActividad = function(id) {
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
 * Get one Actividad.
 * Get one Actividades.
 *
 * id Long id to delete
 * returns Actividades
 **/
exports.getActividadById = function(id) {
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
 * Get all Actividades.
 * Get all Actividades.
 *
 * skip Integer number of item to skip (not included the first)
 * limit Integer max records to return (included the last)
 * orderBy String order by property. Put '-' at the beginning to descendant order. (optional)
 * filter String filter data. NOT SUPPORTED YET. (optional)
 * userId Long id of user. Only for admin users. (optional)
 * returns List
 **/
exports.getActividades = function(skip,limit,orderBy,filter,userId) {
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

