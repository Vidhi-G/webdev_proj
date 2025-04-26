require("./models/User");
require("./models/Request");
require("./models/Reply");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/AuthRoutes");
const requireAuth = require("./middlewares/RequireAuth");
const requestRoutes = require("./routes/RequestRoutes");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(requestRoutes);
const mongouri =
  "mongodb+srv://technexus:ZERgUs00gMIV4QAP@cluster0.cu8c9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongouri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email:${req.user.email}`);
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
