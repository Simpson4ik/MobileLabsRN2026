const photo = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=60`;

const dishes = [
  {
    title: "Салат з кіноа та овочами",
    category: "Салати",
    image: photo("1546069901-ba9599a7e63c"),
    ingredients: ["Кіноа - 150 г", "Огірок - 1 шт.", "Томати черрі - 10 шт.", "Авокадо - 1 шт.", "Лимонний сік - 2 ст. л."],
  },
  {
    title: "Піца Маргарита",
    category: "Випічка",
    image: photo("1565299624946-b28f40a0ae38"),
    ingredients: ["Борошно - 300 г", "Томатний соус - 100 мл", "Моцарела - 200 г", "Базилік - 1 пучок", "Оливкова олія - 2 ст. л."],
  },
  {
    title: "Панкейки з ягодами",
    category: "Сніданки",
    image: photo("1567620905732-2d1ec7ab7445"),
    ingredients: ["Кефір - 250 мл", "Яйце - 1 шт.", "Борошно - 200 г", "Ягоди - 100 г", "Мед - 2 ст. л."],
  },
  {
    title: "Тост з яйцем-пашот",
    category: "Сніданки",
    image: photo("1482049016688-2d3e1b311543"),
    ingredients: ["Хліб - 2 скибки", "Яйце - 2 шт.", "Авокадо - 1 шт.", "Сіль, перець - за смаком"],
  },
  {
    title: "Боул з нутом",
    category: "Основні страви",
    image: photo("1512621776951-a57141f2eefd"),
    ingredients: ["Нут - 200 г", "Батат - 1 шт.", "Шпинат - 50 г", "Тахіні - 2 ст. л.", "Кунжут - 1 ч. л."],
  },
  {
    title: "Літній салат із зеленню",
    category: "Салати",
    image: photo("1540189549336-e6e99c3679fe"),
    ingredients: ["Салатний мікс - 100 г", "Редис - 5 шт.", "Огірок - 1 шт.", "Гірчиця - 1 ч. л."],
  },
  {
    title: "Шашлички з овочами",
    category: "Основні страви",
    image: photo("1555939594-58d7cb561ad1"),
    ingredients: ["Куряче філе - 500 г", "Йогурт - 150 мл", "Перець болгарський - 2 шт.", "Цибуля - 1 шт.", "Спеції - за смаком"],
  },
  {
    title: "Сніданок-тарілка",
    category: "Сніданки",
    image: photo("1504674900247-0877df9cc836"),
    ingredients: ["Яйце - 2 шт.", "Бекон - 4 скибки", "Томат - 1 шт.", "Тост - 2 шт."],
  },
  {
    title: "Паста з овочами",
    category: "Основні страви",
    image: photo("1473093295043-cdd812d0e601"),
    ingredients: ["Спагеті - 200 г", "Томати - 3 шт.", "Часник - 2 зубчики", "Пармезан - 50 г"],
  },
  {
    title: "Ягідний десерт",
    category: "Десерти",
    image: photo("1476224203421-9ac39bcb3327"),
    ingredients: ["Йогурт - 200 г", "Гранола - 50 г", "Ягоди - 100 г", "Мед - 1 ст. л."],
  },
];

const difficulties = ["Легко", "Середньо", "Складно"];

const steps = [
  "Підготуйте та виміряйте всі інгредієнти.",
  "Вимийте й наріжте овочі, зелень та інші продукти.",
  "Приготуйте основу страви відповідно до рецепта.",
  "Поєднайте всі складники та додайте спеції за смаком.",
  "Подавайте страву одразу після приготування.",
];

export const TOTAL_RECIPES = 120;

const createRecipe = (index) => {
  const dish = dishes[index % dishes.length];
  const id = String(index + 1);
  return {
    id,
    title: `${dish.title} №${id}`,
    category: dish.category,
    image: dish.image,
    time: 10 + ((index * 7) % 80),
    difficulty: difficulties[index % difficulties.length],
    servings: 1 + (index % 4),
    description: `Покроковий рецепт страви «${dish.title}» з категорії «${dish.category}».`,
    ingredients: dish.ingredients,
    steps,
  };
};

export const recipes = Array.from({ length: TOTAL_RECIPES }, (_, index) => createRecipe(index));

export const getRecipeById = (id) => recipes.find((recipe) => recipe.id === id);

export const fetchRecipes = (page, pageSize) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const start = page * pageSize;
      resolve(recipes.slice(start, start + pageSize));
    }, 600);
  });
