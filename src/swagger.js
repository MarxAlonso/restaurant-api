const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'API de Restaurante',
    version: '1.0.0',
    description: 'Documentación Swagger para la API de Restaurante'
  },
  servers: [
    { url: process.env.BASE_URL || 'http://localhost:3000', description: 'Servidor local / despliegue' }
  ],
  components: {
    schemas: {
      Dish: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number', format: 'float' },
          imageUrl: { type: 'string' }
        }
      },
      Drink: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number', format: 'float' },
          imageUrl: { type: 'string' },
          type: { type: 'string' }
        }
      },
      Dessert: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number', format: 'float' },
          imageUrl: { type: 'string' },
          calories: { type: 'integer' }
        }
      },
      Promotion: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number', format: 'float' },
          imageUrl: { type: 'string' }
        }
      },
      Reservation: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          reservationType: { type: 'string', description: "'Mesa' o 'Evento'" },
          fullName: { type: 'string' },
          numPeople: { type: 'integer' },
          reservationDate: { type: 'string', format: 'date' },
          reservationTime: { type: 'string' },
          eventDetails: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/api/dishes': {
      get: {
        summary: 'Obtener todos los platos',
        responses: {
          '200': {
            description: 'Lista de platos',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Dish' } } } }
          }
        }
      },
      post: {
        summary: 'Crear un plato',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Dish' } } }
        },
        responses: { '201': { description: 'Plato creado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Dish' } } } } }
      }
    },
    '/api/dishes/{id}': {
      get: {
        summary: 'Obtener plato por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Plato', content: { 'application/json': { schema: { $ref: '#/components/schemas/Dish' } } } }, '404': { description: 'No encontrado' } }
      }
    },
    '/api/drinks': {
      get: {
        summary: 'Obtener todas las bebidas',
        responses: { '200': { description: 'Lista de bebidas', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Drink' } } } } } }
      },
      post: {
        summary: 'Crear bebida',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Drink' } } } },
        responses: { '201': { description: 'Bebida creada' } }
      }
    },
    '/api/drinks/type/{type}': {
      get: {
        summary: 'Obtener bebidas por tipo',
        parameters: [{ name: 'type', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Bebidas filtradas', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Drink' } } } } } }
      }
    },
    '/api/desserts': {
      get: { summary: 'Obtener postres', responses: { '200': { description: 'Lista de postres' } } },
      post: { summary: 'Crear postre', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Dessert' } } } }, responses: { '201': { description: 'Postre creado' } } }
    },
    '/api/desserts/low-calorie': {
      get: { summary: 'Postres bajos en calorías', responses: { '200': { description: 'Lista de postres bajos en calorías' } } }
    },
    '/api/promotions': {
      get: { summary: 'Obtener promociones', responses: { '200': { description: 'Lista de promociones', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Promotion' } } } } } } },
      post: { summary: 'Crear promoción', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Promotion' } } } }, responses: { '201': { description: 'Promoción creada' } } }
    },
    '/api/reservations': {
      get: { summary: 'Obtener reservaciones', responses: { '200': { description: 'Lista de reservas' } } },
      post: {
        summary: 'Crear reservación',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Reservation' } } } },
        responses: { '201': { description: 'Reserva creada' }, '409': { description: 'Conflicto (ya reservada)' } }
      }
    }
  }
};

module.exports = swaggerSpec;