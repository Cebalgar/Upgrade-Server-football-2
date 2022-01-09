const dotenv = require("dotenv");
dotenv.config(); //configuro mi dotenv y arrancarlo

const mongoose = require("mongoose");

const mongoDB=process.env.MONGO_DB;

const connect = async()=>{
    try{
        const db = await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); 
          const {name,host} = db.connection;
          console.log(`Conectado con la base de datos:${name}, en el host:${host}`);
        
    }catch(error){
        console.log("Error conectando con la base de datos", error);
    }
};
module.exports = {connect};

