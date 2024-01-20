class BaseError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFound extends BaseError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

class BadRequest extends BaseError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

class Forbidden extends BaseError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

class InternalServer extends BaseError {
    constructor(message = "Internal Server Error") {
        super(message, 500);
    }
}

module.exports = { BaseError, BadRequest, Forbidden, InternalServer, NotFound };
