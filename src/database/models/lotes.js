const mongoose = require('mongoose');
const {Schema} = mongoose;
const autoIncrement = require('mongoose-auto-increment');

const lotesSchema = new Schema({
    _id: { type:String,required:true },
    name: { type:String },
    latitude:{type:Number},
    longitude:{type:Number},
    owner:{type:String,ref:'Users'}
});

var lotesModel = mongoose.model('Lotes',lotesSchema);
autoIncrement.initialize(mongoose.connection);
lotesSchema.plugin(autoIncrement.plugin, {
    model: 'Lotes',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
module.exports = lotesModel;
