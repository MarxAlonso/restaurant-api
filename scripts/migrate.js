require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createClient } = require('@libsql/client');

const getEnv = (keys) => keys.find((k) => process.env[k]) && process.env[keys.find((k) => process.env[k])];

const databaseUrl = getEnv(['TURSO_DATABASE_URL', 'LIBSQL_URL', 'DATABASE_URL']);
const authToken = getEnv(['TURSO_AUTH_TOKEN', 'LIBSQL_AUTH_TOKEN', 'DATABASE_AUTH_TOKEN']);

if (!databaseUrl) {
  console.error('ERROR: Falta TURSO_DATABASE_URL/LIBSQL_URL/DATABASE_URL en variables de entorno.');
  process.exit(1);
}

const client = createClient({ url: databaseUrl, authToken });

async function run() {
  try {
    const schemaPath = path.join(__dirname, '../src/db/schema.sql');
    const sqlRaw = fs.readFileSync(schemaPath, 'utf8');
    // Normalizar posibles espacios no rompibles (NBSP) y saltos de línea
    const sql = sqlRaw.replace(/\u00A0/g, ' ').replace(/\r\n/g, '\n');

    // Dividir por ';' y ejecutar sentencias no vacías
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      try {
        await client.execute(stmt);
      } catch (err) {
        console.error(`Fallo en sentencia ${i + 1} de ${statements.length}:`);
        console.error(stmt);
        throw err;
      }
    }

    console.log('Migración ejecutada correctamente.');
    process.exit(0);
  } catch (err) {
    console.error('Error ejecutando migración:', err);
    process.exit(1);
  }
}

run();