// Modelo de bebidas usando BD Turso/libsql
const { client } = require('../db/libsql');

const drinkModel = {
  // Obtener todas las bebidas
  getAll: async () => {
    const result = await client.execute('SELECT id, name, description, price, imageUrl, type FROM drinks ORDER BY id');
    return result.rows;
  },
  
  // Obtener una bebida por su ID
  getById: async (id) => {
    const result = await client.execute({
      sql: 'SELECT id, name, description, price, imageUrl, type FROM drinks WHERE id = ?',
      args: [parseInt(id)],
    });
    return result.rows[0] || null;
  },
  
  // Crear una nueva bebida
  create: async (drink) => {
    const result = await client.execute({
      sql: 'INSERT INTO drinks (name, description, price, imageUrl, type) VALUES (?, ?, ?, ?, ?)',
      args: [drink.name, drink.description, Number(drink.price), drink.imageUrl || '/images/default_drink.jpg', drink.type || 'refresco'],
    });
    const id = Number(result.lastInsertRowid);
    const created = await client.execute({
      sql: 'SELECT id, name, description, price, imageUrl, type FROM drinks WHERE id = ?',
      args: [id],
    });
    return created.rows[0];
  },
  
  // Obtener bebidas por tipo
  getByType: async (type) => {
    const result = await client.execute({
      sql: 'SELECT id, name, description, price, imageUrl, type FROM drinks WHERE LOWER(type) = LOWER(?) ORDER BY id',
      args: [type],
    });
    return result.rows;
  }
};

module.exports = drinkModel;