import { deleteUserService } from "../services/deleteUsers.js";

export async function deleteUserController(req, res) {
  const userId = req.params.id;

  try {
    const result = await deleteUserService(userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}