const { createClient } = require('@libsql/client');

const getEnv = (keyList) => {
  for (const key of keyList) {
    if (process.env[key]) return process.env[key];
  }
  return undefined;
};

const databaseUrl = getEnv(['TURSO_DATABASE_URL', 'LIBSQL_URL', 'DATABASE_URL']);
const authToken = getEnv(['TURSO_AUTH_TOKEN', 'LIBSQL_AUTH_TOKEN', 'DATABASE_AUTH_TOKEN']);

if (!databaseUrl) {
  throw new Error('[db] Falta TURSO_DATABASE_URL/LIBSQL_URL/DATABASE_URL en variables de entorno');
}

const client = createClient({
  url: databaseUrl,
  authToken,
});

module.exports = {
  client,
};