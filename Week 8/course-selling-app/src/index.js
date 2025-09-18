const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

const adminRoutes = require("./routes/adminRoute");
const userRoutes = require("./routes/userRoute")
const app = express();

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.listen(3000);
