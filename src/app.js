if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.json())

function notFound(request, response, next) {
    next({
        status: 404,
        message: `Path not found: ${request.originalUrl}`
    })
}

function errorHandler(error, request, response, next) {
    const { status = 500, message = "Something went wrong!" } = error || {}
    response.status(status).json({ error: message })
}
app.use(notFound)
app.use(errorHandler)

module.exports = app;
