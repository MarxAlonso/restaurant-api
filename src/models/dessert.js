// Modelo para los postres del restaurante

class Dessert {
  constructor(id, name, description, price, imageUrl, calories) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl || '/images/default_dessert.jpg';
    this.calories = calories || 0;
  }
}

// Base de datos simulada de postres
const desserts = [
  new Dessert(
    1,
    'Tarta de Chocolate',
    'Deliciosa tarta de chocolate con ganache y frutos rojos',
    5.50,
    'https://lafavorita.com.ec/wp-content/uploads/2024/05/torta-chocolate.jpg',
    350
  ),
  new Dessert(
    2,
    'Tiramisú',
    'Auténtico tiramisú italiano con café y mascarpone',
    6.50,
    'https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/7f45d6f8807ebc775928651a3398dce9.png',
    300
  ),
  new Dessert(
    3,
    'Helado de Vainilla',
    'Cremoso helado de vainilla con sirope de chocolate',
    3.50,
    'https://www.gourmet.cl/wp-content/uploads/2016/09/Helado_Vainilla-web-553x458.jpg',
    250
  ),
  new Dessert(
    4,
    'Flan de Caramelo',
    'Tradicional flan casero con caramelo líquido',
    4.50,
    'https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/JFWIJRN6I5CTTEBGHQ5RBESHXY.jpg',
    280
  ),
  new Dessert(
    5,
    'Crema Catalana',
    'Crema catalana con azúcar caramelizado',
    5.50,
    'https://www.eladerezo.com/wp-content/uploads/2015/04/receta-de-crema-catalana-1200x673.jpg',
    320
  )
];

// Métodos para interactuar con los datos
const dessertModel = {
  getAll: () => {
    return desserts;
  },
  
  getById: (id) => {
    return desserts.find(dessert => dessert.id === parseInt(id));
  },
  
  create: (dessertData) => {
    const newId = desserts.length > 0 ? Math.max(...desserts.map(d => d.id)) + 1 : 1;
    const newDessert = new Dessert(
      newId,
      dessertData.name,
      dessertData.description,
      dessertData.price,
      dessertData.imageUrl,
      dessertData.calories
    );
    
    desserts.push(newDessert);
    return newDessert;
  },
  
  getLowCalorie: () => {
    return desserts.filter(dessert => dessert.calories < 300);
  }
};

module.exports = {
  Dessert,
  dessertModel
};