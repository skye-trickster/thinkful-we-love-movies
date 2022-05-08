const movies = require("../samples/movies")

function list(request, response, next) {
    const movieList = movies
    response.json({ data: movieList })
}

module.exports = {
    list
}