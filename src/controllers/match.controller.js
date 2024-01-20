
const asyncHandler = require("express-async-handler");
const route = require('../routes/v1');
const HttpResponse = require('../core/response/httpResponse');

route.get(
    '/matches',
    asyncHandler(async function getMatches(req, res) {
        const httpResponse = HttpResponse.get({ message: "Matches data successfull retrived" });
        res.status(200).json(httpResponse);
    })
);

module.exports = route;
