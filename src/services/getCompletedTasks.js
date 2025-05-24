import connection from "../configuration/dbConfig.js";
export const getCompletedTasks = async () => {
  try {
    
    const query = `
      SELECT 
      DATE(due_date) AS date, 
      COUNT(*) AS dueCount
     FROM tasks
     WHERE due_date BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
     GROUP BY DATE(due_date)
     ORDER BY date ASC
    `;
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};