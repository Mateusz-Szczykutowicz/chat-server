const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");

const PORT = process.env.PORT | 3000;

server.listen(PORT, () => {
    console.log(`Server with socket listen on port: ${PORT}`);
});

app.use(cors());

app.get("/", (req, res) => {
    res.send("ok");
});
