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
    throw { message: 'Owner ID does not exist (' + lote.owner_id +').'};
  let loteDatabase = new loteModel({
    name: lote.name,
    latitude: lote.latitude,
    longitude: lote.longitude,
    owner: lote.owner_id,
  });
  await loteDatabase.save();
  loteDatabase = loteDatabase.toObject();
  let savedLote = await loteModel.findOne({_id: loteDatabase._id }).populate({path: 'owner', select: 'user'});

  savedLote = savedLote.toObject();
  delete savedLote['__v'];
  return savedLote;
}


/**
 * Delete one lote.
 * Delete one lote.
 *
 * id Long id to delete
 * returns DeletedResponse
 **/
exports.deleteLote = async function(id) {
  let lote = await loteModel.findByIdAndRemove(id);
  if(!lote)
    throw { message: 'ID does not exists' + id };
  return {id: id};
}


/**
 * Edit one lote.
 * Edit one lote.
 *
 * lote Lotes
 * returns Lotes
 **/
exports.editLote = async function(lote) {
  if(!lote.owner_id){
    if(lote.owner && lote.owner._id)
      lote.owner_id = lote.owner._id;
    else
      throw { message: 'Owner ID missing.'};
  }
  let user = await userModel.findOne({ _id: lote.owner_id });
  if(!user)
    throw { message: 'Owner ID does not exist (' + lote.owner_id +').'};
  let loteDatabase = new loteModel({
    _id : lote._id,
    name: lote.name,
    latitude: lote.latitude,
    longitude: lote.longitude,
    owner: lote.owner_id
  });
  await loteModel.findOneAndUpdate({ _id: lote._id },loteDatabase);
  let savedLote = await loteModel.findOne({_id: lote._id }).populate({path: 'owner', select: 'user'});
  savedLote = savedLote.toObject();
  delete savedLote['__v'];
  return savedLote;
}


/**
 * Get one lote.
 * Get one lote.
 *
 * id Long id to delete
 * returns Lotes
 **/
exports.getLoteById = async function(id,userId) {
  let options = { _id: id };
  if(userId)
    options.owner = userId;
  let lote = await loteModel.findOne(options)
    .populate({path: 'owner', select: 'user'});
  if(!lote)
    throw { message: 'Lote does not exists with ID: ' + id };
    lote = lote.toObject();
  return lote;
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
exports.getLotes = async function(skip,limit,orderBy,filter,userId) {
  if(limit <= 0)
    limit = 10;
  let lote;
  let find = {};
  let populate = {path: 'owner', select: 'user'};
  if(userId)
    find = {owner_id: userId};
  if(orderBy)
    lote = await loteModel.find(find)
      .populate(populate)
      .skip(skip).limit(limit).sort(orderBy);
  else
    lote = await loteModel.find({owner: userId})
    .populate(populate)
    .skip(skip).limit(limit);
  if(!lote)
    throw { message: 'User does not exists with ID: ' + id };
  return lote;
}

