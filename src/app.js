const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

/*
const peopleRoutes = require('./routes/people.routes')
const authRoutes = require('./routes/auth.routes')
const feedbackRoutes = require('./routes/feedback.routes')
const teamsRoutes = require('./routes/teams.routes')
const radsRoutes = require('./routes/rads.routes') 
*/

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json());

console.log("success");

module.exports = app;
