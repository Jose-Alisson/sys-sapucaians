
import { getNewOrders, getOrders, loadByDate, removerNewOrder, save} from "./order.js"
import { app } from "../../server.js"
import { Server, Socket } from "socket.io"

app.put("/order/update", (req, res) => {
    save(req.body)
    res.send()
})

app.post("/order/add", (req, res) => {
    let body = req.body
    let date = new Date(body?.dateCreation[0], body?.dateCreation[1] - 1, body?.dateCreation[2], body?.dateCreation[3],body?.dateCreation[4], body?.dateCreation[5], Math.floor(body?.dateCreation[6] / 1e6));
    body.dateCreation = date
    save(body)
    res.send("")
})

app.get("/order/", (req, res) => {
    res.send(getOrders())
})

app.post("/order/load", (req, res) => {
    loadByDate(req.query.date)
    res.send(getOrders())
})

function registrarOrder(socket: Socket, io : Server ){
    socket.emit('orders', getOrders())
    socket.emit('new-orders', getNewOrders())

    socket.on('carregar-por-data', (date) => {
        loadByDate(date)
    })

    socket.on('remover-new-order', (id) => {
        removerNewOrder(id)
    })
}

export {registrarOrder}