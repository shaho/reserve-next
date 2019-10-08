import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (request, response) => {
  try {
    const products = await Product.find();
    response.status(200).json(products);
  } catch (error) {
    console.log(error.message);
  }
};
