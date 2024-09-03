const mongoose = require("mongoose")
const Schema = mongoose.Schema

userEventSchema = new Schema({
    userId: {type:String, required: true},
    date: {type:Date, required: true},
    event_type: {type:String, required: true},
    duration: Number,
    description: {type:String, required: true},
    data: {
        type: Object
    }
 })
 
let UserEvent = mongoose.model("UserEvent", userEventSchema)
module.exports = UserEvent