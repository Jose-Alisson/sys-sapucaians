import { icrementPrint, load, newOrders, orders, removerNewOrder } from "./order.js";
import { io, run } from "./server.js";
run();
io.on("connection", (socket) => {
    socket.emit("orders", orders);
    io.emit('new-orders', newOrders);
    socket.on('print', (id, data) => {
        icrementPrint(id);
        io.emit('printable', data);
    });
    socket.on('remover-new-order', (id) => {
        removerNewOrder(id);
    });
});
load();
