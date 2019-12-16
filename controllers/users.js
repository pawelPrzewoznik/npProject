const simplecrypt = require('simplecrypt')
const jwt = require('jsonwebtoken')
const sc = simplecrypt(
  { password: process.env.PASSWORD_CRYPT },
  { salt: process.env.SALT_CRYPT }
)

const User = require('../models/users')

exports.pageLogin = (req, res, next) => {
  return res.render('login', ({ fromRegister: false, failLogin: '' }))
}

exports.pageRegister = (req, res, next) => {
  return res.render('register', ({ failRegister: false }))
}

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(500).render('register', ({ failRegister: false, wrongEmail: 'Email is already used' }))
      }
    })
    .catch(error => res.status(500).render('register', ({ failRegister: true, error: error })))
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
    .then(() => res.status(201).render('login', ({ fromRegister: true, failLogin: '' })))
    .catch(error => res.status(500).render('register', ({ failRegister: true, error: error })))
}

exports.login = (req, res, next) => {
  // Cherche l'email dans la bd
  User.findOne({ email: req.body.email })
    .then(user => {
      // Si pas d'Utilisateur return une erreure
      if (!user) {
        return res.status(404).render('login', ({ fromRegister: false, failLogin: 'User does not exist' }))
      }
      // Si user est true on compare les mdp avec bcrypt
      var password = sc.decrypt(user.password)
      if (password !== req.body.password) {
        return res.status(400).render('login', ({ fromRegister: false, failLogin: 'Wrong password' }))
      }
      // Si le mdp est correct envoie l'id et un token de connexion au front
      res.status(200)
        .json({
          userId: user._id,
          token: jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        })
    })
    .catch(error => res.status(500).json({ error }))
}
