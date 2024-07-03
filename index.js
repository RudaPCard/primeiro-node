const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

/*
    - Query params => meusite.com/users?name=ruda&age=38  //FILTROS
    - Route params => /users/2   // BUSCAR, DELETAR OU ATUALIALIZAR ALGO ESPECIFICO
    - Request body => { "name": "Rudá", "age": 38}

    - GET            => buscar informações no back-end
    -POST            => Criar informações no Back-End
    - PUT / PATCH    => Alterar/atualizar informações no Back-end
    - DELETE         => Deletar informações no Back-end
*/
const users = []

const checkUserId = (req, res, next) => {
    const { id } = req.params

    const index = users.findIndex(user => user.id === id)
    
    if(index < 0){
        return res.status(404).json({ message: "User not found"})
    }

    req.userIndex = index
    req.userId = id

    next()
}

app.get('/order', ( req, res) => {
    return res.json(users)
      
})

app.post('/order', (req, res) => {
    const { order, clientName, price } = req.body  


    console.log()
    
   const orders = { id:uuid.v4(), order, clientName, price, status: "em preparação" }
   
    users.push(orders)

    return res.status(201).json(orders)
      
})

app.put('/order/:id', checkUserId, (req, res) => {

const { order, clientName, price} = req.body
const index = req.userIndex
const id = req.userId

const updatedOrder = { id, order, clientName, price, status: "em preparação" }
users[index] = updatedOrder
    return res.json(updatedOrder)
      
})

app.delete('/order/:id', checkUserId, ( req, res) => {
    const index = req.orderIndex

    users.splice(index,1)

    
    return res.status(204).json({ message: "removido" })
      
})

app.get('/order/:id', checkUserId, (req, res) => {
    const index = req.userIndex

    return res.json(users[index])

})

app.patch('/order/:id', checkUserId, (req, res) => {
    const { order, clientName, price } = req.body
    const index = req.userIndex
  
    const currentOrder = users[index]
  
    const updatedOrder = {
      ...currentOrder,
      order: order !== undefined ? order : currentOrder.order,
      clientName: clientName !== undefined ? clientName : currentOrder.clientName,
      price: price !== undefined ? price : currentOrder.price,
    }
  
    users[index] = updatedOrder
    return res.json(updatedOrder)
  })
  



app.listen(port, () => {
    console.log('🍔 Server Started on port ${port}')

    console.log('message')
})