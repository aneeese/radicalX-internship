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
        res.send("hi get /surveys");
    })
    .put(validator.surveys, async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const response = await db.collection("internships").doc(key).update({
            surveys: {
                survey_1: {
                    question_1: req.body.survey_1.question_1
                },
                survey_2: {
                    question_1: req.body.survey_2.question_1
                }
            }
        })
        res.send("Input successfully added to database!");
    });

module.exports = { surveys: router };