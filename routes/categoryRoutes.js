const express = require('express')
const router = express.Router()

const {
    getCategories
} = require('../controller/categoriesController')

router.route('/').get(getCategories)

module.exports = router