// Modelo para los postres del restaurante (BD Turso/libsql)
const { client } = require('../db/libsql');

const dessertModel = {
  // Obtener todos los postres
  getAll: async () => {
    const result = await client.execute('SELECT id, name, description, price, imageUrl, calories FROM desserts ORDER BY id');
    return result.rows;
  },

  // Obtener un postre por ID
  getById: async (id) => {
    const result = await client.execute({
      sql: 'SELECT id, name, description, price, imageUrl, calories FROM desserts WHERE id = ?',
      args: [parseInt(id)],
    });
    return result.rows[0] || null;
  },

  // Crear un nuevo postre
  create: async (dessertData) => {
    const result = await client.execute({
      sql: 'INSERT INTO desserts (name, description, price, imageUrl, calories) VALUES (?, ?, ?, ?, ?)',
      args: [
        dessertData.name,
        dessertData.description,
        Number(dessertData.price),
        dessertData.imageUrl || '/images/default_dessert.jpg',
        dessertData.calories ? parseInt(dessertData.calories) : 0,
      ],
    });

    const id = Number(result.lastInsertRowid);
    const created = await client.execute({
      sql: 'SELECT id, name, description, price, imageUrl, calories FROM desserts WHERE id = ?',
      args: [id],
    });
    return created.rows[0];
  },

  // Obtener postres bajos en calorías
  getLowCalorie: async () => {
    const result = await client.execute({
      sql: 'SELECT id, name, description, price, imageUrl, calories FROM desserts WHERE calories < 300 ORDER BY calories ASC',
      args: [],
    });
    return result.rows;
  },
};

module.exports = {
  dessertModel,
};