const crypto = require('crypto');

const generateToken = () => crypto.randomInt(1000000);

module.exports = generateToken;
