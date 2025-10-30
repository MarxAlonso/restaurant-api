-- Esquema base para la API de restaurante usando SQLite (Turso/libsql)

CREATE TABLE IF NOT EXISTS dishes (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  imageUrl TEXT
);

CREATE TABLE IF NOT EXISTS drinks (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  imageUrl TEXT,
  type TEXT
);

CREATE TABLE IF NOT EXISTS desserts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  imageUrl TEXT,
  calories INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS promotions (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  imageUrl TEXT
);

-- Esquema para la tabla de reservas
CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY,
  reservationType TEXT NOT NULL, -- 'Mesa' o 'Evento'
  fullName TEXT NOT NULL,
  numPeople INTEGER NOT NULL,
  reservationDate TEXT NOT NULL, -- Formato YYYY-MM-DD
  reservationTime TEXT NOT NULL, -- Formato HH:MM
  eventDetails TEXT, -- Detalles del evento, opcional
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_reservations_date_time ON reservations (reservationDate, reservationTime);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations (reservationDate);