import { Product, ProductBadge } from '../model/types/productSchema';

const descriptions = [
  'Лосось, рис, лава соус, огурец, зеленый лук',
  'Запечённый лосось, сыр Филадельфия, жареный лук',
  'Угорь, огурец, сыр Филадельфия, соус лава',
  'Курица, огурец, соус лава, унаги соус, кунжут',
  'Лосось, сыр Филадельфия, огурец, нори',
  'Угорь, сыр Филадельфия, огурец, унаги соус',
  'Креветка, сыр Филадельфия, авокадо, огурец',
  'Свежий лосось, сыр Филадельфия, огурец, кунжут',
  'Краб, авокадо, огурец, икра тобико, кунжут',
  'Угорь, огурец, авокадо, унаги соус, кунжут',
  'Лосось, огурец, авокадо, икра тобико',
  'Лосось, огурец, авокадо, икра тобико, кунжут',
  'Лосось, огурец, авокадо в темпуре, соус спайси',
  'Креветка, огурец, авокадо в хрустящей панировке',
  'Угорь, огурец, авокадо в темпуре, унаги соус',
  'Свежий лосось, рис, нори, васаби',
  'Угорь, рис, нори, унаги соус, кунжут',
  'Свежий тунец, рис, нори, васаби',
  'Креветка, рис, нори, спайси соус, кунжут',
  'Угорь, рис, нори, унаги соус',
  'Лосось, огурец, авокадо, спайси соус',
  'Креветка, сыр Филадельфия, огурец, кунжут',
  'Угорь, огурец, авокадо, икра тобико',
  'Лосось, огурец, авокадо, унаги соус',
  'Краб, авокадо, огурец, спайси соус',
  'Тунец, огурец, авокадо, кунжут',
  'Лосось, огурец, авокадо, васаби',
  'Креветка, огурец, авокадо, спайси соус',
  'Угорь, огурец, авокадо, кунжут',
  'Лосось, огурец, авокадо, икра тобико',
  'Краб, огурец, авокадо, унаги соус',
  'Тунец, огурец, авокадо, спайси соус',
  'Лосось, огурец, авокадо, кунжут',
  'Креветка, огурец, авокадо, икра тобико',
  'Угорь, огурец, авокадо, васаби',
  'Лосось, огурец, авокадо, спайси соус',
  'Краб, огурец, авокадо, кунжут',
  'Тунец, огурец, авокадо, унаги соус',
  'Лосось, огурец, авокадо, икра тобико',
  'Креветка, огурец, авокадо, спайси соус',
  'Угорь, огурец, авокадо, кунжут',
  'Лосось, огурец, авокадо, васаби',
  'Краб, огурец, авокадо, икра тобико',
  'Тунец, огурец, авокадо, спайси соус',
  'Лосось, огурец, авокадо, унаги соус',
  'Креветка, огурец, авокадо, кунжут',
  'Угорь, огурец, авокадо, икра тобико',
  'Лосось, огурец, авокадо, спайси соус',
];

const productNames = [
  'Поцелуй Гейши',
  'Филадельфия запечённая',
  'Канада запечённая',
  'Аляска запечённая с курицей',
  'Филадельфия классическая',
  'Филадельфия с угрем',
  'Филадельфия с креветкой',
  'Филадельфия с лососем',
  'Калифорния',
  'Дракон',
  'Аляска',
  'Бостон',
  'Темпура ролл',
  'Криспи ролл',
  'Темпура с угрем',
  'Суши с лососем',
  'Гункан с угрем',
  'Суши с тунцом',
  'Гункан с креветкой',
  'Суши с угрем',
  'Филадельфия делюкс',
  'Ролл с крабом',
  'Суши с креветкой',
  'Гункан с лососем',
  'Ролл с тунцом',
  'Суши с угрем запечённые',
  'Филадельфия с авокадо',
  'Калифорния с угрем',
  'Дракон запечённый',
  'Аляска с креветкой',
  'Филадельфия с тунцом',
  'Ролл с лососем',
  'Суши с крабом',
  'Гункан с тунцом',
  'Калифорния с креветкой',
  'Дракон с лососем',
  'Аляска с угрем',
  'Темпура с креветкой',
  'Криспи с лососем',
  'Филадельфия с крабом',
  'Ролл с угрем',
  'Суши с авокадо',
  'Гункан с крабом',
  'Калифорния с тунцом',
  'Дракон с креветкой',
  'Аляска с крабом',
  'Темпура с лососем',
  'Криспи с угрем',
  'Филадельфия с авокадо',
  'Ролл с креветкой',
  'Суши с тунцом запечённые',
  'Гункан с авокадо',
  'Калифорния с лососем',
  'Дракон с тунцом',
  'Аляска с авокадо',
  'Темпура с крабом',
  'Криспи с креветкой',
  'Филадельфия с огурцом',
  'Ролл с авокадо',
  'Суши с огурцом',
  'Гункан с огурцом',
  'Калифорния с авокадо',
  'Дракон с огурцом',
  'Аляска с огурцом',
  'Темпура с авокадо',
  'Криспи с огурцом',
  'Филадельфия с кунжутом',
  'Ролл с кунжутом',
  'Суши с кунжутом',
  'Гункан с кунжутом',
  'Калифорния с кунжутом',
  'Дракон с кунжутом',
  'Аляска с кунжутом',
  'Темпура с кунжутом',
  'Криспи с кунжутом',
  'Филадельфия с икрой',
  'Ролл с икрой',
  'Суши с икрой',
  'Гункан с икрой',
  'Калифорния с икрой',
  'Дракон с икрой',
  'Аляска с икрой',
  'Темпура с икрой',
  'Криспи с икрой',
  'Филадельфия со спайси',
  'Ролл со спайси',
  'Суши со спайси',
  'Гункан со спайси',
  'Калифорния со спайси',
  'Дракон со спайси',
  'Аляска со спайси',
  'Темпура со спайси',
  'Криспи со спайси',
  'Филадельфия с унаги',
  'Ролл с унаги',
  'Суши с унаги',
  'Гункан с унаги',
  'Калифорния с унаги',
  'Дракон с унаги',
  'Аляска с унаги',
  'Темпура с унаги',
  'Криспи с унаги',
];

const prices = [
  150, 170, 180, 190, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700,
  750, 800, 850, 900, 950, 980, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350,
  1400, 1450, 1500,
];

const categories = [
  'baked-rolls',
  'philadelphia',
  'cold-rolls',
  'fried-rolls',
  'sushi-gunkans',
];

const badges = [
  { type: 'NEW' as const },
  { type: 'HIT' as const },
  { type: 'TOP' as const },
];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomBadges = () => {
  const numBadges = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...badges].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numBadges);
};

const getCategoryLabel = (category: string, t: (key: string) => string) => {
  const categoryMap: Record<string, string> = {
    'baked-rolls': t('navigation.bakedRolls'),
    philadelphia: t('navigation.philadelphia'),
    'cold-rolls': t('navigation.coldRolls'),
    'fried-rolls': t('navigation.friedRolls'),
    'sushi-gunkans': t('navigation.sushiGunkans'),
  };
  return categoryMap[category] || category;
};

const getTranslatedBadges = (
  badges: ProductBadge[],
  _t: (key: string) => string,
): ProductBadge[] => {
  return badges.map((badge) => ({
    ...badge,
  }));
};

const availableImages = [
  '10d3f6d94e70edfbc666a07e987907dc.jpg',
  '35168-ed4_small.jpg',
  '4cd7f9b1c2919df3fde31706082cae9d.jpg',
  '70cb6264f8127bcfcb7b2174cc43a187.jpg',
  'a1d72825c1a57780653268f2171c4695.jpg',
  'biznes-plan-sushi-bara.jpg',
  'd58d9219b83798cfe8bd8b2080adec70.jpg',
  'ec8c0bb9d64bfbb592226d6ffdb09ed70c7deb3547e6718fa624835fc7e31d5e.jpg',
  'set4-300x200.jpg',
  'sushi-study-demian-willette-450x266.jpg',
];

const getRandomImage = () => {
  const imageName =
    Math.random() < 0.7 ? getRandomElement(availableImages) : '';
  return imageName ? `/test-task-foodstore/images/${imageName}` : '';
};

const generatedProducts = Array.from({ length: 100 }, (_, index) => {
  const groupIndex = Math.floor(index / 10);
  const name = productNames[groupIndex];
  const description = descriptions[groupIndex % descriptions.length];

  return {
    id: `${index + 1}`,
    name: name,
    description: description,
    price: getRandomElement(prices),
    image: getRandomImage(),
    badges: getRandomBadges(),
    category: getRandomElement(categories),
  };
});

const shuffledProducts = generatedProducts.sort(() => Math.random() - 0.5);

const getTranslatedProductName = (
  product: Product,
  t: (key: string) => string,
) => {
  const groupIndex = (parseInt(product.id) - 1) % 10;
  return t(`productNames.${groupIndex}`) || product.name;
};

const getTranslatedProductDescription = (
  product: Product,
  t: (key: string) => string,
) => {
  const groupIndex = (parseInt(product.id) - 1) % 10;
  return t(`productDescriptions.${groupIndex}`) || product.description;
};

export const createProducts = (t: (key: string) => string): Product[] => {
  return shuffledProducts.map((product) => ({
    ...product,
    name: getTranslatedProductName(product, t),
    description: getTranslatedProductDescription(product, t),
    category: getCategoryLabel(product.category, t),
    badges: getTranslatedBadges(product.badges, t),
  }));
};

export const products: Product[] = shuffledProducts;
