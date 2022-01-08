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
  const { fechaPago, salarioPagar} = request.body;

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

//ESTE ES EL ENDPOINT PARA GUARDAR EN BD --> el bueno
const addRevision = (request, response) => {
  const { ID_Solicitud_N, ID_A, Total_Horas_T, Fecha, ES_Solicitud_N, NumNomina } = request.body;

  pool.query(
    "UPDATE solicitudnom SET ID_Solicitud_N = $1,  ID_A= $2, Total_Horas_T= $3, Fecha= $4, ES_Solicitud_N= $5  WHERE NumNomina = $6",
    [ID_Solicitud_N, ID_A, Total_Horas_T, Fecha, ES_Solicitud_N, NumNomina],
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .json({ status: "success", message: "Exito." });
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


const getEmpleados = (request, response) => {
  pool.query("SELECT * FROM empleados", (error, results) => {
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

  app.route("/Empleado").get(getEmpleados)

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
