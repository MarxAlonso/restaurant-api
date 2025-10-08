// Modelo para las promociones del restaurante
class Promotion {
  constructor(id, name, description, price, imageUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}

// Base de datos simulada para almacenar las promociones
const promotions = [
  new Promotion(
    1,
    "Pollo a la Brasa Familiar",
    "Un pollo entero a la brasa acompañado con papas fritas doradas y una refrescante Inca Kola de 1.5L.",
    69.00,
    "https://www.donbelisario.com.pe/media/catalog/product/c/b/cbo-pollero.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg"
  ),
  new Promotion(
    2,
    "Parrillada de Pareja",
    "Deliciosa parrillada para dos personas con cortes seleccionados y dos copas de vino tinto. Ideal para celebrar una fecha especial.",
    95.00,
    "https://cdn.cuponidad.pe/images/Deals/parrilla-6.jpg"
  ),
  new Promotion(
    3,
    "Trío Marino",
    "Disfruta de los mejores sabores del mar: arroz con mariscos, ceviche fresco y una sabrosa leche de tigre.",
    45.00,
    "https://comidasperuanas.com.pe/wp-content/uploads/2023/07/trio_marino_peruano.jpg"
  )
];

// Métodos para interactuar con la "base de datos"
const promotionModel = {
  // Obtener todas las promociones
  getAll: () => {
    return promotions;
  },

  // Obtener una promoción por su ID
  getById: (id) => {
    return promotions.find(promo => promo.id === parseInt(id)) || null;
  },

  // Crear una nueva promoción
  create: (promotion) => {
    const newId = promotions.length > 0 ? Math.max(...promotions.map(p => p.id)) + 1 : 1;
    const newPromotion = new Promotion(
      newId,
      promotion.name,
      promotion.description,
      promotion.price,
      promotion.imageUrl || '/images/default_promotion.jpg'
    );
    promotions.push(newPromotion);
    return newPromotion;
  }
};

module.exports = promotionModel;
