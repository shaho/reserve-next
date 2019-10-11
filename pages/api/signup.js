import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/User";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(422).send("User missing one or more fileds");
    }

    // Check to see if the user already exists in the db
    const user = await User.findOne({ email });
    if (user) {
      return response
        .status(422)
        .send(`User already exists with email ${email}`);
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();

    // Create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send back token
    response.status(201).json(token);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error Sign up user, Please try again later");
  }
};
