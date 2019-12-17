const express = require('express')
const router = express.Router()

const ctrlUser = require('../controllers/users')

router.post('/login', ctrlUser.login)
router.get('/login', ctrlUser.pageLogin)

router.post('/register', ctrlUser.signup)
router.get('/register', ctrlUser.pageRegister)

router.get('/logout', ctrlUser.logout)

router.get('/settings', ctrlUser.pageSettings)

module.exports = router
