import express from 'express'
import { DataResponse, InternalErrorResponse, MessageResponse, NotFoundResponse } from '../common/reponses.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { requireRole } from '../middlewares/auth.js'

const router = express.Router()

// Function 1: List all user
router.get('/listAllUser', requireRole('admin'), async (req, res) => {
    const users = await User.findAll()
    res.json(DataResponse(users))
})

// Function 2: Get user by name
router.get('/', requireRole('admin'), async (req, res) => {
    const username = req.body.username
    const user = await User.findOne({
        where: {
            username: username,
        }
    })
    res.json(DataResponse(user))
})

// Function 3: Register user
router.post('/register', async (req, res) => {
    const userData = req.body
    try {
        const hashPass = await bcrypt.hash(userData.password, 10)
        const user = await User.create({
            username: userData.username,
            password: hashPass,
            role: userData.role
        })
        console.log(user)
        res.json(DataResponse(user))
    } catch (error) {
        res.json(InternalErrorResponse())
    }
})

// Function 4: Login user
router.post('/login', async (req, res) => {
    const userData = req.body
    const user = await User.findOne({
        where: {
            username: userData.username
        }
    })

    if (user != null) {
        const isMatchPass = await bcrypt.compare(userData.password, user.password)
        if (isMatchPass) {
            const payload = { 
                username: user.username, 
                role: user.role, 
                id: user.id 
            }
            const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: '3h'
            })
            res.cookie('token', token)
            res.send(DataResponse({
                token: token
            }))
        } else {
            res.send(MessageResponse('Invalid username or password'))
        }
    } else {
        res.send(NotFoundResponse())
    }


})

// Function 5: Delete user by name
router.delete('/', requireRole('admin'), async (req, res) => {
    const username = req.body.username

    const result = await User.destroy({
        where: {
            username: username,
        }
    })
    if (result === 0) {
        res.json(NotFoundResponse('Not found'))
    } else {
        res.json(MessageResponse('User deleted'))

    }
})

// Function 6: Update user by name
router.put('/', requireRole('user'), async (req, res) => {
    const userUp = req.body
    const name = userUp.username

    const check = await User.update(userUp, {
        where: {
            username: name,
        }
    })
    if (check[0] === 0) { 
        res.json(NotFoundResponse())
    } else {
        res.json(MessageResponse('User updated'))
    }
})

export default router