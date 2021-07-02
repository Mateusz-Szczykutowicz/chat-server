const express = require("express");
const app = express();
const server = require("http").Server(app);
// const io = require("socket.io")(server);
const socket = require("socket.io")(server, {
    cors: {
        origin: "http://localhost",
    },
});
const cors = require("cors");

const PORT = process.env.PORT | 3000;

app.use(cors());

Array.prototype.remove = function (s) {
    const index = this.indexOf(s);
    if (index > -1) {
        return this.splice(index, 1);
    }
};

app.get("/", (req, res) => {
    res.send({ status: "OK" });
});

const usersList = {};

socket.on("connection", (user) => {
    user.on("join", (data) => {
        user.room = data.room;
        user.nick = data.nick;
        user.join(user.room);
        const now = new Date();
        const textTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        socket.to(user.room).emit("join", {
            date: textTime,
            nick: user.nick,
        });
        if (usersList[user.room] == undefined) {
            usersList[user.room] = {};
        }

        if (usersList[user.room].list == undefined) {
            usersList[user.room].list = [];
            usersList[user.room].online = 0;
        }
        usersList[user.room].room = data.room;
        usersList[user.room].list.push(user.nick);
        usersList[user.room].online++;
        console.log(usersList[data.room]);
        socket.to(user.room).emit("online", usersList[user.room]);
    });

    user.on("disconnect", () => {
        const now = new Date();
        const textTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        if (usersList[user.room] != undefined) {
            usersList[user.room].list.remove(user.nick);
            usersList[user.room].online--;
        }

        console.log({
            room: user.room,
            nick: user.nick,
            list: usersList[user.room],
        });
        socket.to(user.room).emit("disconnection", {
            message: `${user.nick} opuścił pokój`,
            time: textTime,
        });
        socket.to(user.room).emit("online", usersList[user.room]);
    });

    user.on("message", (msg) => {
        const now = new Date();
        const textTime = `${now.getHours()}:${now.getMinutes()}`;
        socket
            .to(user.room)
            .emit("message", { nick: user.nick, message: msg, time: textTime });
    });
});

server.listen(PORT, () => {
    console.log("Server listen on port:", PORT);
});
