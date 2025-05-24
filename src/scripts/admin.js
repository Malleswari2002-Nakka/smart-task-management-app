
import User from "../models/user.js";
import bcrypt from "bcrypt";
import connection from "../configuration/dbConfig.js";

export default async function createAdminAccount(){
    try{
      const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      ["admin@test.com"]
    );

    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash("admin", 10);

      await connection.execute(
        `INSERT INTO users (name, email, password, role)
         VALUES (?, ?, ?, ?)`,
        ["admin", "admin@test.com", hashedPassword, "admin"]
      );

      console.log("Admin account created successfully");
      } else {
      console.log("Admin already exists");
    }

    }catch(error){
      console.error(error.message);
    }
}
