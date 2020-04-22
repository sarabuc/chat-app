const mongoose  = require("mongoose");
//const config = require("config");
const db= process.env.MONGODB_URI;
console.log(db);

const connectDB = async() =>{
    try{
        mongoose.connect(db,{
            useCreateIndex:true, 
            useNewUrlParser:true,
            useFindAndModify:false
        });
        console.log("connected to database");
    
    } catch(err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;