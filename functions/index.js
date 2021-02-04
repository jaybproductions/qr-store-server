const functions = require("firebase-functions");

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const rootURL = "https://chart.googleapis.com/chart?";

const app = express();

var admin = require("firebase-admin");

var serviceAccount = require("./qrstore-ab99e-firebase-adminsdk-5vpra-ee7934154d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());

const db = admin.firestore();

app.get("/newqr/:data", (req, res) => {
  const data = `${rootURL}cht=qr&chs=150x150&chl=${req.params.data}`;
  res.send(data);
});

exports.addUser = functions.auth.user().onCreate((user) => {
  const newUser = {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    isAdmin: false,
    qrCodes: [],
    created: Date.now(),
  };
  db.collection("users").doc(user.uid).set(newUser);
  console.log("User added to database");
});

exports.app = functions.https.onRequest(app);
