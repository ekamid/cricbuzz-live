require('dotenv/config');

/**
 * @param {any} value
 * @param {any} fallback
 * @returns {any}
 */
function getEnv(value, fallback) {
    const result = process.env[value];

    // check env value
    if ([undefined, null, ''].includes(result)) {
        // check fallback
        if (fallback) {
            return fallback;
        }

        return undefined;
    }

    return result;
}

/**
 * App Env
 */
const appEnv = {
    // Application
    NODE_ENV: getEnv('NODE_ENV', 'development'),

    APP_KEY: getEnv('APP_KEY'),
    APP_NAME: getEnv('APP_NAME', 'cricbuzz-live'),
    APP_LANG: getEnv('APP_LANG', 'id'),
    APP_PORT: Number(getEnv('APP_PORT', 8000)),

    // Config
    AXIOS_TIMEOUT: getEnv('AXIOS_TIMEOUT', '5m'),
    RATE_LIMIT: Number(getEnv('RATE_LIMIT', 100)),
    RATE_DELAY: getEnv('RATE_DELAY', '5m'),
};

/**
 * Secret Env
 */
const secretEnv = {


};

/**
 * Base URL Env
 */
const baseURLEnv = {
    APP_BASE_URL: getEnv(
        'APP_BASE_URL',
        'http://localhost:8000'
    ),
};


/**
 * Third Party Env
 */
const thirdPartyEnv = {

};

const env = {
    ...appEnv,
    ...secretEnv,
    ...baseURLEnv,
    ...thirdPartyEnv,
};

module.exports = { env };
