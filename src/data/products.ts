export type Product = {
  category: string;
  id: string;
  name: string;
  price: string;
  subtitle: string;
};

export const products: Product[] = [
  {
    category: "Featured",
    id: "1",
    name: "Canvas Weekender",
    price: "$128",
    subtitle: "Light carry-all bag with leather trim.",
  },
  {
    category: "Featured",
    id: "2",
    name: "Stone Bottle",
    price: "$36",
    subtitle: "Double-wall insulated bottle for daily use.",
  },
  {
    category: "New",
    id: "3",
    name: "Soft Knit Tee",
    price: "$42",
    subtitle: "Relaxed fit essential in washed cotton.",
  },
  {
    category: "New",
    id: "4",
    name: "Desk Lamp Mini",
    price: "$64",
    subtitle: "Compact metal lamp for work and side tables.",
  },
  {
    category: "Popular",
    id: "5",
    name: "Travel Pouch Set",
    price: "$52",
    subtitle: "Three-piece organizers for cables and small gear.",
  },
  {
    category: "Popular",
    id: "6",
    name: "Ceramic Mug",
    price: "$24",
    subtitle: "Matte glaze mug with a wide comfortable handle.",
  },
];
