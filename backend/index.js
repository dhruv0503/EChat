if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send("Server Working");
})

const server = http.createServer(app);
const port = process.env.PORT;

const io = socketIO(server);

const users = {};

io.on('connection', (socket) => {
    socket.on('joined', ({name}) => {
        users[socket.id] = name;
        socket.broadcast.emit('userJoined', {user:"Admin", msg:`${name} has joined`, id : "Admin"})
        socket.emit('welcome', {user : "Admin", msg : `Welcome to the chat ${name}`, id : "Admin"})
    })

    socket.on('message', ({text, id}) => {
        io.emit(`sendMessage`, {user : users[id], msg : text, id});
    })

    socket.on('disconnect', () => {
        const name = users[socket.id];
        if(name){
            socket.broadcast.emit('userLeft', { user: "Admin", msg: `${name} has left`, id : "Admin"});
            delete users[socket.id];
        }
    })

})

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
