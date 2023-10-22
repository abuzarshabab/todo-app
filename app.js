const bodyParser = require('body-parser')
const express = require('express')
const mongoConnect = require('./database/connection')
const routes = require('./routes/router')

require('dotenv').config()

const app = express()
mongoConnect()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/hello-upscale', (req, res) => {
  res.send({ message: "Welcome to the upscale world"}).status(200)
})

app.use('/', routes)

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) { console.log("Error in server setup") }
  console.log("Server is listening on localhost:", process.env.SERVER_PORT)
})


process.on('uncaughtException', (execption) => {
  console.log('Exception occured :', execption)
})

