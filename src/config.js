require("dotenv").config();

const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgres://twqcwhuvbjpvep:68aac0bf92f7cd8936df8ca4b763d7bcb37bfdec4ef3ecea6235b8c28e540812@ec2-44-193-111-218.compute-1.amazonaws.com:5432/dtvn1svfmp0ts`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

module.exports = { pool };
