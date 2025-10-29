const promotionModel = require('../models/promotion');

// Controladores para las operaciones de promociones
const promotionController = {
  // Obtener todas las promociones
  getAllPromotions: async (req, res) => {
    try {
      const promos = await promotionModel.getAll();
      return res.status(200).json({
        success: true,
        data: promos,
        message: 'Promociones obtenidas correctamente'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las promociones',
        error: error.message
      });
    }
  },

  // Obtener una promoción por su ID
  getPromotionById: async (req, res) => {
    try {
      const { id } = req.params;
      const promo = await promotionModel.getById(id);

      if (!promo) {
        return res.status(404).json({
          success: false,
          message: `No se encontró una promoción con el ID: ${id}`
        });
      }

      return res.status(200).json({
        success: true,
        data: promo,
        message: 'Promoción obtenida correctamente'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener la promoción',
        error: error.message
      });
    }
  },

  // Crear una nueva promoción
  createPromotion: async (req, res) => {
    try {
      const { name, description, price, imageUrl } = req.body;

      if (!name || !description || !price) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos obligatorios (nombre, descripción, precio)'
        });
      }

      const newPromotion = await promotionModel.create({
        name,
        description,
        price,
        imageUrl
      });

      return res.status(201).json({
        success: true,
        data: newPromotion,
        message: 'Promoción creada correctamente'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al crear la promoción',
        error: error.message
      });
    }
  }
};

module.exports = promotionController;
