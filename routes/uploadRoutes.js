const express = require('express')
const router = express.Router()
const authentication = require('../middleware/auth')
const {
    getURL,
} = require('../controller/uploadController')

router.route('').get(authentication,getURL)

module.exports = router

