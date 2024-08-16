import axios from "axios";
import { io, PEDIDOS_URL } from "../../server.js";
let currentDate = '';
let orders = [];
let newOrders = [];
const URL = `${PEDIDOS_URL}/order`;
function loadByDate(date) {
    axios.get(`${URL}/byDate`, { params: { date: date } }).then((response) => {
        currentDate = date;
        orders = response.data;
        io.emit('orders', orders);
        io.emit('currentDate', currentDate);
    }).catch(err => {
        console.log(err);
    });
}
function save(order) {
    let equals = order.dateCreation.split('T')[0] === currentDate;
    let index = orders.findIndex(o => o.id === order.id);
    if (index != -1) {
        order.numPrint = orders[index].numPrint;
        orders[index] = order;
        io.emit("orders", orders);
    }
    else {
        newOrders.push(order);
        if (equals) {
            orders.push(order);
            io.emit("orders", orders);
        }
        io.emit('new-orders', newOrders);
    }
}
function getOrders() {
    return orders;
}
function getNewOrders() {
    return newOrders;
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
function removerNewOrder(id) {
    let index = newOrders.findIndex(o => o.id === id);
    if (index != -1) {
        newOrders.splice(index, 1);
        io.emit('new-orders', newOrders);
    }
}
export { save, getOrders, currentDate, icrementPrint, loadByDate, removerNewOrder, getNewOrders };
