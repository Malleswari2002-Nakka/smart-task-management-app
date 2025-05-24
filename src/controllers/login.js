// import { authService,refreshToken } from "../services/login.js";
// import { logAction } from "../utils/logAction.js";

// export async function login(req, res) {
//   try {
//     console.log("📬 Login request received");
    
//     // 1. Validate input
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Email and password are required" 
//       });
//     }

//     // 2. Authenticate
//     const result = await authService(email, password);
//     await logAction({
//       action: "User Login",
//       performedBy: email,
//       targetUser: email,
//       description: `User ${email} logged in successfully`,
//       timestamp: new Date().toISOString(),
//     });
//     // 3. Respond
//     return res.json({
//       success: true,
//       token: result.token,
//       user: result.user
//     });
//      } catch (error) {
//     console.error("❌ Login error:", error.message);
    
//     const statusCode = error.message.includes("Invalid") ? 401 : 500;
//     return res.status(statusCode).json({
//       success: false,
//       message: error.message || "Authentication failed"
//     });
//   }
// }

// export async function newToken(req, res) {
//   try {
    
//     // 1. Validate input
//     const { token } = req.body;

//     // 2. Authenticate
//     const newAcessToken = await refreshToken (token);
    
//     // 3. Respond
//      return res.json({accessToken:newAcessToken});
//      } catch (error) {
//        res.status(401).json({message:"Invalid token"});
//     };
  
// }

import { authService, refreshToken } from "../services/login.js";
import { logAction } from "../utils/logAction.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const result = await authService(email, password);

    await logAction({
      action: "USER_LOGIN",
      performedBy: email,
      targetUser: email,
      description: `User ${email} logged in.`,
    });

    res.json({
      success: true,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    const statusCode = error.message.includes("Invalid") ? 401 : 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
}

export async function newToken(req, res) {
  try {
    const { token } = req.body;
    const newAccessToken = await refreshToken(token);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
