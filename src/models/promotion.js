// Modelo de promociones usando BD Turso/libsql
const { client } = require('../db/libsql');

const promotionModel = {
  // Obtener todas las promociones
  getAll: async () => {
    const result = await client.execute('SELECT id, name, description, price, imageUrl FROM promotions ORDER BY id');
    return result.rows;
  },

  // Obtener una promoción por su ID
  getById: async (id) => {
    const result = await client.execute({
      sql: 'SELECT id, name, description, price, imageUrl FROM promotions WHERE id = ?',
      args: [parseInt(id)],
    });
    return result.rows[0] || null;
  },

  // Crear una nueva promoción
  create: async (promotion) => {
    const result = await client.execute({
      sql: 'INSERT INTO promotions (name, description, price, imageUrl) VALUES (?, ?, ?, ?)',
      args: [promotion.name, promotion.description, Number(promotion.price), promotion.imageUrl || '/images/default_promotion.jpg'],
    });
    const id = Number(result.lastInsertRowid);
    const created = await client.execute({
      sql: 'SELECT id, name, description, price, imageUrl FROM promotions WHERE id = ?',
      args: [id],
    });
    return created.rows[0];
  }
};

module.exports = promotionModel;
