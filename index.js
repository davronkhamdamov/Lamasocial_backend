import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import jwt from "./middleware/auth.js";
import user from './routes/user.js'
import video from './routes/videos.js'
import likes from './routes/likes.js'
import message from './routes/message.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4001
app.use(cors())
app.use(express.json())
app.use(jwt)
app.use('/user', user)
app.use('/video', video)
app.use('/likes', likes)
app.use('/message', message)

app.get('/*', (req, res) => {
    res.send({ status: 400, message: 'Rout not found', method: req.method, url: req.url, error: true })
})
app.post('/*', (req, res) => {
    res.send({ status: 400, message: 'Rout not found', method: req.method, url: req.url, error: true })
})
app.put('/*', (req, res) => {
    res.send({ status: 400, message: 'Rout not found', method: req.method, url: req.url, error: true })
})
app.delete('/*', (req, res) => {
    res.send({ status: 400, message: 'Rout not found', method: req.method, url: req.url, error: true })
})

app.use((error, req, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            errorName: error.name,
            error: true,
        })
    }
    if (error.status !== 500) {
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            errorName: error.name,
            error: true,
        })
    }
    return res.status(error.status).json({
        status: error.status,
        message: 'Internal Server Error',
        errorName: error.name,
        error: true,
    })
})

app.listen(PORT, () => {
    console.log("http://localhost:" + PORT + " is running");
})