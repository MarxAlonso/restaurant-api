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

3. Configura las variables de entorno (copiar y editar `.env.example`):
```
cp .env.example .env
# Edita .env con tus credenciales de Turso
```

4. Ejecuta la migración del esquema en Turso:
```
npm run db:migrate
```

5. Inicia el servidor:
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

### Variables de entorno en Vercel

Configura las siguientes variables en tu proyecto de Vercel:

- `TURSO_DATABASE_URL` (o `LIBSQL_URL` / `DATABASE_URL`)
- `TURSO_AUTH_TOKEN` (o `LIBSQL_AUTH_TOKEN` / `DATABASE_AUTH_TOKEN`)

Ejecuta `npm run db:migrate` localmente para crear el esquema, o crea una ejecución en tu pipeline que aplique `src/db/schema.sql` a tu base de datos Turso.

### Notas sobre Turso/libsql

- La conexión se maneja con `@libsql/client` leyendo variables de entorno.
- Los modelos (`src/models/*`) fueron migrados a consultas asíncronas sobre SQLite.
- El archivo `src/db/libsql.js` centraliza la conexión.

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