import Task from "../models/tasks.js";
import connection from "../configuration/dbConfig.js";
export async function taskService(){
  const [tasks] = await connection.query("SELECT * FROM tasks");
  return tasks;
}