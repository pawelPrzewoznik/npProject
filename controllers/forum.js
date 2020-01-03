
exports.homePage = (req, res, next) => {
  var isConnected = false
  if (req.body.session) {
    isConnected = true
  }
  res.render('forum', { connected: isConnected, form: false })
}

exports.newThread = (req, res, next) => {
  var isConnected = false
  if (req.body.session) {
    isConnected = true
    res.render('forum', { connected: isConnected, form: true })
  }
  res.render('login', { connected: isConnected, failLogin: 'You need to be connected to creat a new thread', fromRegister: false, logOk: false })
}
