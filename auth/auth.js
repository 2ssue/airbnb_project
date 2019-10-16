require('dotenv').config();

const jwt = require('jsonwebtoken');

/**
 * 유저 데이터에 대한 token을 발급, 만료시간을 1시간으로 설정.
 * 
 * @param {Object} user 
 */

const issueToken = (user) => {
    const token = jwt.sign({
            name: user.name
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '1h'
        });
    return token;
}

module.exports = {
    issueToken
}