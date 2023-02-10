const Entry = require('../database/models/entry')
const { NotFoundError, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getEntries = async (req, res) => {
    const {id, category, title, user_id } = req.query
    let query =  Entry.query()

    if(id)
        query.findById(id)

    if(category)
        query.where('category', '=', category)  

    if(title)
        query.where('title', 'ilike', `%${title}%`)

    if(user_id)
        query.where('user_id', '=', user_id)
        
    const entries = await query

    res.status(StatusCodes.OK).json(entries)
}

// TODO user should not provide his id in req body
const createEntry = async (req, res) => {
    const data = {
        ...req.body,
        user_id: req.user.id
    }
    const entry = await Entry.query().insert({ ...data })

    if (!entry)
        throw new BadRequestError('Invalid data.')

    res.status(StatusCodes.CREATED).send()
}

const deleteEntry = async (req, res) => {
    const entry = await Entry.query().deleteById(req.params.id)
    if (!entry)
        throw new NotFoundError(`Entry with id: ${req.params.id} not found.`)

    res.status(StatusCodes.OK).send()
}

const updateEntry = async (req, res) => {
    let entry = await Entry.query()
        .findById(req.params.id)
        .patch({ ...req.body })

    if (!entry)
        throw new NotFoundError(`Entry with id: ${req.params.id} not found.`)


    res.status(StatusCodes.OK).send()
}

module.exports = {
    updateEntry,
    deleteEntry,
    getEntries,
    createEntry
}