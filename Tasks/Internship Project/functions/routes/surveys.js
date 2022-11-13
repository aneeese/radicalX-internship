const express = require("express");
const admin = require('firebase-admin');
const db = admin.firestore();
const fs = require("fs");
const path = require("path");

const key = fs.readFileSync(path.join(__dirname, "/keyFile.txt"), "utf8");

let router = express.Router();

router.route("/")
    .get((req, res) => {
        res.send("hi get /surveys");
    })
    .put(async (req, res) => {
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
        res.send(response);
    });

module.exports = { surveys: router };