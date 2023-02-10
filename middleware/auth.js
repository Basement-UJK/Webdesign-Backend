const { UnauthenticatedError } = require('../errors')

const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }
    const token = authHeader.split(' ')[1]

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