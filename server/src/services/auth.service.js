import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.utils.js";

export const register = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already registered.");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  };
};
