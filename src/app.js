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
/*
const addSolicitudN = (request, response) => {
  const { fechaPago, salarioPagar } = request.body;
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
*/

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
//Solicitud select solicitudnom aprobada
const getSolicitudAP = (request, response) => {
  pool.query("SELECT * FROM nomina JOIN empleados ON nomina.idempleados = empleados.idempleados JOIN solicitudnom ON nomina.idnomina = solicitudnom.numnomina WHERE es_solicitud_n = 'Aprobado'", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

//Solicitud get nomina antiguo
/*
const getNomina = (request, response) => {
  pool.query(
    "SELECT N.idNomina, S.fechaPago, N.horasExtra, N.salarioBase, N.sueldoTotal, S.salarioPagar, S.idsolicitudn FROM nomina AS N LEFT JOIN solicitudnom AS S ON N.idNomina = S.idNomina",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
*/

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
    horastrabajadas,
    horasextra,
    comisiones,
    salariobase,
    aguinaldo,
    sat,
    imss,
    fvivienda,
    fretiro,
    sueldototal,
    fechatransaccion,
    transaccion,
    idempleados,
  } = request.body;
  pool.query(
    "UPDATE nomina SET idempleados = $1,  horastrabajadas= $2, horasextra= $3, comisiones= $4, salariobase= $5, aguinaldo=$6, sat=$7, imss=$8, fvivienda=$9, fretiro=$10, sueldototal=$11, fechatransaccion=$12, transaccion=$13 WHERE idnomina = $14",
    [idempleados, horastrabajadas, horasextra, comisiones, salariobase, aguinaldo, sat, imss, fvivienda, fretiro, sueldototal, fechatransaccion, transaccion, idnomina],
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
app.route("/Aprobados").get(getSolicitudAP);

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
