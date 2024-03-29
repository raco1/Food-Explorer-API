require('dotenv/config')
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const AppError = require('./utils/AppError')
const database = require("./database/sqlite");
const routes = require('./routes')
const uploadConfig = require("./config/upload")

const app = express()

app.use(express.json())
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173', 'https://testeraco.netlify.app'],
    credentials: true
}))
app.use(routes)
database();

app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }
    console.error(error)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))