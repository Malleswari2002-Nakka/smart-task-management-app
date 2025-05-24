import connection from "../configuration/dbConfig.js";

export const getUpcomingTasks = async () => {
//   return new Promise((resolve, reject) => {
//     const today = new Date().toISOString().slice(0, 10);
//     const query = "SELECT Title, due_date FROM tasks WHERE due_date > ? ORDER BY due_date ASC";

//     db.query(query, [today], (err, results) => {
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
  const today = new Date().toISOString().split("T")[0];
  const [rows] = await connection.query(
    "SELECT name AS Title, due_date FROM tasks WHERE due_date > ? ORDER BY due_date ASC",
    [today]
  );
  return rows;
};
