const mongoose = require('mongoose');
const { Schema } = mongoose;

const VacasSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String },
    sex: { type: String, enum: ['Hembra', 'Macho'], },
    reference: { type: String, required: true, unique: true},
    months: { type: Number },
    weight: { type: Number },
    actividades: [{ type: mongoose.Schema.ObjectId, ref: 'Actividades' }],
    location: { type: mongoose.Schema.ObjectId, ref: 'Lotes' },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vacas', VacasSchema);