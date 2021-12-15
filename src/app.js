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

//PUNTO 3 INSERTAR LOS DATOS DE LA SOLICITUD NOMINA
const addSolicitudN = (request, response) => {
  const { fechaPago, salarioPagar, horasTrabajadas, horasExtra, comisiones, salarioBase, aguinaldo, sat, imss, fVivienda, fRetiro, sueldoTotal, fechaTransaccion, transaccion, idEmpleados} = request.body;

  pool.query(
    "INSERT INTO solicitudnom (fechaPago, salarioPagar) VALUES ($1, $2)",
    [fechaPago, salarioPagar],
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .json({ status: "success", message: "Solicitud Guardada." });
    }
  );
  
  pool.query(
    "INSERT INTO nomina (horasTrabajadas, horasExtra, comisiones, salarioBase, aguinaldo, sat, imss, fVivienda, fRetiro, sueldoTotal, fechaTransaccion, transaccion, idEmpleados) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
    [horasTrabajadas, horasExtra, comisiones, salarioBase, aguinaldo, sat, imss, fVivienda, fRetiro, sueldoTotal, fechaTransaccion, transaccion, idEmpleados],
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

//PUNTO 3 RECIBIR LOS DATOS DE LA SOLICITUD NOMINA
const getNomina = (request, response) => {
  pool.query("SELECT N.idNomina, S.fechaPago, N.horasExtra, N.salarioBase, N.sueldoTotal, S.salarioPagar, S.idsolicitudn FROM nomina AS N LEFT JOIN solicitudnom AS S ON N.idNomina = S.idNomina", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

//PUNTO 4 INSERTAR LOS DATOS DE LA AUTORIZACION FINANZAS
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


//PUNTO 4 RECIBIR LOS DATOS DE LA AUTORIZACION FINANZAS
const getSolicitud = (request, response) => {
  pool.query("SELECT * FROM solicitudnom", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};



app
  .route("/Solicitud")
  // GET endpoint
  .get(getSolicitud)
  // POST endpoint
  .post(addRevision);

app
  .route("/Nomina")
  //GET endpoint
  .get(getNomina)
  //POST endpoint
  .post(addSolicitudN);

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
