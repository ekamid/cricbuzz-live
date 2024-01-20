const { validate: uuidValidate } = require('uuid');
const HttpResponse = require('../response/httpResponse');

/**
 * @param {string} string
 * @returns {string}
 */
function capitalizeFirstLetter(string) {
    const regex = /[-`~!@#$%^&*_|=?;:'",<>]/gi;

    const first_word = string.charAt(0).toUpperCase();
    const new_word = `${first_word}${string.slice(1)?.split(regex)?.join(' ')}`;

    const split_word = new_word.split(' ');

    for (let i = 0; i < split_word.length; i += 1) {
        const first_split_word = split_word[i].charAt(0).toUpperCase();
        split_word[i] = `${first_split_word}${split_word[i].slice(1)}`;
    }

    const result = split_word.join(' ');

    return result;
}

/**
 * @param {string} value
 * @param {import('../interface/ReqOptions').IReqOptions} options
 * @returns {string}
 */
function validateUUID(value, options) {

    if (!uuidValidate(value)) {
        const message = "Incorrect uuid format";
        throw new HttpResponse.badRequest(message);
    }

    return value;
}

module.exports = {
    capitalizeFirstLetter,
    validateUUID,
};
