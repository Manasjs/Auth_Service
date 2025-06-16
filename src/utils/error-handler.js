const { StatusCodes} = require('http-status-codes');
class AppErrors extends Error {
    constructor(
        name = 'AppError',
        message ='somthing went wrong',
        explanation ='somthing went wrong',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super();
        this.message=message,
        this.explanation = explanation,
        this.name=name,
        this.statusCode = statusCode

    }
}

module.exports = AppErrors;