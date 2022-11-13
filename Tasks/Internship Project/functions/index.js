const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

// Firebase initialization
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// Routes
const { guide } = require("./routes/guide");
const { surveys } = require("./routes/surveys");
const { settings } = require("./routes/settings");
const { description } = require("./routes/description");

// Middlewares
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// using router files to handle respective endpoints
app.use("/guide", guide);
app.use("/surveys", surveys);
app.use("/settings", settings);
app.use("/description", description);

app.get("/", async (req, res) => {
    res.send("home page!")
});

exports.app = functions.https.onRequest(app);