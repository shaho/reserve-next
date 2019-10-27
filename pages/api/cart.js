import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

connectDb();

// Import bult-in function "objectId" from mongoose
const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;

    case "PUT":
      await handlePutRequest(req, res);
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

// ─── GET ────────────────────────────────────────────────────────────────────────
const handleGetRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    // Verify token
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    );

    // Populate Cart with selected products for current user based on its user ID
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product",
    });
    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
};

// ─── PUT ────────────────────────────────────────────────────────────────────────
const handlePutRequest = async (req, res) => {
  const { quantity, productId } = req.body;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    // Verify token
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    );

    // Get user cart based on the userId
    const cart = await Cart.findOne({ user: userId });

    // Check if product already exists in cart
    const productExists = cart.products.some((doc) => {
      return ObjectId(productId).equals(doc.product);
    });

    // if so, increment quantity (by number provided to request)
    if (productExists) {
      await Cart.findOneAndUpdate(
        {
          "_id": cart._id,
          "products.product": productId,
        },
        {
          $inc: {
            "products.$.quantity": quantity,
          },
        },
      );

      // if not, add new product with given quantity
    } else {
      const newProduct = { quantity, product: productId };
      await Cart.findOneAndUpdate(
        { _id: cart._id },
        {
          $addToSet: {
            products: newProduct,
          },
        },
      );
    }

    res.status(200).send("Cart updated");
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
};
