import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
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
