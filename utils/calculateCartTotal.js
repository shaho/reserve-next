const calculateCartTotal = (products) => {
  const total = products.reduce((sum, item) => {
    sum += item.product.price * item.quantity;
    return sum;
  }, 0);

  // In order to fix rounding error in JS and handle dollar and cent correctly
  const cartTotal = ((total * 100) / 100).toFixed(2);

  const stripeTotal = Number((total * 100).toFixed(2));

  return { cartTotal, stripeTotal };
};

export default calculateCartTotal;
