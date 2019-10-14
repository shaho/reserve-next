import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: ObjectId,
        ref: "Product",
      },
    },
  ],
});

export default mongoose.models.Card ||
  mongoose.model.Schema("Card", CardSchema);
