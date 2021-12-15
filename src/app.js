const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { pool } = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  //?
  cors({
    origin: "*",
  })
);

app.use(morgan("dev")); //?
app.use(express.json());

const getSolicitud = (request, response) => {
  pool.query("SELECT * FROM SOLICITUDNOM", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addRevision = (request, response) => {
  const { fechaRevision, estadoRevision } = request.body;

  pool.query(
    "INSERT INTO SOLICITUDNOM (fechaRevision, estadoRevision) VALUES ($1, $2)",
    [fechaRevision, estadoRevision],
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .json({ status: "success", message: "Solicitud Revisada." });
    }
  );
};

app
  .route("/Solicitud")
  // GET endpoint
  .get(getSolicitud)
  // POST endpoint
  .post(addRevision);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});

app.get("/", (req, res) => {
  res.json("Successful deployment");
});

module.exports = app;
