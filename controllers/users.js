const simplecrypt = require('simplecrypt')
const sc = simplecrypt(
  { password: process.env.PASSWORD_CRYPT },
  { salt: process.env.SALT_CRYPT }
)

const User = require('../models/users')

exports.pageLogin = (req, res, next) => {
  return res.render('login', ({ fromRegister: false, failLogin: '', connected: false, logOk: false }))
}

exports.pageRegister = (req, res, next) => {
  return res.render('register', ({ failRegister: false, connected: false }))
}

exports.pageSettings = (req, res, next) => {
  if (req.session) {
    User.findOne({ _id: req.session.user_id })
      .then(user => {
        if (user) {
          if (user.status === 2) {
            console.log(getAll() + '2')
            return res.render('settings.ejs', ({ status: user.status, adminInfo: getAll(), connected: true, username: user.username, userEmail: user.email }))
          } else if (user.status === 1) {
            return res.render('settings.ejs', ({ status: user.status, connected: true, username: user.username, userEmail: user.email }))
          }
        }
      })
      .catch(error => res.render('login',
        ({ fromRegister: false, failLogin: 'Error to get to settings ' + error, connected: false, logOk: false })))
  } else {
    return res.render('login', ({ fromRegister: false, failLogin: 'You need to be connected to get to your settings', connected: false, logOk: false }))
  }
}
async function getAll () {
  var users = await User.find({})
  return users
}

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(500).render('register',
          ({ failRegister: false, wrongEmail: 'Email is already used', connected: false }))
      }
    })
    .catch(error => res.status(500).render('register', ({ failRegister: true, error: error, connected: false })))
  const hash = sc.encrypt(req.body.password)
  // Ajout d'un nouvel user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    status: 1
  })
  // Sauvegarde de l'user dans la bd
  user.save()
    .then(() => res.status(201).render('login', ({ fromRegister: true, failLogin: '', logOk: false, connected: false })))
    .catch(error => res.status(500).render('register', ({ failRegister: true, error: error, connected: false })))
}

exports.login = (req, res, next) => {
  // Cherche l'email dans la bd
  User.findOne({ email: req.body.email })
    .then(user => {
      // Si pas d'Utilisateur return une erreure
      if (!user) {
        return res.status(404).render('login',
          ({ fromRegister: false, failLogin: 'User does not exist', logOk: false, connected: false }))
      }
      // Si user est true on vérifie le mdp
      var password = sc.decrypt(user.password)
      if (password !== req.body.password) {
        return res.status(400).render('login',
          ({ fromRegister: false, failLogin: 'Wrong password', logOk: false, connected: false }))
      }
      // Si le mdp est correct enregistrement des info dans la session et redirection vers une page de connexion confirmée
      req.session.user_id = user._id
      req.session.username = user.username
      req.session.user_status = user.status
      req.session.userEmail = user.email
      console.log(req.session)
      res.render('login', ({ fromRegister: false, logOk: true, connected: true }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.logout = (req, res, next) => {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/en')
      }
    })
  }
}
