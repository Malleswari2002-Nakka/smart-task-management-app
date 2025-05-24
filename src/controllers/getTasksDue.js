import { getTasksDueToday } from "../services/getTasksDue.js";


export async function getTasksDueTodayController(req, res) {
  try {
    const tasks = await getTasksDueToday();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching today's tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}