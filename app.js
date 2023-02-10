require('dotenv').config()
require('express-async-errors');

const express = require('express')
const app = express()
const setupDatabase = require('./database/setup')


app.use(express.json())

// routes

const userRoutes = require('./routes/userRoutes')
const entryRoutes = require('./routes/entryRoutes')
const authRoutes = require('./routes/authRoutes')

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/entries', entryRoutes)
app.use('/api/v1/auth', authRoutes)

// error handler

const errorHandler = require('./middleware/errorHandler')
const notFoundHandler = require('./middleware/notFound')

app.use(errorHandler)
app.use(notFoundHandler)

const port = process.env.PORT || 5000 

const start = async () => {
    setupDatabase()
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`)
    })
}
start()

module.exports = app

