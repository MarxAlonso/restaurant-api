const dishModel = require('../models/dish');

// Controladores para las operaciones de platos
const dishController = {
  // Obtener todos los platos
  getAllDishes: async (req, res) => {
    try {
      const dishes = await dishModel.getAll();
      return res.status(200).json({
        success: true,
        data: dishes,
        message: 'Platos obtenidos correctamente'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los platos',
        error: error.message
      });
    }
  },

  // Obtener un plato por su ID
  getDishById: async (req, res) => {
    try {
      const { id } = req.params;
      const dish = await dishModel.getById(id);
      
      if (!dish) {
        return res.status(404).json({
          success: false,
          message: `No se encontró un plato con el ID: ${id}`
        });
      }

      return res.status(200).json({
        success: true,
        data: dish,
        message: 'Plato obtenido correctamente'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el plato',
        error: error.message
      });
    }
  },

  // Crear un nuevo plato
  createDish: async (req, res) => {
    try {
      const { name, description, price, imageUrl } = req.body;
      
      // Validación básica
      if (!name || !description || !price) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos obligatorios (nombre, descripción, precio)'
        });
      }

      const newDish = await dishModel.create({
        name,
        description,
        price,
        imageUrl: imageUrl || '/images/default.jpg'
      });

      return res.status(201).json({
        success: true,
        data: newDish,
        message: 'Plato creado correctamente'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al crear el plato',
        error: error.message
      });
    }
  }
};

module.exports = dishController;