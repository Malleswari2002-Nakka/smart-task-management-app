// import userServices from "../services/signup.js";
// import User from "../models/user.js";
// export default async function signUpController(req, res) {
//     try {
//     const user = await userServices(req.body);

//     console.log("Created user from DB:", user); 

//     res.status(201).json({
//       user:user,
//       message: "User created successfully"
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(400).json({ message: error.message });
//   }
// }
// controllers/signup.js
// import userServices from "../services/signup.js";
// import { logAction } from "../utils/logAction.js";

// export default async function signUpController(req, res) {
  // try {
  //   const result = await userServices(req.body);
  //   console.log("Created user:", result);

  //   res.status(201).json({
  //     message: "User created successfully",
  //     user: result
  //   });

  // } catch (error) {
  //   console.error("Signup error:", error.message);
  //   res.status(400).json({ message: error.message });
  // }
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Name, email and password are required." });
//     }

//     const result = await userServices(req.body);
//     console.log("Created user:", result);

//     // Log the signup action to audit logs
//     // Note: performedBy may be the new user themselves or "self signup"
//     await logAction({
//       action: "CREATE_USER",
//       performedBy: email,        // user signing up
//       targetUser: email,
//       description: `admin added user with email ${email}`,
//     });

//     res.status(201).json({
//       message: "User created successfully",
//       user: result
//     });
//   } catch (error) {
//     console.error("Signup error:", error.message);
//     if (process.env.NODE_ENV === 'development') {
//       console.error(error.stack);
//     }

//     const statusCode = error.name === 'ValidationError' ? 400 : 500;
//     res.status(statusCode).json({ message: error.message });
//   }
// }

import userServices from "../services/signup.js";
import { logAction } from "../utils/logAction.js";

export default async function signUpController(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    const result = await userServices(req.body);
    console.log("Created user:", result);

    await logAction({
      action: "CREATE_USER",
      performedBy: email,
      targetUser: email,
      description: `User with email ${email} created.`,
    });

    res.status(201).json({
      message: "User created successfully",
      user: result,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({ message: error.message });
  }
}
