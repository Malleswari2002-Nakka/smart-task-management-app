import connection from "../configuration/dbConfig.js";


export default async function Admin(){
    const query=`CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    performed_by VARCHAR(255) NOT NULL,
    target_user VARCHAR(255),
    description TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;
    try {
    await connection.execute(query);
    console.log("'Auditlogs' table created or already exists.");
  } catch (err) {
    console.error("Error creating 'Auditlogs' table:", err);
  }

}