import bcrypt from "bcrypt";
import generateToken from "../utils/jwtUtils.js";
import connection from "../configuration/dbConfig.js";
import {verifyToken} from "../utils/authMiddleware.js";
export  async function authService(email,password){
   console.log("AuthService - Input:", { email, password }); 

  try {
     console.log("Attempting login for:", email);

    const [users] = await connection.execute(
      'SELECT id, email, password, role FROM users WHERE email = ? LIMIT 1',
      [email],
      { timeout: 3000 } 
    );

    if (users.length === 0) {
      console.log("User not found");
      throw new Error("Invalid email or password");
    }

    const user = users[0];
    console.log("User found:", user.email);

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      throw new Error("Invalid email or password");
      }

    // 3. Generate token
    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      token,
      user: userWithoutPassword
    };

  }
  catch (error) {
    console.error("AuthService error:", error.message);
    throw error; 
  }

}
export async function refreshToken(oldToken){

  try{
     const decodedToken=verifyToken(oldToken);
   const [user] = await connection.execute(
      'SELECT * FROM users WHERE id = ? LIMIT 1',
      [decodedToken.id],
    );
    if(!user){
      throw new error("User not found");
    }
    const newToken=generateToken(user);
    return newToken;
  }catch(error){
    throw new error("Invalid token");
  }
  
}