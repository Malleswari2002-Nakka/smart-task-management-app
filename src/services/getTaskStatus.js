// services/taskStatusService.js
import connection from "../configuration/dbConfig.js";

export async function getTaskStatusService() {
  const query = `
    SELECT 
      COUNT(*) AS Totaltasks,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS Completed,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS Pending,
      SUM(CASE WHEN status = 'pending' AND due_date < CURDATE() THEN 1 ELSE 0 END) AS Overdue
    FROM tasks
  `;

  const [rows] = await connection.query(query);
  return rows;
}
