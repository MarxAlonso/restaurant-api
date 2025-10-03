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
    "Ceviche Clásico", 
    "Pescado fresco marinado en jugo de limón, acompañado de cebolla morada, camote, cancha y choclo peruano", 
    15.50, 
    "https://cdn0.recetasgratis.net/es/posts/7/4/1/ceviche_peruano_18147_orig.jpg"
  ),
  new Dish(
    2, 
    "Lomo Saltado", 
    "Trozos de lomo de res salteados con cebolla, tomate, ají amarillo y papas fritas, acompañado de arroz blanco", 
    18.00, 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc9y2BAW5HFKTCeFsjKXCNgbbB5OforaSMsg&s"
  ),
  new Dish(
    3, 
    "Ají de Gallina", 
    "Guiso cremoso de pollo deshilachado con ají amarillo, pan y leche, servido con arroz y papas sancochadas", 
    13.90, 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5wRKNcwCgoGM94gz5DmKo_HWcE-vAgSVHg&s"
  ),
  new Dish(
    4, 
    "Arroz con Mariscos", 
    "Arroz norteño preparado con una variedad de mariscos, ají panca y culantro, acompañado de salsa criolla", 
    17.80, 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ5LwOHKuxnpckNsTjZS9o4SOo6OBdnTjbmg&s"
  ),
  new Dish(
    5, 
    "Anticuchos de Corazón", 
    "Brochetas de corazón de res marinadas en ají panca y especias, servidas con papa dorada y salsa de ají", 
    12.50, 
    "https://imag.bonviveur.com/servimos-los-anticuchos-con-las-patatas.jpg"
  ),
  new Dish(
    6, 
    "Pollo a la Brasa", 
    "Clásico pollo peruano marinado en especias, cocido al carbón, acompañado de papas fritas y ensalada fresca", 
    16.50, 
    "https://tofuu.getjusto.com/orioneat-local/resized2/rczGvxnpmc5Qrdyw2-1000-x.webp"
  ),
  new Dish(
    7, 
    "Parrillas Peruanas", 
    "Variedad de carnes a la parrilla como chorizo, pollo, res y anticuchos, servidos con papas doradas y salsas criollas", 
    22.00, 
    "https://www.aboutespanol.com/thmb/bS7Z_z5CCAZmf3lYEjmZbuRqyCg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/el-rincon-gaucho--597b93665f9b58928bd96024.png"
  ),
  new Dish(
    8, 
    "Pachamanca Andina", 
    "Tradicional plato serrano preparado bajo tierra con carnes, papas, habas y camote, sazonado con hierbas andinas", 
    25.00, 
    "https://www.comida-peruana.com/base/stock/Recipe/pachamanca-a-la-olla/pachamanca-a-la-olla_web.jpg"
  ),
  new Dish(
    9, 
    "Tallarines Verdes con Bistec", 
    "Pasta al estilo peruano con salsa de albahaca y espinaca, acompañada de un jugoso bistec frito", 
    14.90, 
    "https://www.infobae.com/resizer/v2/RIRWWA3V2JCMLI3DTMS375RPMU.png?auth=1a057945d7d3e7ddce5007c4a9a005b3ecd4904cb1e0de38d995e614902963c5&smart=true&width=1200&height=1200&quality=85"
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