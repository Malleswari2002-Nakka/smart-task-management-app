import { getCompletedTasks } from "../services/getCompletedTasks.js";

export const fetchCompletedTasks = async (req, res) => {
  try {
    const data = await getCompletedTasks();
    res.json(data);
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    res.status(500).json({ message: "Failed to fetch completed tasks" });
  }
};