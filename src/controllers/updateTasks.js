// import { updateTaskService } from "../services/updateTasks.js"; // Adjust path if needed
// import { logAction } from "../utils/logAction.js";
// export async function updateTask(req, res) {
//   const taskId = req.params.id;
//   const updatedTask = req.body;
//   const user=req.user;

//   try {
//     const result = await updateTaskService(taskId, updatedTask);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     await logAction({
//       action: "Update Task",
//       performedBy: user?.email || "Unknown User",
//       targetUser: user?.email || "Unknown User",
//       description: `Task ID ${taskId} updated by ${user?.email || "Unknown User"}. Changes: ${JSON.stringify(updatedTask)}`,
//       timestamp: new Date().toISOString(),
//     });
//     res.status(200).json({ message: "Task updated successfully", task: { id: parseInt(taskId), ...updatedTask } });
//   } catch (error) {
//     console.error("Error updating task:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
import { updateTaskService } from "../services/updateTasks.js";
import { logAction } from "../utils/logAction.js";

export async function updateTask(req, res) {
  const taskId = req.params.id;
  const updatedTask = req.body;
  

  try {
    const result = await updateTaskService(taskId, updatedTask);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    await logAction({
      action: "UPDATE_TASK",
      performedBy: req.user.email || "Unknown User",
      targetUser: req.user.email || "Unknown User",
      description: `Task ID ${taskId} updated with changes: ${JSON.stringify(updatedTask)} by ${performedBy }`,
    });

    res.status(200).json({ message: "Task updated successfully", task: { id: parseInt(taskId), ...updatedTask } });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
