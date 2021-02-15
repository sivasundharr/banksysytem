const mongoose = require('mongoose');

const connectDB = async()=>{

    try{

        const conn = await mongoose.connect('mongodb+srv://Velsiva:siva@cluster0.1epen.mongodb.net/banksystem?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log(`DB connected ${conn.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1)
    }

}

module.exports = connectDB;