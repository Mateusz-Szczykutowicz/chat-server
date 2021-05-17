const express = require("express");
const app = express();
const server = require("http").createServer(app);

const PORT = process.env.PORT | 3000;

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost",
    },
});

// io.on("connection", (user) => {
//     user.on("join", (msg) => {
//         console.log("object");
//         io.emit({ data: `To jest nick :>>, ${msg}` });
//     });
// });

// app.get("/status", (req, res) => {
//     res.send({ status: "OK" });
// });

// server.listen(PORT, () => {
//     console.log(`Server listen on port ${PORT}`);
// });

//*

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const port = process.env.PORT || 3000;
// const app = express();

// app.get("/", (req, res) => {
//     return res.send({ response: "I am alive" }).status(200);
// });

// const server = http.createServer(app);

// const io = socketIo(server); // < Interesting!
// let interval;

// io.on("connection", (socket) => {
//     console.log("New client connected");
//     if (interval) {
//         clearInterval(interval);
//     }
//     interval = setInterval(() => getApiAndEmit(socket), 1000);
//     socket.on("disconnect", () => {
//         console.log("Client disconnected");
//         clearInterval(interval);
//     });
// });

// const getApiAndEmit = (socket) => {
//     const response = new Date();
//     // Emitting a new message. Will be consumed by the client
//     socket.emit("FromAPI", response);
// };

// server.listen(port, () => console.log(`Listening on port ${port}`));
