
import connection from "../configuration/dbConfig.js";

export async function getTasksDueToday() {
  const query = `
    SELECT id, name AS Title FROM tasks
    WHERE DATE(due_date) = CURDATE()
  `;
  const [rows] = await connection.query(query);
  return rows;
}
