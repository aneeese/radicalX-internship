const express = require("express");
const { validationResult } = require("express-validator");
const admin = require('firebase-admin');
const db = admin.firestore();
const fs = require("fs");
const path = require("path");
const validator = require("../validator");

// reading the id of last added document to database for updating document
const key = fs.readFileSync(path.join(__dirname, "/keyFile.txt"), "utf8");

let router = express.Router();

router.route("/")
    .get((req, res) => {
        res.send("hi get /guide");
    })
    .put(validator.guide, async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const response = await db.collection("internships").doc(key).update({
            guide: {
                overview: {
                    brief: {
                        description: req.body.overview.brief.description,
                        video: req.body.overview.brief.video
                    },
                    requirements: {
                        description: req.body.overview.requirements.description,
                        video: req.body.overview.requirements.video
                    },
                    milestones: {
                        description: req.body.overview.milestones.description,
                        video: req.body.overview.milestones.video
                    }
                },
                schedule: {
                    duration: {
                        description: req.body.schedule.duration.description,
                        video: req.body.schedule.duration.video
                    },
                    timeline: {
                        description: req.body.schedule.timeline.description,
                        video: req.body.schedule.timeline.video
                    },
                    deliverables: {
                        description: req.body.schedule.deliverables.description,
                        video: req.body.schedule.deliverables.video
                    }
                },
                resources: {
                    curated_resources: {
                        description: req.body.resources.curated_resources.description,
                        video: req.body.resources.curated_resources.video
                    },
                    events: {
                        description: req.body.resources.events.description,
                        video: req.body.resources.events.video
                    }
                }
            }
        })
        res.send("Input successfully added to database!");
    });

module.exports = { guide: router };