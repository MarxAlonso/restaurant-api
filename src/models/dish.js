// Modelo de platos usando BD Turso/libsql
const { client } = require('../db/libsql');

const dishModel = {
  // Obtener todos los platos
  getAll: async () => {
    const result = await client.execute('SELECT id, name, description, price, imageUrl FROM dishes ORDER BY id');
    return result.rows;
  },
  
  // Obtener un plato por su ID
  getById: async (id) => {
    const result = await client.execute({
      sql: 'SELECT id, name, description, price, imageUrl FROM dishes WHERE id = ?',
      args: [parseInt(id)],
    });
    return result.rows[0] || null;
  },
  
  // Crear un nuevo plato
  create: async (dish) => {
    const result = await client.execute({
      sql: 'INSERT INTO dishes (name, description, price, imageUrl) VALUES (?, ?, ?, ?)',
      args: [dish.name, dish.description, Number(dish.price), dish.imageUrl || '/images/default.jpg'],
    });
    const id = Number(result.lastInsertRowid);
    const created = await client.execute({
      sql: 'SELECT id, name, description, price, imageUrl FROM dishes WHERE id = ?',
      args: [id],
    });
    return created.rows[0];
  }
};

module.exports = dishModel;