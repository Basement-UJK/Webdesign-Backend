const express = require('express')
const router = express.Router()
const authentication = require('../middleware/auth')
const { 
    getEntries, 
    createEntry,
    updateEntry,
    deleteEntry
} = require('../controller/entriesController')

router.route('/')
    .get(getEntries)
    .post(authentication, createEntry)
    
router.route('/:id')
    .patch(authentication, updateEntry)
    .delete(authentication, deleteEntry)

module.exports = router
