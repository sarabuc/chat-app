const mongoose = require("mongoose");
const Chat = mongoose.model("chats");
const Home = (app, io) => {
    app.get("chat/api", async (req, res) => {
        const chatList = await Chat.find()
            .sort({ date: -1 })
            .limit(4);
        return res.json({ chat: chatList });
    });



    io.of("/").on("connect", async (socket) => {
        console.log("connected");

        socket.on("typing", async (msg) => {
            console.log(msg);
            socket.brodcast.emit("typing", { msg: msg.name });
        });

        //msg submitted
        try {
            socket.on("msg", async (msg) => {
                const chatList2 = await Chat.find()
                    .sort({ date: -1 })
                    .limit(4);
                io.emit("msg", { "chat": chatList2 });
            
            const chat = new Chat({
                username: msg.name,
                msg: msg.msg
            });
            await chat.save();
            const chatList = await Chat.find()
                .sort({ date: -1 })
                .limit(4);
            io.emit("msg", { "chat": chatList });
        });
        } catch(err){
            console.error(err.message);
        }

        socket.on("typing", (name) => {
            io.emit("typing", {name:name.name})
        });
        socket.on("disconnect", () => {
            console.log("disconnected");
        });
    });

}


module.exports= Home;