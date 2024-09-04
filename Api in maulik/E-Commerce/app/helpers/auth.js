var CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

const encryptPassword = (password) => {
    return CryptoJs.AES.encrypt(password, process.env.SECRET_KEY).toString();
}

const decryptPassword = (password) => {
    var bytes = CryptoJs.AES.decrypt(password, process.env.SECRET_KEY);
    return bytes.toString(CryptoJs.enc.Utf8);
}

const generateToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "24h"
    });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
};

module.exports = {
    encryptPassword,
    decryptPassword,
    generateToken,
    verifyToken
}