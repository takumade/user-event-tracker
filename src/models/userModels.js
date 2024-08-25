const mongoose = require("mongoose")
const Schema = mongoose.Schema

userSchema = new Schema({
    username: {type: String, required: true}
  })
  

let User = mongoose.model("User", userSchema)
module.exports = User