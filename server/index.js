const express = require("express"); //create variable express
const app = express(); //insatnce of express.module
const http = require("http"); //create express instanceof expressions
const cors = require("cors"); //create express instanceof expressions
const { Server } = require("socket.io"); //
app.use(cors()); //connect to cors server
const server = http.createServer(app); //creating a vatriable name server and using it with http library with function createServer and passing express app in it
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) =>{
        socket.join(data);
        console.log(`User with Id: ${socket.id} joined room: ${data}`);
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data);
    });
    socket.on("disconnect", () =>{
        console.log("User disconnected",socket.id); 
    })
});

server.listen(3001, ()=>{
    console.log("listening on server");
}); //