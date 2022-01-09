const Player = require("../models/Player");//importamos el módelo

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");//importo fichero fallos.


//MÉTODOS

const getAllPlayers = async (req, res, next) => {
  try {
    
    
        const players = await Player.find();
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { players: players },
        });
     
  } catch (err) {
    return next(err);
  }
};

const getPlayerById = async (req, res, next) => {
  try {
    const { playerId } = req.params;
    const playerById = await Player.findById(playerId);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { players: playerById }
    });
  } catch (err) {
    return next(err);
  }
};

//MÉTODOS POST, PUT, DELETE
const createPlayers = async(req, res, next)=>{
  try {
    const playerPicture = req.file ? req.file.filename:null;

    const newPlayer = new Player();
    newPlayer.name = req.body.name;
    newPlayer.surname = req.body.surname;
    newPlayer.age = req.body.age;
    newPlayer.demarcation = req.body.demarcation;
    newPlayer.countrie = req.body.countrie;
    newPlayer.picture= playerPicture;

    const playerDB = await newPlayer.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: playerDB,
    });
    
  } catch (error) {
    return next(error)
    
  }
};

const modifyPlayer = async(req , res, next)=>{
  try {
      const {playerId} = req. params;
      const playerModify = new Player(req.body);
      playerModify._id = playerId;

      const playerUpdated = await Player.findByIdAndUpdate(playerId , playerModify,{new: true});
      return res.json({
          status:200,
          message: HTTPSTATUSCODE[200],
          data: playerUpdated,
      });

      
  } catch (error) {
      return next(error);
      
  }
}

const deletePlayer = async(req, res, next)=>{
  try {
    const { playerId } = req.params;
    const playerDeleted = await Player.findByIdAndDelete(playerId);
    return res.json({
      status:200,
      message: HTTPSTATUSCODE[200],
      data: playerDeleted
    });
    
  } catch (error) {
    return next(error)
    
  }
};



//Exportamos las funciones
module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayers,
  modifyPlayer,
  deletePlayer

}