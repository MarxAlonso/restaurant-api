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
    8.00, 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_E_fsCTMfI6GX9J6k_zgZhx9ov7LQyVugA&s",
    "refresco"
  ),
  new Drink(
    2, 
    "Vino Tinto Reserva", 
    "Vino tinto de crianza con notas de frutos rojos y un final elegante", 
    27.00, 
    "https://licoreriasunidas.pe/cdn/shop/articles/tipos-de-vinos.jpg?v=1693249338",
    "alcohólica"
  ),
  new Drink(
    3, 
    "Café Espresso", 
    "Café intenso de tueste medio con crema perfecta", 
    8.00, 
    "https://www.mokasol.es/wp-content/uploads/2021/07/cafe-expreso-con-espuma-en-forma-de-corazon-800x530.jpg",
    "caliente"
  ),
  new Drink(
    4, 
    "Agua Mineral", 
    "Agua mineral natural sin gas", 
    2.50, 
    "https://www.aguasanmateo.com.pe/sites/g/files/seuoyk161/files/2022-03/abi-home-img-orig-1-032022-2.jpg",
    "refresco"
  ),
  new Drink(
    5, 
    "Smoothie de Fresa", 
    "Batido natural de fresas de temporada con yogurt", 
    11.00, 
    "https://www.deleitas.com/pics_fotosrecetas/6/xmed_full_strawberry-smoothie-800x500.jpg.pagespeed.ic.11xb0ZNAtZ.jpg",
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