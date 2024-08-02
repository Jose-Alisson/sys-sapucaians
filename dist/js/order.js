import axios from "axios";
import { app, io } from './server.js';
let orders = [];
let newOrders = [];
const URL = `http://localhost:8080/order`;
function load() {
    axios.get(`${URL}/`).then((response) => {
        orders = response.data;
    }).catch(err => {
        console.log(err);
    });
}
function save(order) {
    let index = orders.findIndex(o => o.id === order.id);
    if (index != -1) {
        order.numPrint = orders[index].numPrint;
        orders[index] = order;
    }
    else {
        newOrders.push(order);
        io.emit('new-orders', newOrders);
        orders.push(order);
    }
    io.emit("orders", orders);
}
function icrementPrint(id) {
    let index = orders.findIndex(o => o.id === id);
    if (index != -1) {
        console.log(index);
        if (orders[index].numPrint) {
            orders[index].numPrint++;
        }
        else {
            orders[index].numPrint = 0;
            orders[index].numPrint++;
        }
        io.emit('orders', orders);
    }
}
app.get("/order/", (req, res) => {
    res.send(orders);
});
app.post("/order/add", (req, res) => {
    let body = req.body;
    let date = new Date(body?.dateCreation[0], // Ano
    body?.dateCreation[1] - 1, // Mês (ajustado)
    body?.dateCreation[2], // Dia
    body?.dateCreation[3], // Hora
    body?.dateCreation[4], // Minuto
    body?.dateCreation[5], // Segundo
    Math.floor(body?.dateCreation[6] / 1e6) // Milissegundos (convertendo nanosegundos para milissegundos)
    );
    body.dateCreation = date;
    save(body);
    res.send("✅");
});
app.put("/order/update", (req, res) => {
    save(req.body);
    res.send();
});
function removerNewOrder(id) {
    let index = newOrders.findIndex(o => o.id === id);
    if (index != -1) {
        newOrders.splice(index, 1);
        io.emit('new-orders', newOrders);
    }
}
export { load, icrementPrint, orders, newOrders, removerNewOrder };
