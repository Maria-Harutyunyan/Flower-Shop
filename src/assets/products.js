import { v4 as uuidv4 } from "uuid";

const products = [
  {
    id: uuidv4(),
    name: "Rose Elegance Bouquet",
    price: 35,
    category: "roses",
    image:
      "https://i.pinimg.com/736x/2b/a7/a6/2ba7a61c1084a0f4f3f1d65829b0247e.jpg",
    description: "A beautiful bouquet of premium roses for elegant occasions.",
  },
  {
    id: uuidv4(),
    name: "Pink Dream Roses",
    price: 28,
    category: "roses",
    image:
      "https://i.pinimg.com/1200x/5b/10/ba/5b10ba87a6556aef30bdb9532cda1dce.jpg",
    description: "Soft pink roses perfect for romantic moments.",
  },
  {
    id: uuidv4(),
    name: "Spring Tulip Collection",
    price: 25,
    category: "tulips",
    image:
      "https://i.pinimg.com/736x/f2/ff/01/f2ff0141a6a68c665fc8b55ecfa820a2.jpg",
    description: "Fresh tulips bringing spring vibes to your home.",
  },
  {
    id: uuidv4(),
    name: "Lavender Garden Bouquet",
    price: 32,
    category: "lavender",
    image:
      "https://i.pinimg.com/1200x/89/fd/c1/89fdc1ded88211d8895c5f9b524657f5.jpg",
    description: "Relaxing lavender bouquet with a calming scent.",
  },
  {
    id: uuidv4(),
    name: "White Lily Harmony",
    price: 30,
    category: "lilies",
    image:
      "https://i.pinimg.com/736x/8d/9e/d5/8d9ed516551fee3e773ecbda54a6a63b.jpg",
    description: "Elegant white lilies symbolizing purity and peace.",
  },
  {
    id: uuidv4(),
    name: "Romantic Red Roses",
    price: 40,
    category: "roses",
    image:
      "https://i.pinimg.com/1200x/93/67/19/936719c0fb49ee2afa390fbbac27f2d5.jpg",
    description: "Classic red roses for love and passion.",
  },
  {
    id: uuidv4(),
    name: "Sunny Sunflower Basket",
    price: 27,
    category: "sunflowers",
    image:
      "https://i.pinimg.com/736x/3a/3a/ce/3a3acee365ecdf102687f419f3a74cf5.jpg",
    description: "Bright sunflowers to bring joy and positivity.",
  },
  {
    id: uuidv4(),
    name: "Pastel Mixed Bouquet",
    price: 33,
    category: "mixed",
    image:
      "https://i.pinimg.com/736x/da/77/53/da7753af535e46bf5cce748af0a393f7.jpg",
    description: "A mix of pastel flowers for a soft aesthetic.",
  },
  {
    id: uuidv4(),
    name: "Orchid Luxury Arrangement",
    price: 45,
    category: "orchids",
    image:
      "https://i.pinimg.com/736x/13/d7/e0/13d7e074228797d1856f1ee8a22923a4.jpg",
    description: "Premium orchids for a luxury experience.",
  },
  {
    id: uuidv4(),
    name: "Wildflower Garden Mix",
    price: 29,
    category: "wildflowers",
    image:
      "https://i.pinimg.com/736x/32/02/10/320210e66a6f95786f17398dab9e8a2c.jpg",
    description: "A natural mix of wildflowers with rustic charm.",
  },
];

export default products;
