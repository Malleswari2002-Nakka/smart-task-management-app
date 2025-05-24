import connection from "../configuration/dbConfig.js";
export async function updateTaskService(taskId, updatedTask) {
  const { name, due_date, category, status } = updatedTask;

  const query = `
    UPDATE tasks
    SET name = ?, due_date = ?, category = ?, status = ?
    WHERE id = ?
  `;

  const [result] = await connection.query(query, [
    name,
    due_date,
    category,
    status,
    taskId,
  ]);

  return result;
}