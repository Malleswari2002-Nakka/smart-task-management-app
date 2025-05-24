import connection from "../configuration/dbConfig.js";

export default async function taskServices(userData) {
  const {name,description,category,dueDate,status}=userData;
  console.log("Received userData:", userData);


  try {

    const [result] = await connection.execute(
      "INSERT INTO tasks (name, description, category,due_date,status) VALUES (?, ?, ?, ?, ?)",
      [name, description,category,dueDate,status]
    );

    console.log("Insert result:", result);

    return {
      id: result.insertId,
      name,
      description,
      category,
      dueDate,
      status
    };
  } catch (err) {
    console.error("DB insert error:", err);
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error("name already exists");
    }
    throw new Error("Database insert failed");
  }
}
