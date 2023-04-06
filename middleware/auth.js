const { UnauthenticatedError } = require('../errors')

const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {

    const token = req.cookies.jwt

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
     
        const { id, first_name, last_name } = decoded
        req.user = { id, first_name, last_name }
        next()

    }
    catch (e) {
        throw new UnauthenticatedError('No authorized to acces this route')
    }
}

module.exports = authentication