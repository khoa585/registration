let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Users = new Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", Users);