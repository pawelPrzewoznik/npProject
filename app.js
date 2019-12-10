const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const newsRoute = require('./routes/news')
const userRoute = require('./routes/users')

const app = express()

app.set('view engine', 'ejs')

mongoose.connect('mongodb+srv://Pawel:root@cluster0-g16d5.mongodb.net/News?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

// Autorise tout le monde à utiliser notre api
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

// Prend la req de chaque url et la transform en json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', newsRoute)
app.use('/auth', userRoute)

module.exports = app
