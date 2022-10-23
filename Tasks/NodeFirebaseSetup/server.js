const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({ credential: admin.credential.cert(credentials) });
const db = admin.firestore();

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post("/create", (req, res) => {
    const userJSON = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    const response = db.collection("users").add(userJSON);
    res.send(response);
});

app.get("/read", async (req, res) => {
    const usersRef = db.collection("users");
    const response = await usersRef.get();
    let responseArr = [];
    response.forEach(doc => { responseArr.push(doc.data()) });
    res.send(responseArr);
});

app.get("/read/:id", async (req, res) => {
    const userRef = db.collection("users").doc(req.params.id);
    const response = await userRef.get();
    res.send(response.data());
});

app.post("/update/:id", async (req, res) => {
    const newLastName = "Anees";
    const userRef = await db.collection("users").doc(req.params.id).update({ lastName: newLastName });
    res.send(userRef);
});

app.delete("/delete/:id", async (req, res) => {
    const response = await db.collection("users").doc(req.params.id).delete();
    res.send(response);
});

app.listen(3000, () => {
    console.log("Server has started successfully!");
});