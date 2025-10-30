const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Rutas para las reservas
router.post('/', reservationController.createReservation); // Crear una nueva reserva
router.get('/', reservationController.getAllReservations); // Obtener todas las reservas

module.exports = router;