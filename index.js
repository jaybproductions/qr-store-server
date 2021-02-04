const express = require("express");
const helmet = require("helmet");
const axios = require("axios");
const morgan = require("morgan");
const cors = require("cors");
const qrRoutes = require("./routes/qrRoutes");

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

app.use("/qr", qrRoutes);

app.listen(86, (req, res) => {
  console.log("server is online");
});
