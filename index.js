const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html') //pass index.html
});

io.on('connection', (socket) => {
    console.log('someone connected!');
    socket.on('message', (msg) => {
        console.log(`message: ${msg}`);
        io.emit('message', msg);
    });

    socket.on('disconnected', () => {
        console.log('user has left!');  // <-- to console

        io.emit('message', 'user has left!'); // <-- to everyone
    });
});