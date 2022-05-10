const knex = require("../db/connection") // need knex for db management
const mapCriticsToReviews = require("../utils/map-critics-to-reviews")
const table = "movies as m"

function list() {
    return knex(table).select("*")
}

function listCurrentlyShowing() {
    return knex(table)
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({ "mt.is_showing": true })
        .groupBy("m.movie_id")
}

function read(movie_id) {
    return knex(table)
        .select("*")
        .where({ movie_id })
        .first()
}

function readShowingTheaters({ movie_id }) {
    return knex("movies_theaters as mt")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*")
        .select("mt.movie_id")
        .where({ "mt.movie_id": movie_id }, { "mt.is_showing": true })
}

function readReviewsFromMovie({ movie_id }) {

    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .select("r.created_at as r_created_at")
        .select("r.updated_at as r_updated_at")
        .select("r.critic_id as r_critic_id")
        .where({ "r.movie_id": movie_id })
        .then(mapCriticsToReviews)
}

module.exports = {
    list,
    listCurrentlyShowing,
    read,
    readShowingTheaters,
    readReviewsFromMovie
}