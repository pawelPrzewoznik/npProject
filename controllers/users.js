const simplecrypt = require('simplecrypt')
const jwt = require('jsonwebtoken')
const sc = simplecrypt()

const User = require('../models/users')

exports.pageLogin = (req, res, next) => {
  return res.render('login', ({ fromRegister: false, failLogin: '' }))
}

exports.pageRegister = (req, res, next) => {
  return res.render('register', ({ failRegister: false }))
}

exports.signup = (req, res, next) => {
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
  console.log('Dans login')
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log('Dans then')
      // Si pas d'Utilisateur return une erreure
      if (!user) {
        return res.status(404).render('login', ({ fromRegister: false, failLogin: 'User does not exist' }))
      }
      // Si user est true on compare les mdp avec bcrypt
      console.log(sc.decrypt(user.password))
      var password = sc.decrypt(user.password)
      console.log(password + ' / ' + req.body.password)
      if (password !== req.body.password) {
        return res.status(400).render('login', ({ fromRegister: false, failLogin: 'Wrong password' }))
      }
      // Si le mdp est correct envoie l'id et un token de connexion au front
      console.log('ok')
      res.status(200).redirect('http://localhost:3000')
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
