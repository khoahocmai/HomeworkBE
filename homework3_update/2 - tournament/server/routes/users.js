import express from "express"
import { getUsers, findUserById, addUser, updateUserById, deleteUserById } from '../users.js'

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    res.send(getUsers())
})

userRouter.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = findUserById(userId)
    if (!user) {
        res.status(404).send('User not found')
    } else {
        res.send(user)
    }
})

userRouter.post('/', (req, res) => {
    const user = req.body

    if (user?.displayName && user?.age) {
        addUser(req.body)
        res.send('User Added')
    } else {
        res.status(400).send('Missing field')
    }
})

userRouter.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id)

    const isUpdate = updateUserById(userId, req.body)
    if (isUpdate) {
        res.send('User updated')
    } else {
        res.send('Cannot update non-exist user')
    }
})

userRouter.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    let isDelete = deleteUserById(userId)

    if (isDelete) {
        res.send('User deleted')
    } else {
        res.send('Cannot delete non-exist user')
    }
})

export default userRouter