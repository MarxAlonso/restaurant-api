# API de Restaurante

Una API simple para gestionar información de platos de un restaurante, desarrollada con Node.js y Express.

## Características

- Obtener todos los platos disponibles
- Obtener detalles de un plato específico por ID
- Crear nuevos platos
- Imágenes de platos servidas estáticamente

## Instalación

1. Clona este repositorio:
```
git clone <url-del-repositorio>
```

2. Instala las dependencias:
```
cd restaurant-api
npm install
```

3. Inicia el servidor:
```
npm start
```

El servidor estará disponible en http://localhost:3000

## Endpoints de la API

- `GET /api/dishes`: Obtiene todos los platos
- `GET /api/dishes/:id`: Obtiene un plato específico por ID
- `POST /api/dishes`: Crea un nuevo plato

## Estructura del proyecto

```
restaurant-api/
├── public/
│   └── images/       # Imágenes de los platos
├── src/
│   ├── controllers/  # Controladores de la API
│   ├── models/       # Modelos de datos
│   ├── routes/       # Rutas de la API
│   └── index.js      # Punto de entrada de la aplicación
├── package.json
└── vercel.json       # Configuración para despliegue en Vercel
```

## Despliegue en Vercel

Este proyecto está configurado para ser desplegado en Vercel. Para desplegarlo:

1. Instala la CLI de Vercel:
```
npm install -g vercel
```

2. Despliega el proyecto:
```
vercel
```

## Ejemplo de uso

### Obtener todos los platos

```
GET /api/dishes
```

### Obtener un plato por ID

```
GET /api/dishes/1
```

### Crear un nuevo plato

```
POST /api/dishes
Content-Type: application/json

{
  "name": "Nuevo Plato",
  "description": "Descripción del nuevo plato",
  "price": 15.99,
  "imageUrl": "/images/default.jpg"
}
```