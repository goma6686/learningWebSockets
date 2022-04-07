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
    socket.emit('message', { teapot: 'Hi! How are you today?' });
    socket.on('another event', (data) => {
        console.log(data);
    });
});