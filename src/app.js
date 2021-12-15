const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { pool } = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev")); //?
app.use(express.json());

const getSolicitud = (request, response) => {
  pool.query("SELECT * FROM solicitudnom", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addRevision = (request, response) => {
  const { fechaRevision, estadoRevision, idsolicitudn } = request.body;

  pool.query(
    "UPDATE solicitudnom SET fechaRevision = $1, estadoRevision= $2 WHERE idsolicitudn = $3",
    [fechaRevision, estadoRevision, idsolicitudn],
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

app.get("/health", (req, res) => {
  res.json("Successful deployment");
});

app.get("/db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM empleados");
    const results = { results: result ? result.rows : null };
    res.render("pages/db", results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = app;
