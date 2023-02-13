const User = require('../database/models/user')
const Entry = require('../database/models/entry')
const { NotFoundError, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getAllUsers = async (req, res) => {
    const users = await User.query()

    let arr = []
    users.map(user => {
        const { password, email, ...user_entity } = user
        arr.push(user_entity)
    })

    res.status(StatusCodes.OK).json(arr)
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
    const user = await User.query().findById(user_id)

    if (!user)
        throw new NotFoundError(`User with id: ${user_id} not found.`)

    if (req.user.id != req.params.id)
        throw new BadRequestError('Only owner can delete his account.')

    const entries = await Entry.query().where('user_id', '=', user_id)

    if (entries.length !== 0)
        throw new BadRequestError(`You have to delete all entries added by user with id: ${user_id}.`)

    await User.query().deleteById(user_id)

    res.status(StatusCodes.OK).send()
}

const updateUser = async (req, res) => {
    const user_id = req.params.id

    if (req.user.id != user_id)
        throw new BadRequestError(`Only owner can update his account or user does't exist.`)

    let data = {}

    data = Object.assign({}, req.body)
    
    const user = await User.query().findById(req.user.id)
    if(req.body.hasOwnProperty('password')){
        const new_password = await user.hashPassword(req.body.password)
        data.password = new_password
    }


    const updated_user =  Object.assign(user, data)

    await updated_user.$query().update(data)

    if (!user)
        throw new NotFoundError(`User with id: ${user_id} not found.`)

    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
}