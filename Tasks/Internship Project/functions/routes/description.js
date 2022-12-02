const express = require("express");
const { validationResult } = require("express-validator");
const admin = require('firebase-admin');
const db = admin.firestore();
const fs = require("fs");
const path = require("path");
const validator = require("../validator");

let router = express.Router();
router.route("/")
    .get((req, res) => {
        res.send("hi get /description")
    })
    .post(validator.deccription, async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        } 
        const description_data = {
            description: {
                category: req.body.category,
                description: req.body.description,
                location: req.body.location,
                benefits: req.body.benefits,
                intro_video: req.body.intro_video,
                mentor_details: {
                    name: req.body.mentor_details.name,
                    profile_photo: req.body.mentor_details.profile_photo,
                    email_address: req.body.mentor_details.email_address,
                    linkedin_url: req.body.mentor_details.linkedin_url
                },
                recommended_roles: req.body.recommended_roles,
                wlinks: req.body.wlinks
            }
        }
        const response = await db.collection("internships").add(description_data);
        // writing the id of current document to a file for later use
        fs.writeFile(path.join(__dirname, "keyFile.txt"), response._path.segments[1], error => { if (error) console.log(error) });
        res.send("Input successfully added to database!");
    });

module.exports = { description: router }