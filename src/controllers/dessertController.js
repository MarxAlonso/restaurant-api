// Controlador para los postres
const { dessertModel } = require('../models/dessert');

const dessertController = {
  // Obtener todos los postres
  getAllDesserts: (req, res) => {
    try {
      const desserts = dessertModel.getAll();
      return res.status(200).json({
        success: true,
        count: desserts.length,
        data: desserts
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error al obtener los postres'
      });
    }
  },

  // Obtener un postre por ID
  getDessertById: (req, res) => {
    try {
      const id = req.params.id;
      const dessert = dessertModel.getById(id);
      
      if (!dessert) {
        return res.status(404).json({
          success: false,
          error: `No se encontró el postre con ID ${id}`
        });
      }

      return res.status(200).json({
        success: true,
        data: dessert
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error al obtener el postre'
      });
    }
  },

  // Crear un nuevo postre
  createDessert: (req, res) => {
    try {
      const { name, description, price, imageUrl, calories } = req.body;
      
      // Validación básica
      if (!name || !description || !price) {
        return res.status(400).json({
          success: false,
          error: 'Por favor proporcione nombre, descripción y precio'
        });
      }

      const newDessert = dessertModel.create({
        name,
        description,
        price,
        imageUrl,
        calories
      });

      return res.status(201).json({
        success: true,
        data: newDessert
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error al crear el postre'
      });
    }
  },

  // Obtener postres bajos en calorías
  getLowCalorieDesserts: (req, res) => {
    try {
      const desserts = dessertModel.getLowCalorie();
      return res.status(200).json({
        success: true,
        count: desserts.length,
        data: desserts
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error al obtener los postres bajos en calorías'
      });
    }
  }
};

module.exports = dessertController;