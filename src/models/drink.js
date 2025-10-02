// Modelo para las bebidas del restaurante
class Drink {
  constructor(id, name, description, price, imageUrl, type) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.type = type; // Tipo de bebida: refresco, alcohólica, café, etc.
  }
}

// Base de datos simulada para almacenar las bebidas
const drinks = [
  new Drink(
    1, 
    "Limonada Casera", 
    "Refrescante limonada preparada con limones frescos y un toque de menta", 
    3.50, 
    "/images/limonada.jpg",
    "refresco"
  ),
  new Drink(
    2, 
    "Vino Tinto Reserva", 
    "Vino tinto de crianza con notas de frutos rojos y un final elegante", 
    7.99, 
    "/images/vino.jpg",
    "alcohólica"
  ),
  new Drink(
    3, 
    "Café Espresso", 
    "Café intenso de tueste medio con crema perfecta", 
    2.50, 
    "/images/cafe.jpg",
    "caliente"
  ),
  new Drink(
    4, 
    "Agua Mineral", 
    "Agua mineral natural sin gas", 
    1.50, 
    "/images/agua.jpg",
    "refresco"
  ),
  new Drink(
    5, 
    "Smoothie de Frutas", 
    "Batido natural de frutas de temporada con yogurt", 
    4.95, 
    "/images/smoothie.jpg",
    "refresco"
  )
];

// Métodos para interactuar con la "base de datos"
const drinkModel = {
  // Obtener todas las bebidas
  getAll: () => {
    return drinks;
  },
  
  // Obtener una bebida por su ID
  getById: (id) => {
    return drinks.find(drink => drink.id === parseInt(id)) || null;
  },
  
  // Crear una nueva bebida
  create: (drink) => {
    const newId = drinks.length > 0 ? Math.max(...drinks.map(d => d.id)) + 1 : 1;
    const newDrink = new Drink(
      newId,
      drink.name,
      drink.description,
      drink.price,
      drink.imageUrl || '/images/default_drink.jpg',
      drink.type || 'refresco'
    );
    drinks.push(newDrink);
    return newDrink;
  },

  // Obtener bebidas por tipo
  getByType: (type) => {
    return drinks.filter(drink => drink.type.toLowerCase() === type.toLowerCase());
  }
};

module.exports = drinkModel;