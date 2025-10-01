// Modelo para los platos del restaurante
class Dish {
  constructor(id, name, description, price, imageUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}

// Base de datos simulada para almacenar los platos
const dishes = [
  new Dish(
    1, 
    "Paella Valenciana", 
    "Auténtica paella española con arroz, azafrán, pollo, conejo y verduras", 
    18.99, 
    "/images/paella.jpg"
  ),
  new Dish(
    2, 
    "Pasta Carbonara", 
    "Pasta italiana con salsa cremosa de huevo, queso pecorino, panceta y pimienta negra", 
    14.50, 
    "/images/carbonara.jpg"
  ),
  new Dish(
    3, 
    "Hamburguesa Gourmet", 
    "Hamburguesa de carne Angus con queso cheddar, bacon, cebolla caramelizada y salsa especial", 
    12.99, 
    "/images/hamburguesa.jpg"
  ),
  new Dish(
    4, 
    "Sushi Variado", 
    "Selección de 12 piezas de sushi que incluye maki, nigiri y sashimi", 
    22.50, 
    "/images/sushi.jpg"
  ),
  new Dish(
    5, 
    "Ensalada César", 
    "Lechuga romana, crutones, pollo a la parrilla, queso parmesano y aderezo César", 
    9.95, 
    "/images/ensalada.jpg"
  )
];

// Métodos para interactuar con la "base de datos"
const dishModel = {
  // Obtener todos los platos
  getAll: () => {
    return dishes;
  },
  
  // Obtener un plato por su ID
  getById: (id) => {
    return dishes.find(dish => dish.id === parseInt(id)) || null;
  },
  
  // Crear un nuevo plato
  create: (dish) => {
    const newId = dishes.length > 0 ? Math.max(...dishes.map(d => d.id)) + 1 : 1;
    const newDish = new Dish(
      newId,
      dish.name,
      dish.description,
      dish.price,
      dish.imageUrl
    );
    dishes.push(newDish);
    return newDish;
  }
};

module.exports = dishModel;