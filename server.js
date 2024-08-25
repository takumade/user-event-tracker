const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bodyParser = require("body-parser")
const moment = require("moment")


const generalRouter = require("./src/routes/generalRoutes")
const usersRouter = require('./src/routes/userRoutes')

mongoose.connect(process.env['MONGOOSE_URL'], { useNewUrlParser: true },  { useUnifiedTopology: true })

app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(express.static('public'))

app.use('/', generalRouter)
app.use('/api/users', usersRouter)




let User = mongoose.model("User", userSchema)
let Exercise = mongoose.model("Exercise", exerciseSchema)



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
