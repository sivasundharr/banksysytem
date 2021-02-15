const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    age:{
        type:Number
    },
    address:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    currentBalance:{
        type:Number
    }

});

module.exports = mongoose.model('User',userSchema);