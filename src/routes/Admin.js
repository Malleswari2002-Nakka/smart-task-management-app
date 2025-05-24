import { logAction } from "../utils/logAction.js";
import express from "express";
import cors from "cors";
import { authenticateToken } from "../utils/authMiddleware.js";
import { verifyToken } from "../utils/authMiddleware.js";
import connection from "../configuration/dbConfig.js";
import signUpController from "../controllers/signup.js";
import taskController  from "../controllers/tasks.js";
import { deleteTaskController } from "../controllers/deleteTasks.js";
import { login } from "../controllers/login.js";
import { updateTaskStatus } from "../controllers/updateStatus.js";
import { updateTask } from "../controllers/updateTasks.js";
const auditRouter=express.Router();
auditRouter.use(cors());
auditRouter.delete('/:id',authenticateToken, async (req, res) => {
  try {
    const [result] = await connection.execute('SELECT email FROM users WHERE id = ?', [req.params.id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const targetEmail = result[0].email;
    await connection.execute('DELETE FROM users WHERE id = ?', [req.params.id]);

    await logAction({
      action: 'DELETE_USER',
      performedBy: req.user.email,
      targetUser: targetEmail,
      description: `Admin deleted user ${targetEmail}`,
    });

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});
auditRouter.post("/add",authenticateToken,signUpController);
auditRouter.post("/addtasks",authenticateToken,taskController);
auditRouter.delete("/deletetasks",authenticateToken,deleteTaskController);
auditRouter.post("/login",authenticateToken,login);
auditRouter.put("/updatestatus",authenticateToken,updateTaskStatus);
auditRouter.put("/updatetask",authenticateToken,updateTask);
auditRouter.get('/audit-logs', authenticateToken, async (req, res) => {
  try {
    const [logs] = await connection.execute('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 100');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

export default auditRouter;