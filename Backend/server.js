const express = require('express');
const app = require('./app');
const http = require('http');
const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const messageModel = require('./models/message_model')

//socket.io for chat
const {Server} = require('socket.io')
const {setIO} = require('./socket')
const {userToSocket, socketToUser} = require('./onlineUsers');

const io = new Server(httpServer,{
    cors : {
        origin: "http://localhost:5173",
        methods : ["GET", "POST"]
    }
})

setIO(io)

io.on("connection", (socket)=>
{
    socket.on('join-room', (convoId)=>
    {        
        socket.join(convoId)        
    })
   
    socket.on('user-online',({userId})=>{        
        userToSocket.set(userId,socket.id)
        socketToUser.set(socket.id, userId)

        socket.broadcast.emit("user-status-changed", {            
            userId,
            isOnline: true,
        })
    })

    socket.on('message-delivered', async({messageId, convoId})=>
    {
        try
        {
            await messageModel.findByIdAndUpdate(messageId,{
                status: 'delivered'
            })
            io.to(convoId).emit('message-delivered',{
                messageId,
                status : 'delivered'
            })
        }
        catch(err)
        {
            throw new Error(err)
        }
    })
    socket.on('message-read', async({convoId, reader})=>
    {
        try
        {
           const res =  await messageModel.updateMany({
                conversation : convoId,
                sender : {$ne : reader},
                status : {$ne : 'read'}
            },{status : 'read'})          

            if(res.modifiedCount >0)
            {
                io.to(convoId).emit('message-read',{
                convoId,
                reader,
                status : 'read'
                })
            }
        }
        catch(err)
        {
            throw new Error(err)
        }
    })

    socket.on('user-typing',({convoId, sender})=>
    {
        socket.to(convoId).emit('user-typing', {
            sender
        })
    })

    socket.on('stop-typing',({convoId, sender})=>
    {
        socket.to(convoId).emit('stop-typing', {
            sender
        })
    })
    socket.on('leave-room', (convoId)=>
    {
        socket.leave(convoId)
    })

    socket.on("disconnect",()=>
    {
        const userId = socketToUser.get(socket.id)
        if(userId)
        {
            userToSocket.delete(userId)
            socketToUser.delete(socket.id)

            socket.broadcast.emit('user-status-changed',{
                userId,
                isOnline : false
            })
        }
    })
})

httpServer.listen(PORT, () => {
    // console.log(`Server is running on port ${PORT}`);
});
