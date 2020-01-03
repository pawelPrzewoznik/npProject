const express = require('express')
const router = express.Router()

const ctrlForum = require('../controllers/forum')

router.get('/newThread', ctrlForum.newThread)
router.get('/', ctrlForum.homePage)

module.exports = router
