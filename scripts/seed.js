require('dotenv').config();
const { createClient } = require('@libsql/client');

const getEnv = (keys) => keys.find((k) => process.env[k]) && process.env[keys.find((k) => process.env[k])];
const url = getEnv(['TURSO_DATABASE_URL', 'LIBSQL_URL', 'DATABASE_URL']);
const authToken = getEnv(['TURSO_AUTH_TOKEN', 'LIBSQL_AUTH_TOKEN', 'DATABASE_AUTH_TOKEN']);

if (!url) {
  console.error('ERROR: Falta TURSO_DATABASE_URL/LIBSQL_URL/DATABASE_URL');
  process.exit(1);
}

const client = createClient({ url, authToken });

async function seed() {
  try {
    // Dishes
    const dishes = [
      ["Ceviche Clásico", "Pescado fresco marinado en jugo de limón, acompañado de cebolla morada, camote, cancha y choclo peruano", 15.50, "https://cdn0.recetasgratis.net/es/posts/7/4/1/ceviche_peruano_18147_orig.jpg"],
      ["Lomo Saltado", "Trozos de lomo de res salteados con cebolla, tomate, ají amarillo y papas fritas, acompañado de arroz blanco", 18.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc9y2BAW5HFKTCeFsjKXCNgbbB5OforaSMsg&s"],
      ["Ají de Gallina", "Guiso cremoso de pollo deshilachado con ají amarillo, pan y leche, servido con arroz y papas sancochadas", 13.90, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5wRKNcwCgoGM94gz5DmKo_HWcE-vAgSVHg&s"],
      ["Arroz con Mariscos", "Arroz norteño preparado con una variedad de mariscos, ají panca y culantro, acompañado de salsa criolla", 17.80, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ5LwOHKuxnpckNsTjZS9o4SOo6OBdnTjbmg&s"],
      ["Anticuchos de Corazón", "Brochetas de corazón de res marinadas en ají panca y especias, servidas con papa dorada y salsa de ají", 12.50, "https://imag.bonviveur.com/servimos-los-anticuchos-con-las-patatas.jpg"],
      ["Pollo a la Brasa", "Clásico pollo peruano marinado en especias, cocido al carbón, acompañado de papas fritas y ensalada fresca", 16.50, "https://tofuu.getjusto.com/orioneat-local/resized2/rczGvxnpmc5Qrdyw2-1000-x.webp"],
      ["Parrillas Peruanas", "Variedad de carnes a la parrilla como chorizo, pollo, res y anticuchos, servidos con papas doradas y salsas criollas", 22.00, "https://www.aboutespanol.com/thmb/bS7Z_z5CCAZmf3lYEjmZbuRqyCg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/el-rincon-gaucho--597b93665f9b58928bd96024.png"],
      ["Pachamanca Andina", "Tradicional plato serrano preparado bajo tierra con carnes, papas, habas y camote, sazonado con hierbas andinas", 25.00, "https://www.comida-peruana.com/base/stock/Recipe/pachamanca-a-la-olla/pachamanca-a-la-olla_web.jpg"],
      ["Tallarines Verdes con Bistec", "Pasta al estilo peruano con salsa de albahaca y espinaca, acompañada de un jugoso bistec frito", 14.90, "https://www.infobae.com/resizer/v2/RIRWWA3V2JCMLI3DTMS375RPMU.png?auth=1a057945d7d3e7ddce5007c4a9a005b3ecd4904cb1e0de38d995e614902963c5&smart=true&width=1200&height=1200&quality=85"],
    ];

    for (const d of dishes) {
      await client.execute({ sql: 'INSERT INTO dishes (name, description, price, imageUrl) VALUES (?, ?, ?, ?)', args: d });
    }

    // Drinks
    const drinks = [
      ["Limonada Casera", "Refrescante limonada preparada con limones frescos y un toque de menta", 8.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_E_fsCTMfI6GX9J6k_zgZhx9ov7LQyVugA&s", "refresco"],
      ["Vino Tinto Reserva", "Vino tinto de crianza con notas de frutos rojos y un final elegante", 27.00, "https://licoreriasunidas.pe/cdn/shop/articles/tipos-de-vinos.jpg?v=1693249338", "alcohólica"],
      ["Café Espresso", "Café intenso de tueste medio con crema perfecta", 8.00, "https://www.mokasol.es/wp-content/uploads/2021/07/cafe-expreso-con-espuma-en-forma-de-corazon-800x530.jpg", "caliente"],
      ["Agua Mineral", "Agua mineral natural sin gas", 2.50, "https://www.aguasanmateo.com.pe/sites/g/files/seuoyk161/files/2022-03/abi-home-img-orig-1-032022-2.jpg", "refresco"],
      ["Smoothie de Fresa", "Batido natural de fresas de temporada con yogurt", 11.00, "https://www.deleitas.com/pics_fotosrecetas/6/xmed_full_strawberry-smoothie-800x500.jpg.pagespeed.ic.11xb0ZNAtZ.jpg", "refresco"],
    ];

    for (const r of drinks) {
      await client.execute({ sql: 'INSERT INTO drinks (name, description, price, imageUrl, type) VALUES (?, ?, ?, ?, ?)', args: r });
    }

    // Desserts
    const desserts = [
      ["Tarta de Chocolate", "Deliciosa tarta de chocolate con ganache y frutos rojos", 5.50, "https://lafavorita.com.ec/wp-content/uploads/2024/05/torta-chocolate.jpg", 350],
      ["Tiramisú", "Auténtico tiramisú italiano con café y mascarpone", 6.50, "https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/7f45d6f8807ebc775928651a3398dce9.png", 300],
      ["Helado de Vainilla", "Cremoso helado de vainilla con sirope de chocolate", 3.50, "https://www.gourmet.cl/wp-content/uploads/2016/09/Helado_Vainilla-web-553x458.jpg", 250],
      ["Flan de Caramelo", "Tradicional flan casero con caramelo líquido", 4.50, "https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/JFWIJRN6I5CTTEBGHQ5RBESHXY.jpg", 280],
      ["Crema Catalana", "Crema catalana con azúcar caramelizado", 5.50, "https://www.eladerezo.com/wp-content/uploads/2015/04/receta-de-crema-catalana-1200x673.jpg", 320],
    ];

    for (const ds of desserts) {
      await client.execute({ sql: 'INSERT INTO desserts (name, description, price, imageUrl, calories) VALUES (?, ?, ?, ?, ?)', args: ds });
    }

    // Promotions
    const promotions = [
      ["Pollo a la Brasa Familiar", "Un pollo entero a la brasa acompañado con papas fritas doradas y una refrescante Inca Kola de 1.5L.", 69.00, "https://www.donbelisario.com.pe/media/catalog/product/c/b/cbo-pollero.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg"],
      ["Parrillada de Pareja", "Deliciosa parrillada para dos personas con cortes seleccionados y dos copas de vino tinto. Ideal para celebrar una fecha especial.", 95.00, "https://cdn.cuponidad.pe/images/Deals/parrilla-6.jpg"],
      ["Trío Marino", "Disfruta de los mejores sabores del mar: arroz con mariscos, ceviche fresco y una sabrosa leche de tigre.", 45.00, "https://comidasperuanas.com.pe/wp-content/uploads/2023/07/trio_marino_peruano.jpg"],
    ];

    for (const p of promotions) {
      await client.execute({ sql: 'INSERT INTO promotions (name, description, price, imageUrl) VALUES (?, ?, ?, ?)', args: p });
    }

    console.log('Seed completado.');
    process.exit(0);
  } catch (err) {
    console.error('Error en seed:', err);
    process.exit(1);
  }
}

seed();