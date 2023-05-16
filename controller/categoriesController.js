const Category = require('../database/models/category')
const { NotFoundError, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getCategories = async (req, res) => {
    const categories = await Category.query();
    res.status(StatusCodes.OK).json(categories);
}

module.exports = {
    getCategories
}