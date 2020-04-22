var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.get('/', function(req, res,next) {
    res.json('/index.html');
});

app.get('/test', function(req, res,next) {
    res.render('HALLO ');
});

server.listen(4200);

io.on('connection', function(client) {
   // var address = io.handshake.address;
    console.log('Ein neuer Client hat sich zum Chat verbunden! IP: ')
});



io.on('sendmsg', function(data) {
    console.log(data);
});