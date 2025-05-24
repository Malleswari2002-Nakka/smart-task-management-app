import connection from "../configuration/dbConfig.js";
export async function deleteUserService(userId) {
    const query=`DELETE FROM users WHERE id=?`;
    const [result]=await connection.query(query,[userId]);
    return result;
}