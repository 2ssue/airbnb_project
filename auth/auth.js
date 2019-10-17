require('dotenv').config();

const jwt = require('jsonwebtoken');

/**
 * status 코드에 따른 에러 객체 생성.
 * 
 * @param {Number} status 
 * @return {Object} 에러 객체
 */
const INVALID_TOKEN = (status) => {
    return { message: '😅 유효하지 않은 접근입니다', status };
}

/**
 * user의 jwt 토큰을 확인하는 미들웨어
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {*} next 
 */
const verifyUser = (req, res, next) => {
    const token = req.cookies.user;
    
    if(!token){
        next(INVALID_TOKEN(401));
        return;
    }

    //사용자에게 상세한 에러 내용을 숨기기 위해 try-catch
    try{
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    }catch(err){
        next(INVALID_TOKEN(403));
    }
}

/**
 * 유저 데이터에 대한 token을 발급, 만료시간을 1시간으로 설정.
 * 
 * @param {Object} user 
 * @return {String} jwt 토큰 
 */
const issueToken = (name) => {
    const token = jwt.sign({
            name
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '1h'
        });
    return token;
}

module.exports = {
    verifyUser,
    issueToken
}