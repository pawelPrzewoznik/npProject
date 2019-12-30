const express = require('express')
const router = express.Router()

const ctrlNews = require('../controllers/news')
// const auth = require('../middleware/auth')

router.get('/en', ctrlNews.topEn)

router.get('/en/Business', ctrlNews.topEnBusiness)
router.get('/en/Entertainment', ctrlNews.topEnEnt)
router.get('/en/Health', ctrlNews.topEnHealth)
router.get('/en/Science', ctrlNews.topEnScience)
router.get('/en/Sports', ctrlNews.topEnSports)
router.get('/en/Technology', ctrlNews.topEnTec)

router.get('/', ctrlNews.topFr)
router.get('/fr', ctrlNews.topFr)

router.get('/Business', ctrlNews.topFrBusiness)
router.get('/Divertissement', ctrlNews.topFrEnt)
router.get('/Sante', ctrlNews.topFrSante)
router.get('/Science', ctrlNews.topFrScience)
router.get('/Sports', ctrlNews.topFrSports)
router.get('/Technologie', ctrlNews.topFrTec)

module.exports = router
