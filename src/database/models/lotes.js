const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lotesSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    name: { type:String, required: true },
    latitude:{ type:Number },
    longitude:{ type:Number },
    owner:{ type: Schema.Types.ObjectId, ref:'Users' },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lotes',lotesSchema);