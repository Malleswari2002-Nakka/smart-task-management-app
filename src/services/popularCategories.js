import connection from "../configuration/dbConfig.js";
export const getTasksByCategory = async () => {
  const [rows] = await connection.query(`
    SELECT category, COUNT(*) AS tasks
    FROM tasks
    GROUP BY category
  `);
  return rows;
};