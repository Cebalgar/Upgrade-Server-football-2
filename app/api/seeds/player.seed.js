const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Player = require('../models/Player');


const players = [
    {
        "name": "Jokin", 
        "surname": "Ezkieta", 
        "age": 25,
        "demarcation": "Portero",
        "countrie": "España"
    }, 
    {
        "name": "Denis", 
        "surname": "Suárez", 
        "age": 27,
        "demarcation": "Centrocampista",
        "countrie": "España"
    }, 
    {
        "name": "Isco", 
        "surname": "Alarcón", 
        "age": 29,
        "demarcation": "Centrocampista",
        "countrie": "España"
    }, 
    {
        "name": "Shkodran", 
        "surname": "Mustafi", 
        "age": 29,
        "demarcation": "Defensa",
        "countrie": "Alemania"
    }, 
    {
        "name": "Carlos Henrique", 
        "surname": "Casimiro", 
        "age": 29,
        "demarcation": "Centrocampista",
        "countrie": "Brasil"
    }, 
    {
        "name": "Sergio", 
        "surname": "Moreno", 
        "age": 23,
        "demarcation": "Delantero Centro",
        "countrie": "España"
    }, 
    
];


mongoose
  .connect("mongodb+srv://Balgarce:Balgarce77@cluster0.okbtd.mongodb.net/server-football?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(async () => {
    
    const allPlayers = await Player.find();//encuentra los es player de la BD.
   
    if (allPlayers.length) {
    await Player.collection.drop(); // si la colección tiene algo me lo borra.
    console.log('Base de datos Dropeada')
}
})
.catch((err) => console.log(`Error borrarndo la base de datos: ${err}`))
.then(async () => {
    
    await Player.insertMany(players);// una vez borrada la BD nos inserta toda la colección.
    console.log('Base de Datos Creada')
})
.catch((err) => console.log(`Error al crear la base de datos: ${err}`))

.finally(() => mongoose.disconnect());