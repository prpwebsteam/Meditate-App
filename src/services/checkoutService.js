import client from './shopifyClient';

export async function createCheckout() {
  return client.checkout.create();
}

export async function addItem(checkoutId, item) {
  return client.checkout.addLineItems(checkoutId, item);
}

export async function fetchCheckout(checkoutId) {
  return client.checkout.fetch(checkoutId);
}

export async function updateItem(checkoutId, lineItemToUpdate) {
  return client.checkout.updateLineItems(checkoutId, lineItemToUpdate);
}
