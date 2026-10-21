export const regularProducts = [
  {
    id: 'strawberry',
    name: 'Strawberry Rush',
    flavor: 'Strawberry',
    description: 'Bright berry sweetness with an icy, feel-good finish.',
    color: '#f15c73',
    accent: '#ffdce1',
    image: null,
    featured: true,
    sizes: [
      { name: 'Small', price: 10 },
      { name: 'Medium', price: 15 },
      { name: 'Large', price: 25 },
    ],
    available: true,
    alcoholic: false,
  },
  {
    id: 'banana',
    name: 'Banana Breeze',
    flavor: 'Banana',
    description: 'Smooth sunny banana flavour, blended into a cool slush.',
    color: '#e7af32',
    accent: '#fff0bc',
    image: null,
    featured: false,
    sizes: [
      { name: 'Small', price: 10 },
      { name: 'Medium', price: 15 },
      { name: 'Large', price: 25 },
    ],
    available: true,
    alcoholic: false,
  },
  {
    id: 'cream-soda',
    name: 'Cream Soda Pop',
    flavor: 'Cream Soda',
    description: 'A nostalgic, fizzy-sweet favourite with a frosty twist.',
    color: '#e98ab2',
    accent: '#ffe0ec',
    image: null,
    featured: true,
    sizes: [
      { name: 'Small', price: 10 },
      { name: 'Medium', price: 15 },
      { name: 'Large', price: 25 },
    ],
    available: true,
    alcoholic: false,
  },
  {
    id: 'orange',
    name: 'Orange Glow',
    flavor: 'Orange',
    description: 'Zesty citrus flavour that brings the sunshine to your sip.',
    color: '#ef8c35',
    accent: '#ffe0bf',
    image: null,
    featured: false,
    sizes: [
      { name: 'Small', price: 10 },
      { name: 'Medium', price: 15 },
      { name: 'Large', price: 25 },
    ],
    available: true,
    alcoholic: false,
  },
  {
    id: 'mango',
    name: 'Mango Moya',
    flavor: 'Mango',
    description: 'A tropical mango-inspired chill with a juicy finish.',
    color: '#eaaa24',
    accent: '#ffedba',
    image: null,
    featured: true,
    sizes: [
      { name: 'Small', price: 10 },
      { name: 'Medium', price: 15 },
      { name: 'Large', price: 25 },
    ],
    available: true,
    alcoholic: false,
  },
];

export const featuredProducts = regularProducts.filter((product) => product.featured);

export const adultConcepts = [
  { id: 'apple-cider', name: 'Apple Cider Chill', note: 'Apple cider-inspired frozen drink concept', color: '#a5c75b' },
  { id: 'berry-cider', name: 'Berry Cider Freeze', note: 'Berry cider-inspired frozen drink concept', color: '#ad5574' },
  { id: 'peach-cider', name: 'Peach Cider Frost', note: 'Peach cider-inspired frozen drink concept', color: '#eb9875' },
  { id: 'lemon-cider', name: 'Lemon Cider Crush', note: 'Lemon cider-inspired frozen drink concept', color: '#e2cb50' },
  { id: 'beer-inspired', name: 'Golden Hour', note: 'Beer-inspired frozen drink concept', color: '#cf9a47' },
  { id: 'lager-inspired', name: 'Lager Lime Frost', note: 'Lager-inspired frozen drink concept', color: '#91a944' },
  { id: 'fruit-beer', name: 'Berry Beer Freeze', note: 'Fruit-flavoured beer slush concept', color: '#bd5a58' },
];

export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(amount);
