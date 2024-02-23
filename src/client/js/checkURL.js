const validUrl = require('valid-url');

const validateURL = (url) => Boolean(validUrl.isWebUri(url));

module.exports = {
    validateURL
};