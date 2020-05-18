const simplecrypt = require('simplecrypt')
const nodemailer = require('nodemailer')
const sc = simplecrypt(
  { password: process.env.PASSWORD_CRYPT },
  { salt: process.env.SALT_CRYPT }
)

const User = require('../models/users')

exports.pageLogin = (req, res) => {
  return res.render('login', ({ fromRegister: false, failLogin: '', connected: false, logOk: false }))
}

exports.pageRegister = (req, res) => {
  return res.render('register', ({ failRegister: false, connected: false }))
}

exports.pageSettings = (req, res) => {
  if (req.session) {
    User.findOne({ _id: req.session.user_id })
      .then(async user => {
        if (user) {
          if (user.status === 2) {
            const all = await getAll()
            return res.render('settings.ejs', ({ status: user.status, adminInfo: all, connected: true, username: user.username, userEmail: user.email }))
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

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(500).render('register',
          ({ failRegister: false, wrongEmail: 'Email is already used', connected: false }))
      } else {
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
    })
    .catch(error => res.status(500).render('register', ({ failRegister: true, error: error, connected: false })))
}

exports.login = (req, res) => {
  // Cherche l'email dans la bd
  User.findOne({ email: req.body.email })
    .then(user => {
      // Si pas d'Utilisateur return une erreure
      if (!user) {
        return res.status(404).render('login',
          ({ fromRegister: false, failLogin: 'User does not exist', logOk: false, connected: false }))
      }
      // Si user est true on vérifie le mdp
      let password = sc.decrypt(user.password)
      if (password !== req.body.password) {
        return res.status(400).render('login',
          ({ fromRegister: false, failLogin: 'Wrong password', logOk: false, connected: false }))
      }
      // Si le mdp est correct enregistrement des info dans la session et redirection vers une page de connexion confirmée
      req.session.user_id = user._id
      req.session.username = user.username
      req.session.user_status = user.status
      req.session.userEmail = user.email
      req.session.connected = true
      res.render('login', ({ fromRegister: false, logOk: true, connected: true }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.logout = (req, res) => {
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

exports.usernameUpdate = (req, res) => {
  if (req.session) {
    User.updateOne({ _id: req.session.user_id }, { username: req.body.username })
      .then(() => res.redirect('/auth/settings'))
      .catch(error => res.json({ error }))
  } else {
    return res.render('login', ({ fromRegister: false, failLogin: 'You need to be connected to get there', connected: false, logOk: false }))
  }
}

exports.emailUpdate = (req, res) => {
  if (req.session) {
    User.findOne({ email: req.body.newEmail })
      .then(user => {
        if (!user) {
          User.updateOne({ _id: req.session.user_id }, { email: req.body.newEmail })
            .then(() => res.redirect('/auth/settings'))
            .catch(error => res.json({ error }))
        } else {
          res.redirect('/auth/settings')
        }
      })
      .catch(error => res.json({ error }))
  } else {
    return res.render('login', ({ fromRegister: false, failLogin: 'You need to be connected to get there', connected: false, logOk: false }))
  }
}

exports.passwordUpdate = (req, res) => {
  if (req.session) {
    if (req.body.pwd === req.body.pwd2) {
      const password = sc.encrypt(req.body.pwd)
      User.updateOne({ _id: req.session.user_id }, { password: password })
        .then(() => res.redirect('/auth/settings'))
        .catch(error => res.json({ error }))
    } else {
      res.redirect('/auth/settings')
    }
  } else {
    return res.render('login', ({ fromRegister: false, failLogin: 'You need to be connected to get there', connected: false, logOk: false }))
  }
}

exports.resetPage = (req, res) => {
  if (req.session.connected === true) {
    res.render('reset', ({ connected: true, message: false }))
  } else {
    res.render('reset', ({ connected: false, message: false }))
  }
}

exports.reset = (req, res) => {
  if (req.session.connected === true) {
    res.render('reset', ({ connected: true, message: false }))
  } else {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          let newCode = require('crypto').randomBytes(16).toString('hex')
          const password = sc.encrypt(newCode)
          User.updateOne({ email: req.body.email }, { password: password })
            .then(() => {
              let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                auth: {
                  type: 'login',
                  user: process.env.EMAIL,
                  pass: process.env.EMAIL_PASSOWRD
                }
              })
              let mailOption = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Your new password',
                text: 'Your new password is : ' + newCode + '. \n Please change your password again once you log into your account !\n' + '        --Your friends at News Board'
              }
              transporter.sendMail(mailOption, function (error, info) {
                if (error) {
                  console.log(transporter.options.host)
                  console.error(error)
                } else {
                  console.log('Email sent: ' + info.response)
                  res.redirect('/auth/login')
                }
              })
            })
            .catch(error => res.json({ error }))
        } else {
          res.render('reset', ({ connected: false, message: true }))
        }
      })
      .catch(error => res.json({ error }))
  }
}

exports.statusUpdate = (req, res) => {
  if (req.session && req.session.user_status === 2) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
    let emailUser = req.params.email.match(regex)
    User.findOne({ email: emailUser })
      .then(user => {
        if (user) {
          let status = req.body.status === 'admin' ? 1 : 2
          User.updateOne({ email: emailUser }, { status: status })
            .then(res.redirect('/auth/settings'))
            .catch(error => res.json({ error }))
        } else {
          res.redirect('/auth/settings')
        }
      })
      .catch(error => res.json({ error }))
  } else {
    res.redirect('/auth/login')
  }
}

exports.ban = (req, res) => {
  if (req.session && req.session.user_status === 2) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
    let emailUser = req.params.email.match(regex)
    User.findOne({ email: emailUser })
      .then(user => {
        if (user) {
          User.deleteOne({ email: emailUser })
            .then(res.redirect('/auth/settings'))
            .catch(error => res.json({ error }))
        } else {
          res.redirect('/auth/settings')
        }
      })
      .catch(error => res.json({ error }))
  } else {
    res.redirect('/auth/login')
  }
}

async function getAll () {
  return await User.find({})
}
