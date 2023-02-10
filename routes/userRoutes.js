const express = require('express')
const router = express.Router()

const {
    getAllUsers, 
    getUser,
    deleteUser,
    updateUser
} = require('../controller/userController')

const authentication = require('../middleware/auth')

router.route('/')
    .get(getAllUsers)

router.route('/:id')
    .get(getUser)
    .patch(authentication, updateUser)
    .delete(authentication, deleteUser)

module.exports = router

