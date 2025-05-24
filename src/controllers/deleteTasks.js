import { deleteTaskService } from "../services/deleteTasks.js";
import { logAction } from "../utils/logAction.js";
export async function deleteTaskController(req, res) {
  const taskId = req.params.id;
  const performedBy = req.user?.email || "Unknown";

  try {
    const result = await deleteTaskService(taskId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    await logAction({
      action: "Delete Task",
      performedBy:req.user.email,
      targetUser: null,
      description: `Task with ID ${taskId} was deleted by ${performedBy}`,
    });

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}
