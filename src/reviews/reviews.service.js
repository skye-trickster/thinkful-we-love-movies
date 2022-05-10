const knex = require("../db/connection")
const mapCriticsToReviews = require("../utils/map-critics-to-reviews")

function find(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first()
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ "review_id": updatedReview.review_id })
        .update(updatedReview, "*")
        .then(() => getCriticInfo(updatedReview.critic_id))
        .then((critic) => { updatedReview.critic = critic; return updatedReview })
}

function getCriticInfo(critic_id) {
    return knex("critics")
        .select("*")
        .where({ critic_id })
        .first()
}

async function read(review_id) {
    try {
        const review = await find(review_id)
        const critic = await getCriticInfo(review.critic_id)
        review.critic = critic;
        return review
    } catch (error) {
        console.log(error)
        throw error
    }

}

function destroy(review_id) {
    return knex("reviews as r")
        .select("*")
        .where({ review_id })
        .del()
}

module.exports = {
    find,
    update,
    delete: destroy,
    read
}