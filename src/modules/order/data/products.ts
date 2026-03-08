export interface Product {
  id: number;
  name: string;
  price: number;
}

// Fixed product catalog — add or modify products here as needed
export const products: Product[] = [
  { id: 2434, name: "Produto A", price: 1000 },
  { id: 2435, name: "Produto B", price: 500 },
  { id: 2436, name: "Produto C", price: 2500 },
];

export function findProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
