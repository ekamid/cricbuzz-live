/**
 * Express User Agent
 * @returns
 */
const expressUserAgent = () => {
    return function (req, _res, next) {
        // check is user agent
        const userAgentIs = (useragent) => {
            const r = [];
            for (const i in useragent) if (useragent[i] === true) r.push(i);
            return r;
        };

        const userAgentState = {
            browser: req.useragent?.browser,
            version: req.useragent?.version,
            os: req.useragent?.os,
            platform: req.useragent?.platform,
            geoIp: req.useragent?.geoIp,
            source: req.useragent?.source,
            is: userAgentIs(req.useragent),
        };

        req.body.userAgent = userAgentState;

        next();
    };
};

module.exports = { expressUserAgent };
