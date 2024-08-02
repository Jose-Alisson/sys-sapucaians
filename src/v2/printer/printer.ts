import { Server, Socket } from "socket.io";
import { icrementPrint } from "../order/order.js";
import { io } from "../../server.js";

let impressoras: string[] = []

function registrarImpressora(socket: Socket, io: Server) {

    socket.on('add-impressoras', (nomes: Array<string>) => {
        impressoras = nomes
        io.emit('add-impressoras', impressoras)
    })

    socket.on('obter-impressoras', obt => {
        io.emit('obter-impressoras')
    })

    socket.on('imprimir', (nomeImpressoa, text) => {
        io.emit('printer', nomeImpressoa, text)
    })

    io.on("imcrementar-print", (id) => {
        icrementPrint(id)
    })
}

export { registrarImpressora }