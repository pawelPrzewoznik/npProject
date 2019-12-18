const express = require('express')
const router = express.Router()

const ctrlUser = require('../controllers/users')

router.post('/login', ctrlUser.login)
router.get('/login', ctrlUser.pageLogin)

router.post('/register', ctrlUser.signup)
router.get('/register', ctrlUser.pageRegister)

router.get('/logout', ctrlUser.logout)

router.post('/settings/username', ctrlUser.usernameUpdate)
router.post('/settings/newEmail', ctrlUser.emailUpdate)
router.post('/settings/newPassword', ctrlUser.passwordUpdate)
router.get('/settings', ctrlUser.pageSettings)

router.post('/reset', ctrlUser.reset)
router.get('/reset', ctrlUser.resetPage)

module.exports = router
