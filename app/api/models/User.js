const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //módulo bcrypt para encriptar las contraseñas.
const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, trim: true, required: true },
  emoji: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  favTeams: [{ type: Schema.Types.ObjectId, ref: "teams" }], 
},
{
  timestamps:true,
}
);

//almacenar la contraseña encriptada
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const User = mongoose.model("users", UserSchema);
module.exports = User;