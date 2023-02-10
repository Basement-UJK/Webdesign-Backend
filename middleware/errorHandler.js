const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
    };

    if (typeof err.nativeError !== 'undefined') {

        if (err.nativeError.code === '42703'){
           customError.msg = 'Some field in table does not exist.'
           customError.statusCode = StatusCodes.BAD_REQUEST
        }

    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
