
const asyncHandler = require("express-async-handler");
const route = require('../routes/v1');
const HttpResponse = require('../core/response/httpResponse');
const { fetchScore, fetchMatches } = require("../services/fetchMatchData");

/**
 * match id is a number
 */

route.get(
    '/score/:matchId',
    asyncHandler(async function getMatches(req, res) {

        try {
            const { matchId } = req.params;

            const score = await fetchScore(matchId)

            const httpResponse = HttpResponse.get({ message: "Matches data successfull retrived", data: score });
            res.status(200).json(httpResponse);
        } catch (error) {
            console.error(error)
        }
    })
);


/**
 * 4 types of matches
 * international, league, domestic, women
 * if type not given, default match type is 'international'
 */


function createMatchesRoute(path, endpoint) {
    try {
        route.get(
            path,
            asyncHandler(async function getMatches(req, res) {
                const type = req.query.type;

                const matches = await fetchMatches(endpoint, type);

                const httpResponse = HttpResponse.get({ message: "Matches data successfully retrieved", data: matches });
                res.status(200).json(httpResponse);
            })
        );
    } catch (error) {
        console.error(error)
    }
}

createMatchesRoute('/matches/live', 'live-scores');
createMatchesRoute('/matches/recent', 'live-scores/recent-matches');
createMatchesRoute('/matches/upcoming', 'live-scores/upcoming-matches');


module.exports = route;
