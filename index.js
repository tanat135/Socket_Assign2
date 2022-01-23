var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function () {
    console.log('listening on *:3000');
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    console.log('Client connected..');
    socket.on('join', function (data) {
        console.log(data);
    });
    socket.on('disconnect', () => {
            console.log('user disconnected');
        });
      
    socket.on('send-time-date', function (data) {  //input
        console.log('Got something ' + data);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        if (data == 'Date' || data == 'date') {
            data = date;
            console.log('Date: ' + data);
            io.emit('date', 'This is date :' + data); 
        }
        else if (data == 'Exit' || data == 'exit' ){
            io.emit('time', 'Invalid! ');
        }
         
            
    });
    socket.on('send-time-date', function (datatime) {  //input
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if (datatime == 'Time' || datatime == 'time') {
            datatime = time;
            console.log('Time: ' + datatime);
            io.emit('time', 'This is time :' + datatime);
        }
    });
});

