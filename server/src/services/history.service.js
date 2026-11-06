import mongoose from "mongoose";
import History from "../models/History.model.js";

export const createHistoryEntry = async (data) => {
  return await History.create(data);
};

export const getUserHistory = async (userId, page = 1, limit = 10) => {
  let parsedPage = parseInt(page, 10);
  let parsedLimit = parseInt(limit, 10);

  if (isNaN(parsedPage) || parsedPage < 1) {
    parsedPage = 1;
  }
  if (isNaN(parsedLimit) || parsedLimit < 1) {
    parsedLimit = 10;
  } else if (parsedLimit > 50) {
    parsedLimit = 50;
  }

  const skip = (parsedPage - 1) * parsedLimit;

  const [entries, totalEntries] = await Promise.all([
    History.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(parsedLimit).lean(),
    History.countDocuments({ userId }),
  ]);

  const totalPages = Math.ceil(totalEntries / parsedLimit);

  return {
    entries,
    totalEntries,
    totalPages,
    currentPage: parsedPage,
  };
};

export const getHistoryEntry = async (userId, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid history ID");
    error.statusCode = 400;
    throw error;
  }

  const entry = await History.findOne({ _id: id, userId });
  if (!entry) {
    const error = new Error("History entry not found");
    error.statusCode = 404;
    throw error;
  }

  return entry;
};

export const deleteHistoryEntry = async (userId, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid history ID");
    error.statusCode = 400;
    throw error;
  }

  const entry = await History.findOneAndDelete({ _id: id, userId });
  if (!entry) {
    const error = new Error("History entry not found");
    error.statusCode = 404;
    throw error;
  }

  return { message: "Deleted" };
};

export const clearUserHistory = async (userId) => {
  const result = await History.deleteMany({ userId });
  return { deletedCount: result.deletedCount };
};
