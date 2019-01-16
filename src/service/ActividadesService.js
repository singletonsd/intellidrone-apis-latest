'use strict';

const streamifier = require('streamifier');
const es = require('event-stream');
const vacasService = require('./VacasService');
const vacasModel = require('../database/models/vacas');
const usersModel = require('../database/models/users');
const lotesModel = require('../database/models/lotes');
const actividadesModel = require('../database/models/actividades');

const mongoose = require('../database/main');

const pattern_old = '%{NOTSPACE:primerString} %{NOTSPACE:segundo} \\-- ID: %{WORD:id}, COUNT:%{NUMBER:numero_mensaje},  MSG:%{SPACE:inecesario}%{INT:tiempo_adq_satelite},%{NUMBER:latitud},%{NUMBER:longitud},%{NUMBER:dia},%{NUMBER:hora},%{NUMBER:minuto},%{NUMBER:segundo}';
const pattern_new = '%{NOTSPACE:primerString} %{NOTSPACE:segundo} \\-- ID: %{WORD:id}, MSG: %{NUMBER:inecesario},%{NUMBER:tiempo_adq_satelite},%{NUMBER:latitud},%{NUMBER:longitud},%{NUMBER:dia},%{NUMBER:hora},%{NUMBER:minuto},%{NUMBER:segundo},%{NUMBER:intentosLora} ';
const node_grok = require('node-grok').loadDefaultSync();
const parser_old = node_grok.createPattern(pattern_old);
const parser_new = node_grok.createPattern(pattern_new);
const populate = { path: 'vaca', select: 'name reference' };

/**
 * Add one Actividad.
 * Add one Actividad.
 *
 * vaca Actividades
 * returns Vacas
 **/
exports.addActividad = async function (vaca) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "weigth": 1.4658129,
      "months": 6.02745618307040320615897144307382404804229736328125,
      "name": "name",
      "location": {
        "latitude": 6.0274563,
        "name": "name",
        "id": 0,
        "longitude": 1.4658129
      },
      "id": 0,
      "actividades": [{
        "date": "2000-01-23T04:56:07.000+00:00",
        "latitude": 5.962134,
        "longitude": 5.637377
      }, {
        "date": "2000-01-23T04:56:07.000+00:00",
        "latitude": 5.962134,
        "longitude": 5.637377
      }]
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
exports.addActividades = async function (upfile, userId, loteId, collectingDate) {
  const user = await usersModel.findById(userId);
  if (!user)
    throw { message: 'User does not exists.' };
  const lote = await lotesModel.findOne({ _id: loteId, owner: userId });
  if (!lote)
    throw { message: 'Lote does not exists or it does not belongs to the user specified.' };
  let vacas;
  let vacasRef = [];
  let vacasIdAll = [];
  let vacasId = [];
  if (!collectingDate)
    collectingDate = new Date();
  vacas = await vacasService.getVacas(0, 1000, null, null, userId, loteId);
  if (vacas) {
    vacasRef = vacas.map((vac) => {
      return vac.reference;
    });
    vacasId = vacas.map((vac) => {
      return vac.id;
    });
  }
  vacas = await vacasModel.find();
  if (vacas) {
    vacasIdAll = vacas.map((vac) => {
      return vac.reference;
    });
  }
  let vacaID, vacaIndex;
  let line_number = 0;
  let nuevas_vacas = [];
  let lineas_con_error = [];
  let insertadas = 0;
  return new Promise((resolve, reject) => {
    let s = streamifier.createReadStream(upfile.buffer, { enconding: upfile.enconding })
      .pipe(es.split()).pipe(es.mapSync(async function (line) {
        // lines.on('line', function (line) {
        s.pause();
        line_number++;
        let arreglo = parser_old.parseSync(line);
        if (!arreglo)
          arreglo = parser_new.parseSync(line);
        if (arreglo) {
          // let fechaConstruida = moment(arreglo.primerString);
          // fechaConstruida.add(arreglo.hora,'hours');
          // fechaConstruida.add(arreglo.minuto,'minutes');
          // fechaConstruida.add(arreglo.segundo,'seconds');
          let res = arreglo.dia.split("");
          let fechaConstruida = new Date();
          if (res.length === 5) {
            fechaConstruida.setFullYear("20" + res[3] + res[4]);
            fechaConstruida.setMonth(Number("" + res[1] + res[2]) - 1);
            fechaConstruida.setDate(res[0]);
            fechaConstruida.setHours(arreglo.hora);
            fechaConstruida.setMinutes(arreglo.minuto);
            fechaConstruida.setSeconds(arreglo.segundo);
          } else {
            fechaConstruida.setFullYear("20" + res[4] + res[5]);
            fechaConstruida.setMonth(Number("" + res[2] + res[3]) - 1);
            fechaConstruida.setDate(Number("" + res[0] + res[1]));
            fechaConstruida.setHours(arreglo.hora);
            fechaConstruida.setMinutes(arreglo.minuto);
            fechaConstruida.setSeconds(arreglo.segundo);
          }
          let act = new actividadesModel({
            sampleDate: fechaConstruida,
            latitude: arreglo.latitud,
            longitude: arreglo.longitud,
            collectingDate: collectingDate,
            insertDate: new Date()
          });
          if (arreglo.intentosLora)
            act.connectionsAttempts = arreglo.intentosLora;
          vacaIndex = vacasRef.indexOf(arreglo.id);
          if (vacaIndex === -1) {
            if (vacasIdAll.indexOf(arreglo.id) !== -1)
              reject({ message: 'Vaca with reference ' + arreglo.id + ' exists and it belongs to another user or lote.' });
            let vaquita = new vacasModel({
              location: loteId,
              reference: arreglo.id
            });
            let mumu = await vaquita.save();
            vacasRef.push(arreglo.id);
            vacaID = mumu._id;
            nuevas_vacas.push(mumu);
            vacasId.push(mumu.id);
          } else {
            vacaID = vacasId[vacaIndex];
          }
          act.vaca = vacaID;
          let actSaved = await act.save();
          if (!actSaved) {
            lineas_con_error.push({
              linea_number: line_number,
              linea: line
            });
            console.log("Cannot save line (" + line_number + ")." + line);
          } else {
            insertadas++;
          }
        } else {
          console.log("Not matched line (" + line_number + ")." + line);
          lineas_con_error.push({
            linea_number: line_number,
            linea: line
          });
        }
        s.resume();
      })
        .on('end', function () {
          resolve({ nuevas_vacas: nuevas_vacas, lineas_con_error: lineas_con_error, actividades_insertadas: insertadas });
        }));
  });
}


/**
 * Delete one Actividad.
 * Delete one Actividades.
 *
 * id Long id to delete
 * returns DeletedResponse
 **/
exports.deleteActividad = async function (id) {
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
 * Edit one Actividad.
 * Edit one Actividad
 *
 * lote Vacas
 * returns Actividades
 **/
exports.editActividad = async function (lote) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "date": "2000-01-23T04:56:07.000+00:00",
      "latitude": 5.962134,
      "longitude": 5.637377
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
exports.getActividadById = async function (id, userId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "date": "2000-01-23T04:56:07.000+00:00",
      "latitude": 5.962134,
      "longitude": 5.637377
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
exports.getActividades = async function (skip, limit, orderBy, filter,
  userId, loteId, vacaId, fromDate, untilDate, vacaReference) {
  if (limit <= 0)
    limit = 10;
  let vacasId;
  let optionsFind = {};
  let vacas;
  if (vacaId) {
    vacas = await vacasService.getVacasById(vacaId, userId);
    if (!vacas)
      throw { message: 'Vaca does not exists with id ' + vacaId };
    optionsFind._id = mongoose.Types.ObjectId(vacaId);
  }else if (vacaReference) {
    vacaId = await vacasModel
      .findOne({ reference: vacaReference })
      .select('name reference _id');
    if (vacaId)
      optionsFind._id = mongoose.Types.ObjectId(vacaId.id);
    else
      throw { message: 'Vaca does not exists with reference ' + vacaReference };
  } else {
    vacas = await vacasService.getVacas(0, 10000, null, null, userId, loteId);
    if (vacas && vacas.length) {
      vacasId = vacas.map((val) => { return val._id; });
    } else
      throw { message: 'There is no vacas for user ' + userId + ' in lote with id ' + loteId };
    optionsFind._id = { $in: vacasId };
  }
  optionsFind.actividades = {};
  optionsFind.actividades.sampleDate = {}
  if (fromDate)
    optionsFind.actividades.sampleDate.$gte = fromDate;
  if (untilDate)
    optionsFind.actividades.sampleDate.$lte = untilDate;
  if (!optionsFind.actividades.sampleDate.$gte && !optionsFind.actividades.sampleDate.$lte)
    delete optionsFind.actividades;
  let actividades;
  /*if(orderBy)
    actividades = await actividadesModel.find(optionsFind)
      .populate(populate)
      .skip(skip).limit(limit).sort(orderBy).skip(skip).limit(limit);
  else
    actividades = await actividadesModel.find(optionsFind)
    .populate(populate).skip(skip).limit(limit);*/
  let aggregate = [
    { $match: optionsFind },
    {
      $lookup: {
        from: "actividades",
        localField: "_id",
        foreignField: "vaca",
        as: "actividades"
      }
    }
    , {
      $lookup: {
        from: "lotes",
        localField: "location",
        foreignField: "_id",
        as: "location"
      }
    }
    , { $unwind: "$location" }
    , {
      $project: {
        actividades: {
          /*          sampleDate: 1,
                    latitude: 1,
                    longitude: 1,*/
          $slice: ["$actividades", skip, limit]
        },
        name: 1, sex: 1, reference: 1, months: 1, weight: 1,
        'location.name': 1, 'location.latitude': 1,
        'location.longitude': 1, 'location._id': 1
      }
    }
  ];
  if (orderBy)
    aggregate.push({ $sort: { orderBy: 1 } });
  actividades = await vacasModel.aggregate(aggregate);
  return actividades;
}