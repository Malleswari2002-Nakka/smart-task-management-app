import { getTaskStatusService } from "../services/getTaskStatus.js";
export async function getTaskStatus(req, res) {
  try {
    const result = await getTaskStatusService();
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No task status found" });
    }
    res.status(200).json(result); 
  } catch (error) {
    console.error("Error fetching task status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}