const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
    {
        name:{type:String, require:true},
        stadium:{type:String, require:true},
        players: [{ type: Schema.Types.ObjectId, ref: "players", required: true }],
        author: { type: Schema.Types.ObjectId, ref: "users", required: true }
    },
    {timestamps:true}
);

const Team = mongoose.model("teams",TeamSchema);

module.exports = Team;