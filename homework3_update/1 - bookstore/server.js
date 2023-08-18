import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getBooks, findBookById, addBook, updateBookById, deleteBookById } from './bookstore.js'
// const express = require('express')
// const { getBooks } = require('./bookstore.js')

const server = express()
const PORT = 3000

server.use(cors())
server.use(bodyParser.json())

// req: request
// res: response
server.get('/', (req, res) => {
    res.send('Welcome to my server')
})

server.get('/books', (req, res) => {
    res.send(getBooks())
})

server.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id)
    const book = findBookById(bookId)
    if (!book) {
        res.status(404).send('Book not found')
    } else {
        res.send(book)
    }
})

server.post('/books', (req, res) => {
    const book = req.body
    if (book?.title && book?.author) {
        addBook(req.body)
        res.send('Book Added')
    } else {
        res.status(404).send('Missing field')
    }
})

server.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id)

    updateBookById(bookId, req.body)
    res.send('Book updated')
})

server.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id)
    deleteBookById(bookId)
    res.send('Book deleted')
})

server.listen(PORT, () => {
    console.log('Server is running')
})