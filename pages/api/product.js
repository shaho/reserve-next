import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (request, response) => {
  try {
    const { _id } = request.query;
    const product = await Product.findById(_id);
    response.status(200).json(product);
    // console.log(product);
  } catch (error) {
    console.error(error.message);
  }
};
