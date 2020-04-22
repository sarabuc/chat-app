const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema({
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

module.exports = Chat = mongoose.model("chats", chatSchema);