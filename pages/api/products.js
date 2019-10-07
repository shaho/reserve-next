import products from "../../static/products.json";
import connectDb from "../../utils/connectDb";

connectDb();

export default (request, response) => {
  response.status(200).json(products);
};
