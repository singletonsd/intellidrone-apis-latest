const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    user: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    lotes: [{ type: Schema.Types.ObjectId, ref:'Lotes' }],
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', UsersSchema);