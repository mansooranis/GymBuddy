const express = require('express');
const app = express();
const mongoose = require("./db/connection")
const AuthRouter = require("./routes/AuthRoutes")
const MessageRouter = require("./routes/messages")
const ConvoRouter = require("./routes/conversations")
const Server = require("socket.io")
const cors = require('cors');

app.use(express.json());
app.use(cors())

app.use("/api/user", AuthRouter)
app.use("/api/conversation", ConvoRouter)
app.use("/api/messages", MessageRouter)

const {PORT = 4000} = process.env
const server = app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
const io = Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
});


let users = [ ];

const addUser = (userId, socketId) => {
!users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
//when ceonnect
    //console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text, msgid }) => {
        const user = getUser(receiverId)
        //console.log(user);
        try {
            io.to(user.socketId).emit("getMessage", {
                msgid,
                senderId,
                text,
            });
            //console.log("message sent")
        }catch(e){
            console.log("message not sent", e)
        }
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
        });
});
