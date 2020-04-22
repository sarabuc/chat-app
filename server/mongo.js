const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const chatSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

chatSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Chat', chatSchema)