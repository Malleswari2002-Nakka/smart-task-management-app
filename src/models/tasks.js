import connection from "../configuration/dbConfig.js";

export default async function Task() {
  const query1 = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,            
      description TEXT NOT NULL,              
      category ENUM('ui', 'backend', 'testing','bug'),                 
      due_date DATE,                          
      status ENUM('pending', 'in_progress', 'completed') ,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await connection.execute(query1);
    console.log("'tasks' table created or already exists.");
  } catch (err) {
    console.error("Error creating 'tasks' table:", err);
  }
}
