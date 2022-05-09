const router = require("express").Router()
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

router.route("/:movieId/theaters")
    .get(controller.readShowingTheaters)
    .all(methodNotAllowed)

router.route("/:movieId/reviews")
    .get(controller.readReviewsFromMovie)
    .all(methodNotAllowed)

module.exports = router