require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use("/api/movies", require("./routes/movies"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));

