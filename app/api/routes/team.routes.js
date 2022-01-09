//importamos Router de express
const express = require("express");
const router = express.Router();
//importamos nuestro middleware
const { isAuth } = require("../../middlewares/auth.middleware");

const {
    createTeam,
    getAllTeams,
    getTeamsById,
    deleteTeamById,
    updateTeamById,
    getAllTeamsByUser
} = require("../controllers/team.controller");


router.post("/", [isAuth], createTeam);
router.get("/", [isAuth], getAllTeams);
router.get("/teamsbyuser", [isAuth], getAllTeamsByUser)
router.get("/:teamsId", [isAuth], getTeamsById);
router.delete("/:teamId", [isAuth], deleteTeamById)
router.put("/:teamId", [isAuth], updateTeamById)


module.exports = router;