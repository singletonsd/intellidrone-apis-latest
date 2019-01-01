const mongoose = require('mongoose');
const {Schema} = mongoose;

const ActividadesSchema = new Schema({
    vaca:[{type:String, ref:'Vaca'}],
    sampleDate:{type:Date},
    latitude:{type:Number},
    longitude:{type:Number},
    colectionDate:{type:Date},
    insertDate:{type:Date},
    hdop:{type:Number},
    satellites:{type:Number},
    signal:{type:Number},
    voltage:{type:Number},
    tag:{type:String},
    connectionsAttempts:{type:Number}
});


module.exports = mongoose.model('Actividades',ActividadesSchema);
