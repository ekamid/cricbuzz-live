const { rateLimit } = require('express-rate-limit');
const { env } = require("../config/env");
const HttpResponse = require("../core/response/httpResponse");

/**
 * Express Rate Limit
 * @returns
 */
const expressRateLimit = () => {
    const delay = 60 * 1000;

    return rateLimit({
        windowMs: delay, // 15 minutes
        max: env.RATE_LIMIT, // Limit each IP to 100 requests per `window`
        handler: (
            _req,
            res,
            _next,
            options
        ) => {
            const httpResponse = HttpResponse.get({
                code: options.statusCode,
                message: options.message,
            });

            res.status(options.statusCode).json(httpResponse);
        },
    });
};

module.exports = { expressRateLimit };
