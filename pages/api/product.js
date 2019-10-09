import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (request, response) => {
  switch (request.method) {
    case "GET":
      await handleGetRequest(request, response);
      break;

    case "DELETE":
      await handleDeleteRequest(request, response);
      break;

    default:
      response.status(405).send(`Method ${request.method} not allowed`);
      break;
  }
};

// ─── HANDLE GET REQUEST ─────────────────────────────────────────────────────────
const handleGetRequest = async (request, response) => {
  try {
    const { _id } = request.query;
    const product = await Product.findById(_id);
    response.status(200).json(product);
  } catch (error) {
    console.error(error.message);
  }
};

// ─── HANDLE DELETE REQUEST ──────────────────────────────────────────────────────
const handleDeleteRequest = async (request, response) => {
  try {
    const { _id } = request.query;
    await Product.findByIdAndDelete(_id);
    response.status(204).json({});
  } catch (error) {
    console.error(error.message);
  }
};
