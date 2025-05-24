import connection from "../configuration/dbConfig.js";

export default async function User() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;


  try {
    await connection.execute(query);
    console.log("'users' table created or already exists.");
  } catch (err) {
    console.error("Error creating 'users' table:", err);
  }
}