const mongoose = require('mongoose');
const {Schema} = mongoose;

const VacasSchema = new Schema({
    _id: { type:String,required:true },
    name: { type:String },
    sex: { type:String },
    months: { type:Number },
    weight: { type:Number },
    actividades:[ { type:mongoose.Schema.ObjectId, ref:'Actividades'}],
    location:{type:String,ref:'Users'}
});


module.exports = mongoose.model('Vacas',VacasSchema);
