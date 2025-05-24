import { getUpcomingTasks } from "../services/getUpcomingTasks.js";
export const getUpcomingTask = async (req, res) => {
  try {
    const tasks = await getUpcomingTasks();
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching upcoming tasks:", err);
    res.status(500).json({ message: "Failed to get upcoming tasks" });
  }
};
