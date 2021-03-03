const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    senderName:{
        type:String,
    },
    receiverName:{
        type:String,
        required:true
    },
    receiverEmail:{
        type:String,
        required:true
    },
    transferAmount:{
        type:Number,
        default:0
    },
    sender:{
        type : mongoose.Schema.Types.ObjectId,
        ref :'User'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Transaction',TransactionSchema);