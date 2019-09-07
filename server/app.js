
if (process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const routes = require('./routes/index.js')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost:27017/fancy-todo', { useNewUrlParser: true })
    .then(() => {
        console.log(`connection success`)
    })
    .catch(err => {
        console.log(err)
        console.log(`connection failed`)
    })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})