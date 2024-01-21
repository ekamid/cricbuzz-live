const cheerio = require('cheerio');
const prettier = require('prettier');
const axios = require('axios');

const { InternalServer } = require('../core/response/errorResponse');
const CRICBUZZ_URL = "https://www.cricbuzz.com"

const fetchScore = async (matchId) => {
    try {
        const response = await axios.get(`${CRICBUZZ_URL}/live-cricket-scores/${matchId}`);
        const $ = cheerio.load(response.data);

        const update = $('.cb-col.cb-col-100.cb-min-stts.cb-text-complete').text().trim() || 'Match Stats will Update Soon';
        const process = $('.cb-text-inprogress').text().trim() || 'Match Stats will Update Soon';
        const noresult = $('.cb-col.cb-col-100.cb-font-18.cb-toss-sts.cb-text-abandon').text().trim() || 'Match Stats will Update Soon';
        const stumps = $('.cb-text-stumps').text().trim() || 'Match Stats will Update Soon';
        const lunch = $('.cb-text-lunch').text().trim() || 'Match Stats will Update Soon';
        const inningsbreak = $('.cb-text-inningsbreak').text().trim() || 'Match Stats will Update Soon';
        const tea = $('.cb-text-tea').text().trim() || 'Match Stats will Update Soon';
        const rain_break = $('.cb-text-rain').text().trim() || 'Match Stats will Update Soon';
        const wet_outfield = $('.cb-text-wetoutfield').text().trim() || 'Match Stats will Update Soon';

        return {
            'title': $('.cb-nav-hdr.cb-font-18.line-ht24').text().trim().replace(', Commentary', ''),
            'update': update !== 'Match Stats will Update Soon' ? update : process || noresult || stumps || lunch || inningsbreak || tea || rain_break || wet_outfield || 'Match Stats will Update Soon...',
            'liveScore': $('.cb-font-20.text-bold').text().trim(),
            'runRate': $('.cb-font-12.cb-text-gray').first().text().trim().replace('CRR:\u00a0', ''),
            'batsmanOne': $('.cb-col.cb-col-50').eq(1).text().trim(),
            'batsmanOneRun': $('.cb-col.cb-col-10.ab.text-right').eq(0).text().trim(),
            'batsmanOneBall': '(' + $('.cb-col.cb-col-10.ab.text-right').eq(1).text().trim() + ')',
            'batsmanOneSR': $('.cb-col.cb-col-14.ab.text-right').eq(0).text().trim(),
            'batsmanTwo': $('.cb-col.cb-col-50').eq(2).text().trim(),
            'batsmanTwoRun': $('.cb-col.cb-col-10.ab.text-right').eq(2).text().trim(),
            'batsmanTwoBall': '(' + $('.cb-col.cb-col-10.ab.text-right').eq(3).text().trim() + ')',
            'batsmanTwoSR': $('.cb-col.cb-col-14.ab.text-right').eq(1).text().trim(),
            'bowlerOne': $('.cb-col.cb-col-50').eq(4).text().trim(),
            'bowlerOneOver': $('.cb-col.cb-col-10.text-right').eq(4).text().trim(),
            'bowlerOneRun': $('.cb-col.cb-col-10.text-right').eq(5).text().trim(),
            'bowlerOneWickets': $('.cb-col.cb-col-8.text-right').eq(5).text().trim(),
            'bowlerOneEconomy': $('.cb-col.cb-col-14.text-right').eq(2).text().trim(),
            'bowlerTwo': $('.cb-col.cb-col-50').eq(5).text().trim(),
            'bowlerTwoOver': $('.cb-col.cb-col-10.text-right').eq(6).text().trim(),
            'bowlerTwoRun': $('.cb-col.cb-col-10.text-right').eq(7).text().trim(),
            'bowlerTwoWicket': $('.cb-col.cb-col-8.text-right').eq(7).text().trim(),
            'bowlerTwoEconomy': $('.cb-col.cb-col-14.text-right').eq(3).text().trim(),
        }
    } catch (e) {
        throw new InternalServer("Something went wrong")
    }
}


const fetchMatches = async (type) => {
    try {
        const response = await axios.get(`${CRICBUZZ_URL}/cricket-match/live-scores`);
        const $ = cheerio.load(response.data, { xmlMode: true });

        // Array to store match details
        // Extract match details
        const matches = [];

        // Determine the active match type
        const activeMatchType = "international-tab"

        // 0 ?
        //     'international-tab' : 'domestic-tab';

        // Iterate through each match element of the active match type
        $(`.cb-plyr-tbody[ng-show="active_match_type == '${activeMatchType}'"] .cb-col-100.cb-col.cb-schdl.cb-billing-plans-text`).each((index, matchElement) => {
            // Extract match details
            const titleElement = $(matchElement).find('.cb-lv-scr-mtch-hdr a');
            const title = titleElement.text().trim();

            // Check if titleElement has an href attribute
            const hrefAttribute = titleElement.attr('href');
            const matchId = hrefAttribute ? hrefAttribute.match(/\/(\d+)\//)[1] : null; // Extracting match ID from href if available


            const teams = [];
            $(matchElement).find('.cb-ovr-flo.cb-hmscg-tm-nm').each((i, teamElement) => {
                teams.push($(teamElement).text());
            });

            const run = $(matchElement).find('.cb-ovr-flo').filter(':not(.cb-hmscg-tm-nm)').text().trim();

            const timeAndPlaceElement = $(matchElement).find('.text-gray');
            const date = timeAndPlaceElement.find('span.ng-binding.ng-scope').text().trim();
            const time = timeAndPlaceElement.find('span.ng-binding').eq(1).text().trim();
            const place = timeAndPlaceElement.find('span.text-gray').text().trim();

            // Create an object for the match
            const matchObject = {
                title,
                matchId,
                run,
                teams,
                timeAndPlace: {
                    date,
                    time,
                    place,
                },
            };

            // Categorize matches based on type
            matches.push(matchObject)
        });


        return {
            matches
        }
    } catch (e) {
        console.log(e.message);
        throw new InternalServer("Something went wrong")
    }
}

module.exports = {
    fetchScore,
    fetchMatches
}