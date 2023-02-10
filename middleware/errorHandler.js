const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
    };

    if (typeof err.nativeError !== 'undefined') {
        // console.log(err.nativeError)
        customError.statusCode = StatusCodes.BAD_REQUEST

        if (err.nativeError.code === '42703'){
           customError.msg = 'Some field in table does not exist.'
        }
        if (err.nativeError.code === '23502') {
            customError.msg = 'Invalid body.'

        }
        if (err.nativeError.code === '23505') {
            customError.msg = 'Email is taken.'
        }


    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
