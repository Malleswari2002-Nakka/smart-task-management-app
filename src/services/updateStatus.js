import connection from "../configuration/dbConfig.js";

export async function updateStatusService(taskId, updatedTask) {

  const fields = [];
  const values = [];

  if (updatedTask.name !== undefined) {
    fields.push("name = ?");
    values.push(updatedTask.name);
  }
  if (updatedTask.due_date !== undefined) {
    fields.push("due_date = ?");
    values.push(updatedTask.due_date);
  }
  if (updatedTask.category !== undefined) {
    fields.push("category = ?");
    values.push(updatedTask.category);
  }
  if (updatedTask.status !== undefined) {
    fields.push("status = ?");
    values.push(updatedTask.status);
  }

  // Prevent empty update
  if (fields.length === 0) {
    throw new Error("No valid fields provided for update.");
  }

  values.push(taskId); 

  const query = `
    UPDATE tasks
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

  const [result] = await connection.query(query, values);
  return result;
}
