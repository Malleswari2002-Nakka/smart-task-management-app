import connection from "../configuration/dbConfig.js";

export async function logAction({ action, performedBy, targetUser, description }) {
  try {
    const sql = "INSERT INTO audit_logs (action, performed_by, target_user, description, timestamp) VALUES (?, ?, ?, ?, NOW())";
    await connection.execute(sql, [action, performedBy, targetUser, description]);
    console.log(`[AuditLog] Logged action: ${action} by ${performedBy}`);
  } catch (error) {
    console.error('[AuditLog] Failed to log action:', error);
  }
}
// export async function logAction({ action, performedBy, targetId, description, timestamp }) {
//   try {
//     const sql = `
//       INSERT INTO audit_logs (action, performed_by, target_id, description, timestamp)
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     const values = [
//       action ?? null,
//       performedBy ?? null,
//       targetId ?? null,
//       description ?? null,
//       timestamp ?? null,
//     ];

//     await connection.execute(sql, values);
//     console.log(`[AuditLog] Logged action: ${action} by ${performedBy}`);
//   } catch (error) {
//     console.error("[AuditLog] Failed to log action:", error);
//   }
// }