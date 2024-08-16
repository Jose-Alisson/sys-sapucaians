
import { currentDate, getNewOrders, getOrders, loadByDate, removerNewOrder, save } from "./order.js"
import { app } from "../../server.js"
import { Server, Socket } from "socket.io"

app.put("/order/update", (req, res) => {
    let body = req.body
    let date = body.dateCreation
    body.dateCreation = `${date[0]}-${(parseInt(date[1])).toString().padStart(2, '0')}-${parseInt(date[2]).toString().padStart(2, '0')}T${parseInt(parseInt(date[3]).toString().padStart(2, '0')).toString().padStart(2, '0')}:${parseInt(date[4]).toString().padStart(2, '0')}:${parseInt(date[5]).toString().padStart(2, '0')}.${date[6]}`
    save(body)
    res.send()
})

app.post("/order/add", (req, res) => {
    let body = req.body
    let date = body.dateCreation
    body.dateCreation = `${date[0]}-${(parseInt(date[1])).toString().padStart(2, '0')}-${parseInt(date[2]).toString().padStart(2, '0')}T${parseInt(parseInt(date[3]).toString().padStart(2, '0')).toString().padStart(2, '0')}:${parseInt(date[4]).toString().padStart(2, '0')}:${parseInt(date[5]).toString().padStart(2, '0')}.${date[6]}`
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

app.post("/order/reload", (req, res) => {
    loadByDate(currentDate)
    res.send()
})

function registrarOrder(socket: Socket, io: Server) {
    socket.emit('orders', getOrders())
    socket.emit('currentDate', currentDate)
    socket.emit('new-orders', getNewOrders())

    socket.on('carregar-por-data', (date) => {
        loadByDate(date)
    })

    socket.on('remover-new-order', (id) => {
        removerNewOrder(id)
    })

    socket.on('carregar-orders', () => {
        socket.emit('orders', getOrders())
    })

    socket.on('carregar-data', () => {
        socket.emit('currentDate', currentDate)
    })
}

export { registrarOrder }