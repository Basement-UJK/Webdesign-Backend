const express = require('express');
const router = express.Router();
const authentication = require('../middleware/auth')
const {
    getAllMessages,
    getMessageById,
    createMessage,
    deleteMessageById
} = require('../controller/messageController');

// GET all messages
router.get('/', getAllMessages);

// GET message by ID
router.get('/:id', getMessageById);

// CREATE message
router.post('/', createMessage);

// DELETE message by ID
router.delete('/:id',authentication, deleteMessageById);

module.exports = router;
