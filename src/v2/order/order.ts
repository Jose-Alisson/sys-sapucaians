import axios from "axios";
import { Order } from "../../model/order.model.js";
import { io, PEDIDOS_URL } from "../../server.js";

let currentDate = ''

let orders: Order[] = []
let newOrders: Order[] = []

const URL = `${PEDIDOS_URL}/order`

function loadByDate(date: string) {
    axios.get(`${URL}/byDate`, { params: { date: date } }).then((response) => {
        currentDate = date
        orders = response.data
        io.emit('orders', orders)
        io.emit('currentDate', currentDate)
    }).catch(err => {
        console.log(err)
    })
}

function save(order: Order) {
    let equals = order.dateCreation.split('T')[0] === currentDate

    let index = orders.findIndex(o => o.id === order.id)

    if (index != -1) {
        order.numPrint = orders[index].numPrint
        orders[index] = order 
        io.emit("orders", orders)
    } else {
        newOrders.push(order)
        if(equals){
            orders.push(order)
            io.emit("orders", orders)
        }
        io.emit('new-orders', newOrders)
    }
}

function getOrders() {
    return orders
}

function getNewOrders() {
    return newOrders
}

function icrementPrint(id: number) {
    let index = orders.findIndex(o => o.id === id)
    if (index != -1) {
        console.log(index)
        if (orders[index].numPrint) {
            orders[index].numPrint++
        } else {
            orders[index].numPrint = 0
            orders[index].numPrint++
        }

        io.emit('orders', orders)
    }
}

function removerNewOrder(id: number) {
    let index = newOrders.findIndex(o => o.id === id)
    if (index != -1) {
        newOrders.splice(index, 1)
        io.emit('new-orders', newOrders)
    }
}
export { save, getOrders, currentDate, icrementPrint, loadByDate, removerNewOrder, getNewOrders };