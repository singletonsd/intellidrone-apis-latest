'use strict';

const vacaModel = require('../database/models/vacas');
const loteModel = require('../database/models/lotes');
const actModel = require('../database/models/actividades');

const mongoose = require('../database/main');

const _ = require('lodash');
const populate = { path: 'location', select: 'name owner', populate: { path: 'owner', select: '_id user' } };
/**
 * Add one vaca.
 * Add one vaca.
 *
 * vaca Vacas
 * returns Vacas
 **/
exports.addVaca = async function (vaca, userId) {
  if (!vaca.location_id) {
    if (vaca.location && vaca.location._id)
      vaca.location_id = vaca.location._id;
    else
      throw { message: 'Location ID missing.' };
  }
  let optionsLote = { _id: vaca.location_id };
  if (userId) {
    optionsLote.owner = userId;
  }
  let lote = await loteModel.findOne(optionsLote);
  if (!lote)
    throw { message: 'Location ID does not exist (' + vaca.location_id + ') or does not belongs to this user.' };
  if (vaca.reference) {
    let vacaRef = await vacaModel.findOne({ reference: vaca.reference });
    if (vacaRef)
      throw { message: 'Reference already exists' };
  } else {
    throw { message: 'Reference missing.' };
  }
  let vacaDatabase = new vacaModel({
    name: vaca.name,
    location: vaca.location_id,
    sex: vaca.sex,
    reference: vaca.reference,
    months: vaca.months,
    weight: vaca.weight
  });
  await vacaDatabase.save();
  vacaDatabase = vacaDatabase.toObject();
  let savedVaca = await vacaModel.findOne({ _id: vacaDatabase._id }).populate({ path: 'location', select: 'name' });
  savedVaca = savedVaca.toObject();
  delete savedVaca['__v'];
  return savedVaca;
}


/**
 * Delete one vaca.
 * Delete one vaca.
 *
 * id Long id to delete
 * returns DeletedResponse
 **/
exports.deleteVaca = async function (id, userId) {
  let options = { _id: id };
  let vaca = await vacaModel.findOne(options).populate(populate);
  if (!vaca)
    throw { message: 'Vaca does not exists with ID: ' + id };
  if (userId && vaca.location.owner.id !== userId)
    throw { message: 'Vaca does not belong to user: ' + userId };
  vaca = await vacaModel.findByIdAndRemove(id);
  if (!vaca)
    throw { message: 'ID does not exists' + id };
  return { id: id };
}





/**
 * Edit one vaca.
 * Edit one vaca
 *
 * lote Vacas
 * returns Vacas
 **/
exports.editVaca = async function (vaca, userId) {
  if (!vaca._id) {
    throw { message: '_id missing.' };
  }
  if (!vaca.location_id) {
    if (vaca.location && vaca.location._id)
      vaca.location_id = vaca.location._id;
    else
      throw { message: 'Location ID missing.' };
  }
  let optionsLote = { _id: vaca.location_id };
  if (userId)
    optionsLote.owner = userId;
  let lote = await loteModel.findOne(optionsLote);
  if (!lote)
    throw { message: 'Lote ID does not exist or does not belongs to user (' + vaca.location_id + ').' };
  if (userId) {
    let vacacheck = await vacaModel.findById(vaca._id).populate(populate);
    if (!vacacheck)
      throw { message: 'Vaca with id does not exist.' };
    if (vacacheck.location.owner.id !== userId)
      throw { message: 'Vaca does not belongs to user.' };
  }
  let vacaDatabase = new vacaModel({
    _id: vaca._id,
    name: vaca.name,
    location: vaca.location_id,
    reference: vaca.reference,
    sex: vaca.sex,
    months: vaca.months,
    weight: vaca.weight
  });
  await vacaModel.findOneAndUpdate({ _id: vaca._id }, vacaDatabase);
  let savedVaca = await vacaModel.findById(vaca._id)
    .populate(populate);
  delete savedVaca['__v'];
  return savedVaca;
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
exports.getVacas = async function (skip, limit, orderBy, filter, userId, loteId) {
  if (limit <= 0)
    limit = 10;
  let vaca;
  let find = {};
  if (userId) {
    let lotesId = await loteModel.find({ owner: userId }).select("_id");
    if (!lotesId || !lotesId.length)
      throw { message: 'User does have any lotes.' };
    if (loteId) {
      if (lotesId.map(((lot) => { return lot.id; })).indexOf(loteId) === -1) {
        throw { message: 'User does have lote with id ' + loteId };
      }
      find.location = mongoose.Types.ObjectId(loteId);
    } else {
      find.location = { $in: lotesId.map(((lot) => { return mongoose.Types.ObjectId(lot.id); })) };
    }
  } else {
    if (loteId) {
      let lote = await loteModel.findById(loteId);
      if (!lote) {
        throw { message: 'Lote does not exist ' + loteId };
      } else {
        find.location = mongoose.Types.ObjectId(loteId);
      }
    }
  }
  let aggregate = [
    { $match: find }
    ,{
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
    , { $skip: skip }, { $limit: limit }
    ,{
      $project: {
        actividades: {
/*          sampleDate: 1,
          latitude: 1,
          longitude: 1,*/
          $slice: ["$actividades", -5]
        },
        name: 1, sex: 1, reference: 1, months: 1, weight: 1,
        'location.name': 1, 'location.latitude': 1,
        'location.longitude': 1, 'location._id': 1
      }
    }
  ];
  if (orderBy)
    aggregate.push({ $sort: { orderBy: 1 } });
  vaca = await vacaModel.aggregate(aggregate);
  return vaca;
}


/**
 * Get one vaca.
 * Get one vaca.
 *
 * id Long id to delete
 * returns Vacas
 **/
exports.getVacasById = async function (id, userId) {
  let options = { _id: id };
  let vaca = await vacaModel.findOne(options).populate(populate);
  if (!vaca)
    throw { message: 'Vaca does not exists with ID: ' + id };
  if (userId && vaca.location.owner.id !== userId)
    throw { message: 'Vaca does not belong to user: ' + userId };
  vaca.actividades = await actModel.find({vaca:id}).limit(5).sort({sampleDate:-1});
  return vaca;
}

