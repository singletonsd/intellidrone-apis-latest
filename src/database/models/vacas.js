const mongoose = require('mongoose');
const { Schema } = mongoose;

const VacasSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String },
    sex: { type: String, enum: ['Hembra', 'Macho'], },
    months: { type: Number },
    weight: { type: Number },
    actividades: [{ type: mongoose.Schema.ObjectId, ref: 'Actividades' }],
    location: { type: String, ref: 'Users' },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vacas', VacasSchema);