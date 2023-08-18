// ===== Imports =====
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import './database/database.js'

import indexRouter from './routes/index.js'
import songRouter from './routes/songs.js'
import userRouter from './routes/users.js'
import albumRouter from './routes/albums.js'

// ===== Config =====
const server = express()
const PORT = process.env.PORT || 3000

// ===== Middlewares =====
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())
server.use('/public', express.static('public/music')) 

// ===== Routes =====
server.use('/', indexRouter)
server.use('/songs', songRouter)
server.use('/users', userRouter)
server.use('/albums', albumRouter)

server.listen(PORT, () => {
    console.log(`Server is listening at PORT=${PORT}`)
})
