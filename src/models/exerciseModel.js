const mongoose = require("mongoose")
const Schema = mongoose.Schema

exerciseSchema = new Schema({
    userId: {type:String, required: true},
    date: {type:Date, required: true},
    duration: Number,
    description: {type:String, required: true}
 })
 
let Exercise = mongoose.model("Exercise", exerciseSchema)
module.exports = Exercise