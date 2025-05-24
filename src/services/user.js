import User from "../models/user.js";
import connection from "../configuration/dbConfig.js";
export async function userService(){
  const [users] = await connection.query("SELECT * FROM users");
  return users;
}