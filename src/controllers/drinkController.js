const drinkModel = require('../models/drink');

// Controladores para las operaciones de bebidas
const drinkController = {
  // Obtener todas las bebidas
  getAllDrinks: (req, res) => {
    try {
      const drinks = drinkModel.getAll();
      return res.status(200).json({
        success: true,
        data: drinks,
        message: 'Bebidas obtenidas correctamente'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las bebidas',
        error: error.message
      });
    }
  },

  // Obtener una bebida por su ID
  getDrinkById: (req, res) => {
    try {
      const { id } = req.params;
      const drink = drinkModel.getById(id);
      
      if (!drink) {
        return res.status(404).json({
          success: false,
          message: `No se encontró una bebida con el ID: ${id}`
        });
      }

      return res.status(200).json({
        success: true,
        data: drink,
        message: 'Bebida obtenida correctamente'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener la bebida',
        error: error.message
      });
    }
  },

  // Crear una nueva bebida
  createDrink: (req, res) => {
    try {
      const { name, description, price, imageUrl, type } = req.body;
      
      // Validación básica
      if (!name || !description || !price) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos obligatorios (nombre, descripción, precio)'
        });
      }

      const newDrink = drinkModel.create({
        name,
        description,
        price,
        imageUrl,
        type
      });

      return res.status(201).json({
        success: true,
        data: newDrink,
        message: 'Bebida creada correctamente'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al crear la bebida',
        error: error.message
      });
    }
  },

  // Obtener bebidas por tipo
  getDrinksByType: (req, res) => {
    try {
      const { type } = req.params;
      const drinks = drinkModel.getByType(type);
      
      return res.status(200).json({
        success: true,
        data: drinks,
        message: `Bebidas de tipo ${type} obtenidas correctamente`
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error al obtener bebidas de tipo ${type}`,
        error: error.message
      });
    }
  }
};

module.exports = drinkController;