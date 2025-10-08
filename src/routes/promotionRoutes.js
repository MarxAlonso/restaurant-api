const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

// Rutas para las promociones
router.get('/', promotionController.getAllPromotions);
router.get('/:id', promotionController.getPromotionById);
router.post('/', promotionController.createPromotion);

module.exports = router;
