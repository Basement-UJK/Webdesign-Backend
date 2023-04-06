require('dotenv').config()
require('express-async-errors');

const express = require('express')
const app = express()
const setupDatabase = require('./database/setup')
const xss = require('xss-clean')
const helmet = require('helmet')
const cors = require('cors')
const rateLimiter = require('express-rate-limit');
const cookieParser = require('cookie-parser')
// middleware
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(helmet())
app.use(cors())
app.use(xss())

// routes

const userRoutes = require('./routes/userRoutes')
const entryRoutes = require('./routes/entryRoutes')
const authRoutes = require('./routes/authRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const messageRoutes = require('./routes/messageRoutes')

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/entries', entryRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/upload', uploadRoutes)
app.use('/api/v1/messages', messageRoutes)

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


