function methodNotAllowed(request, response, next) {
    next({
        status: 405,
        message: `Method ${request.method} not allowed for: ${request.originalUrl}`
    })
}

module.exports = methodNotAllowed