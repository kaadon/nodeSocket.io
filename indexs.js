let dotenv =  require('dotenv');
dotenv.config('.env');
const redisOptions = require('./src/config/redisConfig_3002')
host = true
if (redisOptions.host.search(",") == -1) {
    host = redisOptions.host;
} else {
    if (host) {
        hostArray = redisOptions.host.split(",")
        if (hostArray[1] === '' || hostArray[1].trim().length === 0){
            host = hostArray[0];
        }else {
            host = hostArray[1];
        }
    } else {
        hostArray = redisOptions.host.split(",")
        host = hostArray[0]
    }
}

console.log(host)