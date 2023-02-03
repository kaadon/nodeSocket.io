let dotenv = require('dotenv');
dotenv.config('.env');
const express      = require('express')
const bodyparser   = require('body-parser')
const app          = express()
const http         = require('http')
const ioServer     = require('../socket.io/server')
const {repeat}     = require('../utils/tools/other')
let uuids = {};
const socketServer = () => {
    const server = http.createServer(app)
    const io     = ioServer(server,uuids)
    repeat(() => {
        io.emit("message", {})
    }, 1000)
    app.use(bodyparser.json())
    app.post('/', async (req, res) => {
        res.json({
                     "code": 200,
                     "data": {},
                     "msg" : ""
                 })
    })
    app.post('/push', async ({body}, res) => {
        var {
                event,
                data
            }   = body
        var sio = io
        if (!event) {
            res.send({
                         code   : 201,
                         message: "没有event值"
                     })
        }
        if (data) {
            sio.emit(event, data)
        }
        res.json(body)
    })
    server.listen(12345, () => {
        console.log('listening on *:12345')
    })
    let a = 0
    setInterval(()=>{
        a++
        console.log(uuids)
        console.log(a)

    },2000)
}
socketServer()