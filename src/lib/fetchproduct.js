export const fetchProducts = async () => {
  const response = await fetch('http://fakestoresapi.com/api/v1/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
};
