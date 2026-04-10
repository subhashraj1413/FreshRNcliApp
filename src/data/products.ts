export type Product = {
  category: string;
  description?: string;
  id: string;
  image?: string;
  name: string;
  price: string;
  subtitle: string;
};

export const products: Product[] = [
  {
    category: "Featured",
    description: "Light carry-all bag with leather trim.",
    id: "1",
    image: undefined,
    name: "Canvas Weekender",
    price: "$128",
    subtitle: "Light carry-all bag with leather trim.",
  },
  {
    category: "Featured",
    description: "Double-wall insulated bottle for daily use.",
    id: "2",
    image: undefined,
    name: "Stone Bottle",
    price: "$36",
    subtitle: "Double-wall insulated bottle for daily use.",
  },
  {
    category: "New",
    description: "Relaxed fit essential in washed cotton.",
    id: "3",
    image: undefined,
    name: "Soft Knit Tee",
    price: "$42",
    subtitle: "Relaxed fit essential in washed cotton.",
  },
  {
    category: "New",
    description: "Compact metal lamp for work and side tables.",
    id: "4",
    image: undefined,
    name: "Desk Lamp Mini",
    price: "$64",
    subtitle: "Compact metal lamp for work and side tables.",
  },
  {
    category: "Popular",
    description: "Three-piece organizers for cables and small gear.",
    id: "5",
    image: undefined,
    name: "Travel Pouch Set",
    price: "$52",
    subtitle: "Three-piece organizers for cables and small gear.",
  },
  {
    category: "Popular",
    description: "Matte glaze mug with a wide comfortable handle.",
    id: "6",
    image: undefined,
    name: "Ceramic Mug",
    price: "$24",
    subtitle: "Matte glaze mug with a wide comfortable handle.",
  },
];
