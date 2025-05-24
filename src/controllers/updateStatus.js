// import { updateStatusService } from "../services/updateStatus.js";
// import { logAction } from "../utils/logAction.js";
// export async function updateTaskStatus(req, res) {
//   const taskId = req.params.id;
//   const { status } = req.body;  
//   const user=req.user;

//   if (!status) {
//     return res.status(400).json({ message: "Status is required" });
//   }

//   try {
//     const result = await updateStatusService(taskId, { status });

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     await logAction({
//       action: "Update Task Status",
//       performedBy: user?.email || "Unknown User",
//       targetUser: user?.email || "Unknown User",
//       description: `Task ID ${taskId} status updated to '${status}' by ${user?.email || "Unknown User"}`,
//       timestamp: new Date().toISOString(),
//     });
//     res.status(200).json({ message: "Task status updated successfully", task: { id: parseInt(taskId), status } });
//   } catch (error) {
//     console.error("Error updating task status:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
import { updateStatusService } from "../services/updateStatus.js";
import { logAction } from "../utils/logAction.js";

export async function updateTaskStatus(req, res) {
  const taskId = req.params.id;
  const { status } = req.body;
  

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const result = await updateStatusService(taskId, { status });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    await logAction({
      action: "UPDATE_TASK_STATUS",
      performedBy: req.user.email || "Unknown User",
      targetUser: req.user.email || "Unknown User",
      description: `Task ID ${taskId} status updated to '${status}' by ${performedBy}`,
    });

    res.status(200).json({ message: "Task status updated", task: { id: parseInt(taskId), status } });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
