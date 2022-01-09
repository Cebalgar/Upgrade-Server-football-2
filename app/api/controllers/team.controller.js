
const Team = require("../models/Team");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

//MÉTODOS

// Método para crear una nueva paleta
const createTeam = async (req, res, next) => {
  try {
    //console.log("req.authority", req.authority)
    const newTeam = new Team();
    newTeam.name = req.body.name;
    newTeam.stadium = req.body.stadium;
    newTeam.players = req.body.players;
    newTeam.author = req.authority.id;  ///este id usuario lo sacamos del token/user logueado
    
    
    const teamDb = await newTeam.save()
    
    
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: { teams: teamDb }
    });
  } catch (error) {
    return next(error);
  }
}

//Método para obtener todas las paletas registradas en la base de datos
const getAllTeams = async (req, res, next) => {
  try {
    
      const teams = await Team.find().populate("players");
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { teams: teams },
      });
    
  } catch (error) {
    return next(error);
  }
};

// Método para obtener paletas por ID
const getTeamsById = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const teamDb = await Team.findById(teamId).populate("players");
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { team: teamDb },
    });
  } catch (error) {
    return next(error);
  }
};

//Método para eliminar paletas
const deleteTeamById = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const authority = req.authority.id
    const userTeam = await Team.findById(teamId)

    if (authority == userTeam.author._id) {

      const teamDeleted = await Team.findByIdAndDelete(teamId);
      if (!teamDeleted) {
        return res.json({
          status: 200,
          message: "There is not a team with that Id",
          data: null
        })
      } else {
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { teams: teamDeleted },
        });
      }
    } else {
      return res.json({
        status: 403,
        message: HTTPSTATUSCODE[403],
        data: null
      })
    }
  } catch (error) {
    return next(error);
  }
};

//Metodo para actualizar algun registro de la base de datos
const updateTeamById = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const authority = req.authority.id
    const userTeam = await Team.findById(teamId)

    if (authority == userTeam.author._id) {

      const teamToUpdate = new Team();
      if (req.body.name) teamToUpdate.name = req.body.name;
      if (req.body.stadium) teamToUpdate.description = req.body.stadium;
      if (req.body.players) teamToUpdate.players = req.body.players;
      teamToUpdate._id = teamId;

      const teamUpdated = await Team.findByIdAndUpdate(teamId, teamToUpdate);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { teams: teamUpdated }
      });
    } else {
      return res.json({
        status: 403,
        message: HTTPSTATUSCODE[403],
        data: null
      })
    }

  } catch (error) {
    return next(error);
  }
}

//Metodo para obtener los documentos de la bd segun el usuario que lo ha creado
const getAllTeamsByUser = async (req, res, next) => {
  try {
    const author = req.authority.id;

    
      const allTeamsByUser = await Team.find({ author: author }).populate("players");
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { teams: allTeamsByUser },
      });
  
  } catch (error) {
    return next(error)
  }
}
//Exportamos la funciones
module.exports = {
  createTeam,
  getAllTeams,
  getTeamsById,
  deleteTeamById,
  updateTeamById,
  getAllTeamsByUser
}