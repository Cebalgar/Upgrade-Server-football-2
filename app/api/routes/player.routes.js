const express = require("express");
const router = express.Router();

//importo isAuth
const { isAuth } = require("../../middlewares/auth.middleware");
const fileMiddlewares = require('../../middlewares/file.middleware');

const{ getAllPlayers, getPlayerById,createPlayers,modifyPlayer,deletePlayer} = require("../controllers/player.controller");

router.get("/",  getAllPlayers);
router.get("/:playerId", getPlayerById);
router.post("/",[fileMiddlewares.upload.single('picture')], [isAuth], createPlayers )
router.put("/:playerId",[isAuth], modifyPlayer)
router.delete("/:playerId", [isAuth], deletePlayer)

module.exports = router;