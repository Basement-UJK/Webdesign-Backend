const User = require('../database/models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const cookieOptions = {
    maxAge: 3600 * 1000, // expires in 1 hour
}

const register = async (req, res) => {
    const user = await User.query().insert({ ...req.body })
    
    if(!user)
        throw new BadRequestError('Invalid data.')

    const token = user.createJWT()
    res.cookie('jwt', token, cookieOptions).status(StatusCodes.OK).json({jwt: token})
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        throw new BadRequestError('Please provide email and password.')

    const user = (await User.query().where('email', '=', email))[0]
    if (!user)
        throw new UnauthenticatedError('Invalid Credentials')

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect)
        throw new UnauthenticatedError('Invalid Credentials.')


    const token = user.createJWT()
    res.cookie('jwt', token, cookieOptions).status(StatusCodes.OK).json({ jwt: token })
}

module.exports = {
    register,
    login,
}
