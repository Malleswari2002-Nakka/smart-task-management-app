import { getTasksByCategory } from "../services/popularCategories.js";
export const getTasksByCategories = async (req, res) => {
  try {
    const categories = await getTasksByCategory();
    res.json(categories);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).json({ message: "Failed to fetch task categories." });
  }
};

