import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRouter from './routes/users.js'
import tournamentRouter from './routes/tournaments.js'

const server = express()
const PORT = process.env.PORT || 3000 // nếu vế trc undifine thì lấy giá trị vế sau

server.use(cors())
server.use(bodyParser.json())

server.use('/users', userRouter)
server.use('/tournaments', tournamentRouter)

server.listen(PORT, () => {
    console.log(`Server is listing on ${PORT}`)
})