const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema(
    {
        name:{type:String, require:true},
        surname:{type:String, require:true},
        age:{type:Number},
        demarcation:{type:String},
        countrie:{type:String, require:true},
        picture: {type:String}

    },
    {timestamps:true}
);

const Player = mongoose.model("players",PlayerSchema);

module.exports = Player;