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

app.get('/users', ( req, res) => {
    return res.json(users)
      
})

app.post('/users', (req, res) => {
    const { name, age } = req.body  

    
   const user = { id:uuid.v4(), name, age }

    users.push(user)

    return res.status(201).json(user)
      
})

app.put('/users/:id', checkUserId, (req, res) => {

const { name, age} = req.body
const index = req.userIndex
const id = req.userId

const updatedUser = { id, name, age }
users[index] = updatedUser
    return res.json(updatedUser)
      
})

app.delete('/users/:id', checkUserId, ( req, res) => {
    const index = req.userIndex

    users.splice(index,1)

    
    return res.status(204).json()
      
})


app.listen(port, () => {
    console.log('🚀Server Started on port ${port}')

    console.log('message')
})