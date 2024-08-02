import axios from "axios";
import { Order } from "../../model/order.model.js";
import { io } from "../../server.js";

let date: Date = new Date()

let orders: Order[] = []
let newOrders: Order[] = []

const URL = `http://localhost:8080/order`

function load() {
    axios.get(`${URL}/`).then((response) => {
        orders = response.data
    }).catch(err => {
        console.log(err)
    })
}


function loadByDate(date: string){
    axios.get(`${URL}/byDate`, {params : {date: date}}).then((response) => {
        orders = response.data
        io.emit('orders', orders)
    }).catch(err => {
        console.log(err)
    })
}

function save(order: Order) {
    let index = orders.findIndex(o => o.id === order.id)
    if (index != -1) {
        order.numPrint = orders[index].numPrint
        orders[index] = order
    } else {
        newOrders.push(order)
        orders.push(order)
        io.emit('new-orders', newOrders)
    }
    io.emit("orders", orders)
}

function getOrders(){
    return orders
}

function getNewOrders(){
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
export { save, getOrders, load, icrementPrint, loadByDate, removerNewOrder, getNewOrders };