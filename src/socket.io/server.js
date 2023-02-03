const {Server}      = require("socket.io");
const CompressMsg   = require('../utils/CompressMsg')
const {verifyToken} = require('../utils/tools/jwt')
const socketIo = (server,uuids) => {
    const io = new Server(server, {
        pingInterval   : 5000,
        withCredentials: true,
        cors           : {
            origin: "*"
        }
    })
    io.on('connection', socket => {
        let kk = verifyToken(socket.handshake.auth.token);
        if (kk.hasOwnProperty('data')){
            let uuidsValues = Object.values(uuids);
            if (uuidsValues && uuidsValues.find(kk.data.mid)){
                uuidsValues.find(kk.data.mid)
                uuids[socket.id] = kk.data.mid
            }
        }
        socket.on('getPush', async (data) => {
            try {
                let meta = JSON.parse(data.toString());
                if (meta.hasOwnProperty('type') && meta.hasOwnProperty('sub')) {
                    switch (meta.type) {
                        case 'History':
                            socket.emit(meta.type, CompressMsg({}))
                            break;
                        case "NowList":
                            socket.emit(meta.type, CompressMsg({}))
                            break;
                        case "Message":
                            socket.emit(meta.type, CompressMsg({}))
                            break;
                        case "BuyStatus":
                            socket.emit(meta.type, CompressMsg({}))
                            break;
                        default:
                    }
                }
            } catch (err) {
                console.log(err.message);
            }
        })
        socket.on('disconnect', () => {
            console.log('用户已断开连接')
        })
    })
    return io
}
module.exports = socketIo