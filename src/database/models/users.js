const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsersSchema = new Schema({
    _id:{type:String,required:true},
    user:{type:String,required:true},
    email:{type:String},
    password:{type:String,required:true},
    type:{type:String,required:true},
    lotes:[{type:String, ref:'Lotes'}]
});


module.exports = mongoose.model('Users',UsersSchema);
