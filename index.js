const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./db.js");

const app = express();

app.use(morgan('dev'));
app.use(express.json());

dotenv.config({
    path: "./config/config.env"
});

connectDB();

const PORT = process.env.PORT || 3000;
app.use("/api/shopping/auth", require("./routes/user.js"));

app.listen(PORT, console.log(`Server running in port: ${PORT}`.red.underline.bold));
