require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser')


const Chat = require('./mongo')

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// const app = require('express')();
// const server = require('http').Server(app)
// const io = require('socket.io')(server);

// const socket = require('socket.io')
// const http = require('http')
// const express = require('express')
// const app = express();  
// const server = new http.Server(app);  
// const io = socket(server);

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/chat', async (req, res) => {
    const chatList =  await Chat.find()
    .sort({ date: -1 })
    .limit(4);
return res.json({ chat: chatList });
})
// io.on('connection', (socket) => {
//   console.log('a user connected!!!!!!!!!!!!!!!!!!');
// })

app.post('/api/chat', async(req,res) => {

    console.log("here")
    const body = req.body

    if (!body.msg) {
      return res.status(400).json({ 
        error: 'content missing' 
      })
    }
    const chat = new Chat({
      msg: body.msg,
      userName: body.username || "no user",
      date: new Date(),
      //id: generateId(),
    })
    console.log(chat)

    const res2 = await chat.save()
      console.log('chat saved!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    return res.json(res2)
})




io.of("/").on("connection", (socket) => {  
  console.lo("A user has connected to the socket!");
  socket.on('disconnect', () => console.log('A user has disconnected from the socket!'));
});

const PORT = 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


io.on('connection', function(client) {
  // var address = io.handshake.address;
   console.log('Ein neuer Client hat sich zum Chat verbunden! IP: ')
});
