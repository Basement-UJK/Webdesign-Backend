const User = require('../database/models/user')
const Entry = require('../database/models/entry')
const { NotFoundError, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getAllUsers = async (req, res) => {
    const users = await User.query()

    res.status(StatusCodes.OK).json(users)
}

const getUser = async (req, res) => {
    const user = await User.query().findById(req.params.id)

    if (!user)
        throw new NotFoundError(`User with id: ${req.params.id} not found.`)

    // create new object without password 
    const { password, email, ...user_entity } = user

    res.status(StatusCodes.OK).json(user_entity)
}

const deleteUser = async (req, res) => {

    const user_id = req.params.id
    const user = await User.query.findById(user_id)

    if(!user)
        throw new NotFoundError(`User with id: ${user_id} not found.`)

    const entries = await Entry.query.where('user_id', '=', user_id)

    if(entries.length !== 0)
        throw new BadRequestError(`You have to delete all entries added by user with id: ${user_id}.`)
    
    await User.query().deleteById(user_id)

    res.status(StatusCodes.OK).send()
}

const updateUser = async (req, res) => {
    const user_id = req.params.id 

    if(req.user.id != user_id)
        throw new BadRequestError(`Only owner can update his account or user does't exist.`) 

    const user = await User.query().findById(user_id).patch({ ...req.body })

    if(!user)
        throw new NotFoundError(`User with id: ${user_id} not found.`)
    
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
}