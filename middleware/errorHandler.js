const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
    };

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
