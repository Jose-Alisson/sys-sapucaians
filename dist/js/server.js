import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import url from "url";
import path from 'path';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 4040;
const PEDIDOS_URL = process.env.PEDIDOS_URL || 'pedidos';
const app = express();
app.use(express.json());
const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../../..", "public");
app.use(express.static(diretorioPublico));
app.use(cors({}));
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
function run() {
    httpServer.listen(PORT, () => {
        console.log(`Servidor iniciado na porta: ${PORT}`);
    });
}
export { run, io, app, PEDIDOS_URL };
