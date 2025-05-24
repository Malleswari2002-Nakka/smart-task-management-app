// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header1 from "./Header1";

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface AuditLog {
//   id: number;
//   action: string;
//   performedBy: string;
//   targetUser: string;
//   description: string;
//   timestamp: string;
// }

// const AdminDashboard: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
//   const [loadingUsers, setLoadingUsers] = useState(true);
//   const [loadingLogs, setLoadingLogs] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     const fetchUsers = async () => {
//       setLoadingUsers(true);
//       try {
//         const response = await fetch("http://localhost:5001/api/users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.status === 401 || response.status === 403) {
//           navigate("/login", { replace: true });
//           return;
//         }

//         if (!response.ok) {
//           throw new Error(`Failed to fetch users: ${response.statusText}`);
//         }

//         const result = await response.json();
//         setUsers(result);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError("Failed to load users.");
//       } finally {
//         setLoadingUsers(false);
//       }
//     };

//     const fetchAuditLogs = async () => {
//       setLoadingLogs(true);
//       setError(null);
//       try {
//         const response = await fetch("http://localhost:5001/admin/audit-logs", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.status === 401 || response.status === 403) {
//           setError("Unauthorized access. Please log in again.");
//           navigate("/login", { replace: true });
//           return;
//         }

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(
//             `Error fetching audit logs: ${response.status} ${response.statusText} - ${errorText}`
//           );
//         }

//         const logs = await response.json();

//         // Sort logs descending by timestamp, newest first
//         logs.sort(
//           (a: AuditLog, b: AuditLog) =>
//             new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//         );

//         setAuditLogs(logs);
//       } catch (err) {
//         console.error("Error fetching audit logs:", err);
//         setError(
//           "Failed to load audit logs. " +
//             (err instanceof Error ? err.message : "")
//         );
//       } finally {
//         setLoadingLogs(false);
//       }
//     };

//     fetchUsers();
//     fetchAuditLogs();
//   }, [navigate, token]);

//   const handleDelete = async (userId: number) => {
//     if (!token) return;

//     if (!window.confirm("Are you sure you want to delete this user?")) {
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5001/admin/${userId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 401 || response.status === 403) {
//         alert("Session expired. Please log in again.");
//         navigate("/login", { replace: true });
//         return;
//       }

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to delete user");
//       }

//       // Remove user from state immediately
//       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

//       // Wait to allow backend to create audit log (adjust if needed)
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       // Refresh audit logs after deletion
//       const logResponse = await fetch(
//         "http://localhost:5001/admin/audit-logs",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (logResponse.ok) {
//         const logs = await logResponse.json();

//         // Sort logs descending by timestamp, newest first
//         logs.sort(
//           (a: AuditLog, b: AuditLog) =>
//             new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//         );

//         setAuditLogs(logs);
//       } else {
//         console.warn("Failed to refresh audit logs after deletion");
//       }
//     } catch (error: any) {
//       console.error("Error deleting user:", error);
//       alert(error.message || "Error deleting user");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <Header1 />
//       <h3 className="mt-5">Users List</h3>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {loadingUsers ? (
//         <p>Loading users...</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-striped table-hover table-bordered">
//             <thead className="table-dark">
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan={3} className="text-center">
//                     No users found.
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((user) => (
//                   <tr key={user.id}>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(user.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <h3 className="mt-5">Audit Logs</h3>
//       {loadingLogs ? (
//         <p>Loading audit logs...</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-sm table-hover">
//             <thead className="table-secondary">
//               <tr>
//                 <th>Action</th>
//                 <th>Performed By</th>
//                 <th>Target User</th>
//                 <th>Description</th>
//                 <th>Timestamp</th>
//               </tr>
//             </thead>
//             <tbody>
//               {auditLogs.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="text-center">
//                     No audit logs found.
//                   </td>
//                 </tr>
//               ) : (
//                 auditLogs.map((log) => (
//                   <tr key={log.id}>
//                     <td>{log.action}</td>
//                     <td>{log.performedBy}</td>
//                     <td>{log.targetUser}</td>
//                     <td>{log.description}</td>
//                     <td>{new Date(log.timestamp).toLocaleString()}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header1 from "./Header1";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuditLog {
  id: number;
  action: string;
  performedBy: string;
  targetUser: string;
  description: string;
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetchUsers();
    fetchAuditLogs();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5001/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        navigate("/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();
      setUsers(result);
    } catch (err) {
      setError("Error loading users.");
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchAuditLogs = async () => {
    setLoadingLogs(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5001/admin/audit-logs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        navigate("/", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch audit logs");
      }

      const logs: AuditLog[] = await response.json();
      logs.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setAuditLogs(logs);
    } catch (err) {
      setError("Error loading audit logs.");
      console.error(err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleDelete = async (userId: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://localhost:5001/admin/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401 || response.status === 403) {
        navigate("/login", { replace: true });
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      // Remove user from UI
      setUsers((prev) => prev.filter((u) => u.id !== userId));

      // Wait for audit log creation and then reload logs
      setTimeout(() => {
        fetchAuditLogs();
      }, 800);
    } catch (error: any) {
      alert(error.message || "Error deleting user");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Header1 />
      <h3 className="mt-5">Users List</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      {loadingUsers ? (
        <p>Loading users...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <h3 className="mt-5">Audit Logs</h3>
      {loadingLogs ? (
        <p>Loading audit logs...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-sm table-hover">
            <thead className="table-secondary">
              <tr>
                <th>Action</th>
                <th>Performed By</th>
                <th>Target User</th>
                <th>Description</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    No audit logs found.
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.action}</td>
                    <td>{log.performedBy}</td>
                    <td>{log.targetUser}</td>
                    <td>{log.description}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
