const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reviews.service")


async function reviewExists(request, response, next) {

    const review = await service.find(request.params.reviewId)

    if (review) {
        response.locals.review = review
        return next()
    }

    next({
        status: 404,
        message: "Review cannot be found"
    })
}

async function update(request, response, next) {

    const { review } = response.locals
    const updatedData = request.body.data

    const newReview = {
        ...review,
        ...updatedData
    }
    const data = await service.update(newReview)


    response.json({ data })
}

async function destroy(request, response, next) {

    await service.delete(request.params.reviewId)
    response.sendStatus(204)
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}