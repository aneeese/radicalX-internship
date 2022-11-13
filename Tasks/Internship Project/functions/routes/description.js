const express = require("express");
const admin = require('firebase-admin');
const db = admin.firestore();
const fs = require("fs");
const path = require("path");

let router = express.Router();
router.route("/")
    .get((req, res) => {
        res.send("hi get /description")
    })
    .post(async (req, res) => { 
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
        res.send(response._path.segments[1]);
    });

module.exports = { description: router }