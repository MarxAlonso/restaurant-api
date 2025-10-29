require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dishRoutes = require('./routes/dishRoutes');
const drinkRoutes = require('./routes/drinkRoutes');
const dessertRoutes = require('./routes/dessertRoutes');
const promotionRoutes = require('./routes/promotionRoutes');

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configurar archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/api/dishes', dishRoutes);
app.use('/api/drinks', drinkRoutes);
app.use('/api/desserts', dessertRoutes);
app.use('/api/promotions', promotionRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Restaurante',
    endpoints: {
      dishes: '/api/dishes',
      dishById: '/api/dishes/:id',
      drinks: '/api/drinks',
      drinkById: '/api/drinks/:id',
      drinksByType: '/api/drinks/type/:type',
      desserts: '/api/desserts',
      dessertById: '/api/desserts/:id',
      lowCalorieDesserts: '/api/desserts/low-calorie',
      promotions: '/api/promotions',
      promotionById: '/api/promotions/:id',
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;

/**
 * Archivo principal de la API del Restaurante
 * --------------------------------------------
 * Este servidor Express expone endpoints REST para:
 * - Platos (Dishes)
 * - Bebidas (Drinks)
 * - Postres (Desserts)
 * - Promociones (Promotions)
 *
 * Se utiliza en la aplicación móvil (Android Studio)
 * como fuente de datos mediante peticiones HTTP.
 *
 * Ejemplo de consumo desde Android:
 *  GET http://localhost:3000/api/promotions 
 * Aunque ya lo subi a vercel
 */

/**
 * @route GET /api/promotions
 * @description Obtiene todas las promociones del restaurante
 * @access Público
 */
