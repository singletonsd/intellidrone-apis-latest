'use strict';

const vacaModel = require('../database/models/vacas');
const loteModel = require('../database/models/lotes');

/**
 * Add one vaca.
 * Add one vaca.
 *
 * vaca Vacas
 * returns Vacas
 **/
exports.addVaca = async function(vaca) {
  if(!vaca.location_id){
    if(vaca.location && vaca.location._id)
      vaca.location_id = vaca.location._id;
    else
      throw { message: 'Location ID missing.'};
  }
  let lote = await loteModel.findOne({ _id: vaca.location_id });
  if(!lote)
    throw { message: 'Location ID does not exist (' + vaca.location_id +').'};
  let vacaDatabase = new vacaModel({
    name: vaca.name,
    location: vaca.location_id,
    sex: vaca.sex,
    months: vaca.months,
    weight: vaca.weight
  });
  await vacaDatabase.save();
  vacaDatabase = vacaDatabase.toObject();
  let savedVaca = await vacaModel.findOne({_id: vacaDatabase._id }).populate({path: 'location', select: 'name'});

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
exports.deleteVaca = async function(id) {
  let vaca = await vacaModel.findByIdAndRemove(id);
  if(!vaca)
    throw { message: 'ID does not exists' + id };
  return {id: id};
}





/**
 * Edit one vaca.
 * Edit one vaca
 *
 * lote Vacas
 * returns Vacas
 **/
exports.editVaca = async function(vaca) {
  if(!vaca.location_id){
    if(vaca.location && vaca.location._id)
      vaca.location_id = vaca.location._id;
    else
      throw { message: 'Location ID missing.'};
  }
  let lote = await loteModel.findOne({ _id: vaca.location_id });
  if(!lote)
    throw { message: 'Lote ID does not exist (' + vaca.location_id +').'};
  let vacaDatabase = new vacaModel({
    _id : vaca._id,
    name: vaca.name,
    location: vaca.location_id,
    sex: vaca.sex,
    months: vaca.months,
    weight: vaca.weight
  });
  await vacaModel.findOneAndUpdate({ _id: vaca._id },vacaDatabase);
  let savedVaca = await vacaModel.findOne({_id: vaca._id }).populate({path: 'location', select: 'name'});
  savedVaca = savedVaca.toObject();
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
exports.getVacas = async function(skip,limit,orderBy,filter,userId) {
  if(limit <= 0)
    limit = 10;
  let vaca;
  let find = {};
  let populate = {path: 'location', select: 'name'};
  if(userId)
    find = {owner_id: userId};
  if(orderBy)
    vaca = await vacaModel.find(find)
      .populate(populate)
      .skip(skip).limit(limit).sort(orderBy);
  else
    vaca = await vacaModel.find({owner: userId})
    .populate(populate)
    .skip(skip).limit(limit);
  if(!vaca)
    throw { message: 'User does not exists with ID: ' + id };
  return vaca;
}


/**
 * Get one vaca.
 * Get one vaca.
 *
 * id Long id to delete
 * returns Vacas
 **/
exports.getVacasById = async function(id,userId) {
  let options = { _id: id };
  if(userId)
    options.owner = userId;
  let vaca = await vacaModel.findOne(options)
    .populate({path: 'location', select: 'name'});
  if(!vaca)
    throw { message: 'Vaca does not exists with ID: ' + id };
    vaca = vaca.toObject();
  return vaca;
}

