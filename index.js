const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});

//ROUTES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html') //pass index.html
});
app.get('/judesys', (req, res) => {
    res.sendFile(__dirname + '/public/judesys.html') //pass judesys.html
});
app.get('/sunflower', (req, res) => {
    res.sendFile(__dirname + '/public/sunflower.html') //pass sunflower.html
});
app.get('/plazmoidas', (req, res) => {
    res.sendFile(__dirname + '/public/plazmoidas.html') //pass plazmoidas.html
});

//namespace !
const tech = io.of('/tech');

tech.on('connection', (socket) => {
    console.log('someone connected!');

    socket.on('join', (data) => {  //join event is from documentation
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user has joined ${data.room}!`) //when someone joins
    });

    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`);
        tech.in(data.room).emit('message', data.msg);  //when someone says something emit to the room
    });

    socket.on('disconnected', () => {
        console.log('user has left!');  // <-- to console

        tech.emit('message', 'user has left!'); // <-- to everyone
    });
});