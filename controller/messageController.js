const Message = require('../database/models/message');
const { StatusCodes } = require('http-status-codes');


const getAllMessages = async (req, res) => {
    const messages = await Message.query();
    res.status(StatusCodes.OK).json(messages);
}

const getMessageById = async (req, res) => {
    const message = await Message.query().findById(req.params.id);
    if (!message) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Message not found' });
    } else {
        res.status(StatusCodes.OK).json(message);
    }
}
const createMessage = async (req, res) =>{
    const messageResponse = await Message.query().insert({ ...req.body });
    res.status(StatusCodes.CREATED).json(messageResponse);
}



const deleteMessageById = async (req, res) => {
    const message = await Message.query().findById(req.params.id);
    if (!message) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Message not found' });
    } else {
        await message.$query().delete();
        res.status(StatusCodes.NO_CONTENT).end();
    }
}


module.exports = {
    getAllMessages,
    getMessageById,
    createMessage,
    deleteMessageById
}
