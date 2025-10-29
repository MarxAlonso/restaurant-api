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