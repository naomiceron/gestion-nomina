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

//Solicitud insertar solicitud nomina

const addSolicitudN = (request, response) => {
  const { NumNomina } = request.body;
  pool.query(
    "INSERT INTO solicitudnom (numnomina) VALUES ($1)",
    [NumNomina],
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


//ESTE ES EL ENDPOINT PARA GUARDAR EN BD --> el bueno
const addRevision = (request, response) => {
  const {
    ID_Solicitud_N,
    ID_A,
    Total_Horas_T,
    Fecha,
    ES_Solicitud_N,
    NumNomina,
  } = request.body;
  pool.query(
    "UPDATE solicitudnom SET ID_Solicitud_N = $1,  ID_A= $2, Total_Horas_T= $3, Fecha= $4, ES_Solicitud_N= $5  WHERE NumNomina = $6",
    [ID_Solicitud_N, ID_A, Total_Horas_T, Fecha, ES_Solicitud_N, NumNomina],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "Exito." });
    }
  );
};

//Solicitud select solicitudnom
const getSolicitud = (request, response) => {
  pool.query("SELECT * FROM nomina JOIN empleados ON nomina.idempleados = empleados.idempleados JOIN solicitudnom ON nomina.idnomina = solicitudnom.numnomina", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

//solicitud get nomina
const getNomina = (request, response) => {
  pool.query(
    "SELECT * FROM nomina JOIN empleados ON nomina.idempleados = empleados.idempleados",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//solicitud update nomina --> este es el que modificarías si es necesario michelle
const addNomina = (request, response) => {
  const {
    idnomina,
    comisiones,
    salariobase,
    aguinaldo,
    sat,
    imss,
    fvivienda,
    fretiro,
    sueldototal,
    idempleados,
  } = request.body;
  pool.query(
    "UPDATE nomina SET idempleados = $1,  comisiones= $2, salariobase= $3, aguinaldo=$4, sat=$5, imss=$6, fvivienda=$7, fretiro=$8, sueldototal=$9 WHERE idnomina = $10",
    [idempleados, comisiones, salariobase, aguinaldo, sat, imss, fvivienda, fretiro, sueldototal, idnomina],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "Exito." });
    }
  );
};

//solicitud insertar horas
const addHoras = (request, response) => {
  const { idempleados, horasextra, horastrabajadas } = request.body;
  pool.query(
    "INSERT INTO nomina (idempleados, horasextra, horastrabajadas) VALUES ($1, $2, $3)",
    [idempleados, horasextra, horastrabajadas],
    (error) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .json({ status: "success", message: "Horas Guardadas." });
    }
  );
};

//solicitud traer empleados
const getEmpleados = (request, response) => {
  pool.query("SELECT * FROM empleados", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

//Solicitud traer usuarios
const getUsuarios = (request, response) => {
  pool.query("SELECT * FROM usuarios", (error, results) => {
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
  .post(addNomina);

app
  .route("/Horas")
  .post(addHoras);

app.route("/Empleado").get(getEmpleados);

app.route("/Usuarios").get(getUsuarios);
app.route("/AddSol").post(addSolicitudN);

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
