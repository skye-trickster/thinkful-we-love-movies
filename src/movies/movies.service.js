const knex = require("../db/connection") // need knex for db management
const mapProperties = require("../utils/map-properties")
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

function mapCriticsToReviews(reviews) {
    return reviews.map(mapProperties({
        c_critic_id: "critic.critic_id",
        c_preferred_name: "critic.preferred_name",
        c_surname: "critic.surname",
        c_organization_name: "critic.organization_name",
        c_created_at: "critic.created_at",
        c_updated_at: "critic.updated_at"
    }))
}

function readReviewsFromMovie({ movie_id }) {

    // select each row manually to ensure I get the rows that I want
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.review_id")
        .select("r.content")
        .select("r.score")
        .select("r.created_at")
        .select("r.updated_at")
        .select("r.critic_id")
        .select("r.movie_id")
        .select("c.critic_id as c_critic_id")
        .select("c.preferred_name as c_preferred_name")
        .select("c.surname as c_surname")
        .select("c.organization_name as c_organization_name")
        .select("c.created_at as c_created_at")
        .select("c.updated_at as c_updated_at")
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