// import taskServices from "../services/tasks.js";
// import { logAction } from "../utils/logAction.js";
// export default async function taskController(req, res) {
//   try {
//     const user=req.user;
//     const result = await taskServices(req.body);
//     console.log("Created task:", result);

//     res.status(201).json({
//       message: "task created successfully",
//       task: result
//     });
//     await logAction({
//       action: "Create Task",
//       performedBy: user?.email || "Unknown User",
//       targetUser: user?.email || "Unknown User",
//       description: `Task "${result.name}" created by ${user?.email || "Unknown User"}`,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     console.error("adding task error:", error.message);
//     res.status(400).json({ message: error.message });
//   }
// }
import taskServices from "../services/tasks.js";
import { logAction } from "../utils/logAction.js";

export default async function taskController(req, res) {
  try {
    
    const result = await taskServices(req.body);

    res.status(201).json({
      message: "Task created successfully",
      task: result,
    });

    await logAction({
      action: "CREATE_TASK",
      performedBy: req.user.email || "Unknown User",
      targetUser: req.user.email || "Unknown User",
      description: `Task "${result.name}" created by ${performedBy}`,
    });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(400).json({ message: error.message });
  }
}
