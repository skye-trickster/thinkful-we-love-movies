const mapProperties = require("./map-properties")

function mapCriticsToReviews(reviews) {
    return reviews.map(mapProperties({
        critic_id: "critic.critic_id",
        created_at: "critic.created_at",
        updated_at: "critic.updated_at",
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name",
        r_created_at: "created_at",
        r_updated_at: "updated_at",
        r_critic_id: "critic_id"
    }))
}

module.exports = mapCriticsToReviews