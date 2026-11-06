import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { verifyGoogleToken } from "../config/google.config.js";

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

export const emailLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  user.lastLogin = new Date();
  await user.save();

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

export const googleLogin = async (credential) => {
  const { googleId, email, name, picture } = await verifyGoogleToken(credential);

  let user = await User.findOne({ googleId });

  if (user) {
    user.lastLogin = new Date();
    if (picture && !user.picture) {
      user.picture = picture;
    }
    await user.save();
  } else {
    user = await User.findOne({ email });
    if (user) {
      // Link existing account with Google ID
      user.googleId = googleId;
      if (picture && !user.picture) {
        user.picture = picture;
      }
      user.lastLogin = new Date();
      await user.save();
    } else {
      try {
        user = await User.create({
          googleId,
          email,
          name,
          picture: picture || "",
          lastLogin: new Date(),
        });
      } catch (err) {
        // Handle race condition on duplicate key (E11000)
        if (err.code === 11000) {
          user = await User.findOne({
            $or: [{ googleId }, { email }],
          });
          if (user) {
            if (!user.googleId) user.googleId = googleId;
            if (picture && !user.picture) user.picture = picture;
            user.lastLogin = new Date();
            await user.save();
          } else {
            throw err;
          }
        } else {
          throw err;
        }
      }
    }
  }

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

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-__v -googleId");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
  };
};
