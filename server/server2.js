var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
const cors = require('cors')
app.use(cors())
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var Message = mongoose.model('Message',{
  userName : String,
  msg : String,
  date: Date
})

var dbUrl = 'mongodb+srv://erenraich:312547870@serve-pro-e5uez.mongodb.net/test?retryWrites=true&w=majority'

app.get('/api/chat',  (req, res) => {
   Message.find({}).sort({date:-1}).limit(4).then(( messages)=> {
     console.log(messages)
    res.send(messages);
  })
})


app.get('/messages/:user', (req, res) => {
  var user = req.params.user
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})


app.post('/api/chat', async (req, res) => {
  try{
    var message = new Message(req.body);
    message['date'] = new Date()
    message['userName'] = req.body.userName || 'sara'
    const savedMessage = await message.save()
      console.log('saved');

    // var censored = await Message.findOne({message:'badword'});
    //   if(censored)
    //     await Message.remove({_id: censored.id})
    //   else
        io.emit('newChat', savedMessage);
      res.sendStatus(200)//json(savedMessage);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})



io.on('connection', () =>{
  console.log('a user is connected')
  io.emit('message', {msg:'from server'})
})

mongoose.connect(dbUrl ,{useCreateIndex : true} ,(err) => {
  console.log('mongodb connected',err);
})

var server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
});
