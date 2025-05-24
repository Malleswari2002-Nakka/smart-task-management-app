import connection from "../configuration/dbConfig.js";
export async function deleteTaskService(taskId) {
    const query=`DELETE FROM tasks WHERE id=?`;
    const [result]=await connection.query(query,[taskId]);
    return result;
}