const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const movies = require("../samples/movies")
const service = require("./movies.service")

async function list(request, response, next) {
    response.json({ data: service.list() })
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}