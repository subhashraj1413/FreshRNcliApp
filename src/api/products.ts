import { Product } from "@/data/products";

const PRODUCTS_API_URL = "https://dummyjson.com/products";

type RemoteProduct = {
  category: string;
  description: string;
  id: number;
  images?: string[];
  price: number;
  thumbnail?: string;
  title: string;
};

type RemoteProductsResponse = {
  products: RemoteProduct[];
};

const formatPrice = (price: number) => `$${price}`;

const normalizeProduct = (product: RemoteProduct): Product => {
  return {
    category: product.category,
    description: product.description,
    id: String(product.id),
    image: product.thumbnail ?? product.images?.[0],
    name: product.title,
    price: formatPrice(product.price),
    subtitle: product.description,
  };
};

const parseErrorMessage = async (response: Response) => {
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message ?? `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

export const fetchProducts = async (
  query: string,
  signal?: AbortSignal,
): Promise<Product[]> => {
  const trimmedQuery = query.trim();
  const endpoint = trimmedQuery
    ? `${PRODUCTS_API_URL}/search?q=${encodeURIComponent(trimmedQuery)}`
    : `${PRODUCTS_API_URL}?limit=24`;

  const response = await fetch(endpoint, { signal });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const payload = (await response.json()) as RemoteProductsResponse;
  return payload.products.map(normalizeProduct);
};

export const fetchProductById = async (
  productId: string,
  signal?: AbortSignal,
): Promise<Product> => {
  const response = await fetch(`${PRODUCTS_API_URL}/${productId}`, { signal });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const payload = (await response.json()) as RemoteProduct;
  return normalizeProduct(payload);
};
