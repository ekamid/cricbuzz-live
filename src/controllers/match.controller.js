
const asyncHandler = require("express-async-handler");
const route = require('../routes/v1');
const HttpResponse = require('../core/response/httpResponse');
const { fetchScore, fetchMatches } = require("../scripts/fetchData");

route.get(
    '/matches/:type',
    asyncHandler(async function getMatches(req, res) {
        const { type } = req.params;

        const matches = await fetchMatches(type)

        const httpResponse = HttpResponse.get({ message: "Matches data successfull retrived", data: matches });
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
