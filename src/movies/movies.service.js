const knex = require("../db/connection") // need knex for db management

const table = "movies as m"

function list() {
    return knex(table).select("*")
}

function listCurrentlyShowing() {
    return knex(table)
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({ "mt.is_showing": true })
}

function read(movie_id) {
    return knex(table)
        .select("*")
        .where({ movie_id })
        .first()
}

module.exports = {
    list,
    listCurrentlyShowing,
    read
}