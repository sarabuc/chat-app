require('dotenv').config()
console.log(process.env.MONGODB_URI);
const express = require("express");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const cors = require('cors');
const Chat = require("./models/Chat");
//connectDB();
const app = express();
app.use(cors);
// app.use(
//     express.json({
//         extended:true
//     })
// );
app.get("/chat/api",  (req, res) => {
     res.json({jgjg:"jjkl"})
})

app.post('/chat/api', (request, response) => {
    console.log('here')
     response.json({here:"grer"})

    const body = request.body
  
    if (!body.msg) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const chat = new Chat({
      content: body.msg,
      important: body.username || false,
      date: new Date(),
      //id: generateId(),
    })
    chat.save().then(response => {
      console.log('chat saved!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
     // mongoose.connection.close()
    }).catch(err => console.err(err))
   
  console.log(chat);
    return response.json(chat.toJSON())
  })
//app.use(express.static(__dirname+"/public"));






const port = process.env.PORT || 5000;

const expressServer = app.listen(port, ()=>{
    console.log(`app started as port ${port}`);
});


// const io = socketIo(expressServer);
// const Home = require("./routes/Home");


// Home(app, io);