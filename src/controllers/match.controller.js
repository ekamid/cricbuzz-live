
const asyncHandler = require("express-async-handler");
const route = require('../routes/v1');
const HttpResponse = require('../core/response/httpResponse');
const { fetchScore } = require("../scripts/fetchData");

route.get(
    '/matches',
    asyncHandler(async function getMatches(req, res) {
        const httpResponse = HttpResponse.get({ message: "Matches data successfull retrived" });
        res.status(200).json(httpResponse);
    })
);

route.get(
    '/score/:matchId',
    asyncHandler(async function getMatches(req, res) {

        const { matchId } = req.params;

        const score = await fetchScore(matchId)

        const httpResponse = HttpResponse.get({ message: "Matches data successfull retrived", data: score });
        res.status(200).json(httpResponse);
    })
);

module.exports = route;
