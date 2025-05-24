// import bcrypt from "bcrypt";
// import connection from "../configuration/dbConfig.js";

// export default async function userServices(userData) {
//   const { name, email, password } = userData;

//   try {
//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const [result] = await connection.execute(
//       "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
//       [name, email, hashedPassword]
//     );

//     return {
//       id: result.insertId,
//       name,
//       email
//     };
//   } catch (err) {
//     if (err.code === "ER_DUP_ENTRY") {
//       throw new Error("Email already exists");
//     }
//     throw new Error("Database insert failed");
//   }
// }
// services/signup.js
import bcrypt from "bcrypt";
import connection from "../configuration/dbConfig.js";

export default async function userServices(userData) {
  const {name,email,password}=userData;
  console.log("Received userData:", userData);

  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    console.log("Insert result:", result);

    return {
      id: result.insertId,
      name,
      email
    };
  } catch (err) {
    console.error("DB insert error:", err);
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error("Email already exists");
    }
    throw new Error("Database insert failed");
  }
}
