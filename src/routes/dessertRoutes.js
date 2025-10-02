// Rutas para los postres
const express = require('express');
const router = express.Router();
const dessertController = require('../controllers/dessertController');

// Obtener todos los postres
router.get('/', dessertController.getAllDesserts);

// Obtener postres bajos en calorías
router.get('/low-calorie', dessertController.getLowCalorieDesserts);

// Obtener un postre por ID
router.get('/:id', dessertController.getDessertById);

// Crear un nuevo postre
router.post('/', dessertController.createDessert);

module.exports = router;