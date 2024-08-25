const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require("mongoose")

const bodyParser = require("body-parser")
const moment = require("moment")

const generalRouter = require("./src/routes/generalRoutes")
const usersRouter = require('./src/routes/userRoutes')
const eventsRouter = require('./src/routes/eventsRoutes')


mongoose.connect(process.env['MONGOOSE_URL'], { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())
app.use(express.static('public'))

app.use('/', generalRouter)
app.use('/api/users', usersRouter)
app.use('/api/events', eventsRouter)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
