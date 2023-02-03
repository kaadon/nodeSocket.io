const jwt = require("jsonwebtoken");
const {
          PublicKey,
          PrivateKey
      }   = require('./jwtKey')

/**
 * 登陆验证，生成token
 * @param {string} username 用户名
 * @param {string} password 密码
 */
function generateToken(username, password, issuer = "booladmin", algorithm = "RS512") {
    return jwt.sign(
        {
            // token数据
            data:{
                username,
                password,
            }
        },
        PrivateKey, // 密钥
        {
            //参数 options
            algorithm: algorithm, // 加密算法   对称加密算法
            issuer   : issuer, // 签发人
            expiresIn: 30, // 过期时间   单位：s
        }
    );
}

/**
 * 签名验证
 * @param {string} token
 */
function verifyToken(token, issuer = "booladmin", algorithms = ["RS512"]) {
    try {
        let arr = jwt.verify(token, PublicKey, {
            issuer    : issuer,
            algorithms: algorithms,
        });
        return arr;
    } catch (error) {
        return {
            code   : 10000,
            message: error.message,
        };
    }
}

module.exports = {
    generateToken: generateToken,
    verifyToken  : verifyToken
}
