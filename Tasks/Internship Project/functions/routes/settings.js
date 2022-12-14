const express = require("express");
const { validationResult } = require("express-validator");
const admin = require('firebase-admin');
const db = admin.firestore();
const fs = require("fs");
const path = require("path");
const validator = require("../validator");

const key = fs.readFileSync(path.join(__dirname, "/keyFile.txt"), "utf8");

let router = express.Router();

router.route("/")
    .get((req, res) => {
        res.send("hi get /settings");
    })
    .put(validator.settings, async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        } 
        const response = await db.collection("internships").doc(key).update({
            settings: {
                basic_settings: {
                    internship_url: req.body.basic_settings.internship_url,
                    access: {
                        private_internship: req.body.basic_settings.access.private_internship,
                        hidden_internship: req.body.basic_settings.access.hidden_internship
                    },
                    security: {
                        text_copying: req.body.basic_settings.security.text_copying
                    }
                },
                hero_image: {
                    internship_url: req.body.hero_image.internship_url,
                    access: {
                        private_internship: req.body.hero_image.access.private_internship,
                        hidden_internship: req.body.hero_image.access.hidden_internship
                    },
                    security: {
                        text_copying: req.body.hero_image.security.text_copying
                    }
                }
            }
        })
        res.send("Input successfully added to database!")
    });

module.exports = { settings: router };