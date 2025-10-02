const express = require('express');
const router = express.Router();
const drinkController = require('../controllers/drinkController');

// Rutas para las bebidas
router.get('/', drinkController.getAllDrinks);
router.get('/:id', drinkController.getDrinkById);
router.post('/', drinkController.createDrink);
router.get('/type/:type', drinkController.getDrinksByType);

module.exports = router;