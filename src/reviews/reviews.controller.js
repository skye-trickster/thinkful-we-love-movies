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

/**
 * Throw an error if the user gives a piece of data within body that's not either a content or a score
 */
function hasExactParameters(parameterList) {
    return function (request, response, next) {
        const keys = Object.keys(request.body.data)

        const extra = []
        keys.forEach((key) => {
            if (!parameterList.includes(key)) {
                extra.push(key)
            }
        })
        if (extra.length) {
            return next({
                status: 400,
                message: `Invalid parameter(s): ${extra.join(', ')}`
            })
        }
        next()
    }
}

async function update(request, response, next) {

    const { review } = response.locals
    const updatedData = request.body.data

    const newReview = {
        ...review,
        ...updatedData
    }

    await service.update(newReview) // this responds with just a number, so pass in newReview instead


    response.json({ data: newReview })
}

async function destroy(request, response, next) {

    await service.delete(request.params.reviewId)
    response.sendStatus(204)
}

function read(request, response, next) {
    response.json({ data: response.locals.review })
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), hasExactParameters(["score", "content"]), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)]
}