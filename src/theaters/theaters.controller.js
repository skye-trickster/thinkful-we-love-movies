const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(request, response) {
    const theaters = await service.list()
    console.log(theaters[1].movies)
    response.json({ data: theaters })
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}