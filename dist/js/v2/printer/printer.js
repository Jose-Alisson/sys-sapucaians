import { icrementPrint } from "../order/order.js";
let impressoras = [];
function registrarImpressora(socket, io) {
    socket.on('add-impressoras', (nomes) => {
        impressoras = nomes;
        io.emit('add-impressoras', impressoras);
    });
    socket.on('obter-impressoras', obt => {
        io.emit('obter-impressoras');
    });
    socket.on('imprimir', (nomeImpressoa, text) => {
        io.emit('printer', nomeImpressoa, text);
    });
    io.on("imcrementar-print", (id) => {
        icrementPrint(id);
    });
}
export { registrarImpressora };
