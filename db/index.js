const pg = require('pg');
require('dotenv').config();



const localConnectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const productionConnectionString = process.env.DATABASE_URL;
const connectionString = (process.env.NODE_ENV === 'local') ? localConnectionString : productionConnectionString;

const client = new pg.Client({
  connectionString: connectionString,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

console.log(`connected to ${connectionString}, in environment: ${process.env.NODE_ENV}`);
client.connect();

module.exports = client;