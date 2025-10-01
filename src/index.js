const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dishRoutes = require('./routes/dishRoutes');

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

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Restaurante',
    endpoints: {
      dishes: '/api/dishes',
      dishById: '/api/dishes/:id'
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;