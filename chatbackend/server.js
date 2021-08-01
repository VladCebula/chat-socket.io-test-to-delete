const express = require('express')
const app = express()
const socket = require('socket.io')
const color = require('colors')
const cors = require('cors')
const {getCurrentUser, userDisconnect, joinUser} = require("./dummyuser")

app.use(express())

const port = 8000

app.use(cors())

var server = app.listen(
    port,
    console.log(
        `server running on port: ${(port)}`
        .green
    )
)

const io = socket(server)

io.on('connection', (socket)=>{
    socket.on('joinRoom', ({username, roomname}) => {
        const p_user = joinUser(socket.id,username,roomname)
        socket.join(p_user.room)
        socket.emit('message',{
            userId: p_user.id,
            username: p_user,username,
            text: `Welcome ${p_user.username}`
        })
        socket.broadcast.to(p_user.room).emit("message",{
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has joined chat`
        })
    })

    socket.on('chat',(text)=>{
        const p_user = getCurrentUser(socket.id)

        io.to(p_user.room).emit('message',{
            userId: p_user.id,
            username: p_user.username,
            text: text,
        })
    })

    socket.on('disconnect', ()=>{
        const p_user = userDisconnect(socket.id)

        if(p_user){
            io.to(p_user.room).emit("message",{
                userId:p_user.id,
                username:p_user.username,
                text: `${p_user.username} has left the room`,
            })
        }
    })

})