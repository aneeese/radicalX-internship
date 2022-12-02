const { body } = require('express-validator');

exports.deccription = [
    body("category").notEmpty(),
    body("description").notEmpty(),
    body("location").notEmpty(),
    body("benefits").notEmpty(),
    body("intro_video").notEmpty(),
    body("mentor_details.name").notEmpty(),
    body("mentor_details.profile_photo").notEmpty(),
    body("mentor_details.email_address").notEmpty().isEmail(),
    body("mentor_details.linkedin_url").optional().isURL(),
    body("recommended_roles").notEmpty(),
    body("wlinks").notEmpty().isURL()
]

exports.guide = [
    body("overview.brief.description").notEmpty(),
    body("overview.brief.video").notEmpty(),
    body("overview.requirements.description").notEmpty(),
    body("overview.requirements.video").notEmpty(),
    body("overview.milestones.description").notEmpty(),
    body("overview.milestones.video").notEmpty(),

    body("schedule.duration.description").notEmpty(),
    body("schedule.duration.video").notEmpty(),
    body("schedule.timeline.description").notEmpty(),
    body("schedule.timeline.video").notEmpty(),
    body("schedule.deliverables.description").notEmpty(),
    body("schedule.deliverables.video").notEmpty(),

    body("resources.curated_resources.description").notEmpty(),
    body("resources.curated_resources.video").notEmpty(),
    body("resources.events.description").notEmpty(),
    body("resources.events.video").notEmpty()
]

exports.surveys = [
    body("survey_1.question_1").notEmpty(),
    body("survey_2.question_1").notEmpty()
]

exports.settings = [
    body("basic_settings.internship_url").notEmpty().isURL(),
    body("basic_settings.access.private_internship").notEmpty().isBoolean(),
    body("basic_settings.access.hidden_internship").notEmpty().isBoolean(),
    body("basic_settings.security.text_copying").notEmpty().isBoolean(),

    body("hero_image.internship_url").notEmpty().isURL(),
    body("hero_image.access.private_internship").notEmpty().isBoolean(),
    body("hero_image.access.hidden_internship").notEmpty().isBoolean(),
    body("hero_image.security.text_copying").notEmpty().isBoolean()
]
