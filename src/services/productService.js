import client from './shopifyClient';

export async function fetchAllProducts(pageSize = 20) {
  return client.product.fetchAll(pageSize);
}

export async function fetchSingleProduct(productId) {
  return client.product.fetch(productId);
}
    