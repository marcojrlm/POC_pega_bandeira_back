import express, { text } from "express"
import cors from "cors"
import { Server } from "socket.io"; // Importe o módulo socket.io
import http from "http"; // Importe o módulo http

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app);
const io = new Server(server);

let green = 0;
let yellow = 0

app.get("/flags", async (req, res) => {
    console.log('get');
    res.send(200, {
      green,
      yellow,
    });
  });

app.post("/flag", async (req, res) => {
    console.log('post');
    const flag = req.body.flag;
    if(flag === 1){
        green++;
    }

    if(flag === 2){
        yellow++;
    }
    io.emit("flagUpdated", { green, yellow });
    res.send(201)
})

const PORT = 4000;
app.listen(4000, () => {
    console.log(`Servidor ativo na porta ${PORT}`)
})