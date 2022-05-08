const knex = require("knex") // need knex for db management

const table = "movies as m"

function list() {
    return knex(table).select("*")
}

module.exports = {
    list
}