require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const favicon = require('serve-favicon')
const path = require('path')

const newsRoute = require('./routes/news')
const userRoute = require('./routes/users')
const forumRoute = require('./routes/forum')

const app = express()

// favicon not functional
app.use(favicon(path.join(__dirname, 'views', 'img', 'news2.ico')))

app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(session({ secret: 'sssssshhhhhh' }))

mongoose.connect(process.env.DB_CONNECT, {
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
app.use('/forum', forumRoute)

module.exports = app
