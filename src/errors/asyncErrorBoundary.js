/**
 *  function to catch errors in async functions.
 */
function asyncErrorBoundary(callback, defaultStatus) {
    return function (request, response, next) {                             // creates a middleware function wrapper for callback
        Promise.resolve()                                                   // Promise.resolve is there just to start the promise chain
            .then(() => callback(request, response, next))                  // execute the async function and return result if resolved
            .catch((error = {}) => {                                        // when async functions throw an error. blank error by default
                const { status = defaultStatus, message = error } = error   // extract the status and message
                next({ status, message })
            })
    }
}

module.exports = asyncErrorBoundary