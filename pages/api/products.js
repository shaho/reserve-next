import products from "../../static/products.json";

export default (request, response) => {
  response.status(200).json(products);
};
