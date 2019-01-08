const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActividadesSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    vaca: { type: mongoose.Schema.ObjectId, ref: 'Vacas' },
    sampleDate: { type: Date },
    latitude: { type: Number },
    longitude: { type: Number },
    collectingDate: { type: Date },
    insertDate: { type: Date },
    hdop: { type: Number },
    satellites: { type: Number },
    signal: { type: Number },
    voltage: { type: Number },
    tag: { type: String },
    connectionsAttempts: { type: Number },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Actividades', ActividadesSchema);