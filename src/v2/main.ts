import { loadByDate } from "./order/order.js";
import { io, run } from "../server.js";
import { registrarImpressora } from "./printer/printer.js";
import { registrarEstablishment } from "./establishment/establishment.js";
import { registrarOrder } from "./order/order-manager.js";
import { registrarFile } from "./file/file.js";

run()

io.on('connection', (socket) => {
    registrarEstablishment(socket, io)
    registrarImpressora(socket, io)
    registrarOrder(socket, io)
    registrarFile()
})

// const dataAtual = new Date().toLocaleDateString().split("/");

// loadByDate(`${dataAtual[2]}-${dataAtual[1]}-${dataAtual[0]}`)