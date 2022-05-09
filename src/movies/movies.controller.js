const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
//const movies = require("../samples/movies")
const service = require("./movies.service")

async function list(request, response, next) {
    const { is_showing } = request.query

    if (!(is_showing))
        return response.json({ data: await service.list() })

    const movieList = await service.listCurrentlyShowing()
    response.json({ data: movieList })
}

async function movieExists(request, response, next) {
    const { movieId } = request.params
    const movie = await service.read(movieId)

    if (movie) {
        response.locals.movie = movie
        return next()
    }

    next({
        status: 404,
        message: "Movie cannot be found"
    })
}

function read(request, response, next) {
    response.json({ data: response.locals.movie })
}

async function readShowingTheaters(request, response, next) {
    response.json({ data: await service.readShowingTheaters(response.locals.movie) })
}

async function readReviewsFromMovie(request, response, next) {
    response.json({ data: await service.readReviewsFromMovie(response.locals.movie) })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read],
    readShowingTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readShowingTheaters)],
    readReviewsFromMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviewsFromMovie)]
}