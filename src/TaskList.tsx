// import { useEffect, useState } from "react";
// import AddTask from "./AddTask";

// interface Task {
//   id: number;
//   name: string;
//   due_date: string;
//   category: string;
//   status: string;
// }

// const TaskList = ({ sortBy }: { sortBy: string }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [showActionsFor, setShowActionsFor] = useState<number | null>(null);
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/tasks/gettasks", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const result = await response.json();
//         setTasks(result);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);
//   useEffect(() => {
//     if (sortBy) {
//       const sortedTasks = [...tasks].sort((a, b) => {
//         switch (sortBy) {
//           case "duedate":
//             return (
//               new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
//             );
//           case "name":
//             return a.name.localeCompare(b.name);
//           case "status":
//             return a.status.localeCompare(b.status);
//           default:
//             return 0;
//         }
//       });
//       setTasks(sortedTasks);
//     }
//   }, [sortBy]);
//   const toggleActions = (taskId: number) => {
//     setShowActionsFor(showActionsFor === taskId ? null : taskId);
//   };
//   return (
//     <div className="container mt-4">
//       <table className="table table-bordered table-striped">
//         <thead className="table-dark">
//           <tr>
//             <th>Task Name</th>
//             <th>Due Date</th>
//             <th>Category</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.length === 0 ? (
//             <tr>
//               <td colSpan={4} className="text-center">
//                 No tasks available
//               </td>
//             </tr>
//           ) : (
//             tasks.map((task) => (
//               <tr key={task.id}>
//                 <td>{task.name}</td>
//                 <td>
//                   {new Date(task.due_date).toLocaleDateString("en-GB", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </td>
//                 <td>{task.category}</td>
//                 <td>{task.status}</td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     {/* <button className="btn btn-sm btn-primary">
//                       Edit/ Delete
//                     </button> */}
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => toggleActions(task.id)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => toggleActions(task.id)}
//                     >
//                       Delete
//                     </button>
//                     {/* Show links only when toggled */}
//                     {task.status === "pending" && (
//                       <button className="btn btn-sm btn-success">
//                         Mark as Complete
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TaskList;

import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
interface Task {
  id: number;
  name: string;
  due_date: string;
  category: string;
  status: string;
}

const TaskList = ({ sortBy }: { sortBy: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5001/tasks/gettasks");
      const result = await response.json();
      setTasks(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (sortBy) {
      const sortedTasks = [...tasks].sort((a, b) => {
        switch (sortBy) {
          case "duedate":
            return (
              new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
            );
          case "name":
            return a.name.localeCompare(b.name);
          case "status":
            return a.status.localeCompare(b.status);
          default:
            return 0;
        }
      });
      setTasks(sortedTasks);
    }
  }, [sortBy]);

  const handleDelete = async (taskId: number) => {
    try {
      await fetch(`http://localhost:5001/deletetasks/${taskId}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const markAsComplete = async (taskId: number) => {
    try {
      await fetch(`http://localhost:5001/updatestatus/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error marking task complete:", error);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditTaskId(task.id);
    setEditedTask(task);
  };

  const handleEditChange = (field: keyof Task, value: string) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async () => {
    try {
      await fetch(`http://localhost:5001/updatetasks/${editTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTask),
      });
      setEditTaskId(null);
      setEditedTask({});
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="container mt-4">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Task Name</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                No tasks available
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                {editTaskId === task.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editedTask.name || ""}
                        onChange={(e) =>
                          handleEditChange("name", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={editedTask.due_date?.split("T")[0] || ""}
                        onChange={(e) =>
                          handleEditChange("due_date", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editedTask.category || ""}
                        onChange={(e) =>
                          handleEditChange("category", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <select
                        value={editedTask.status || ""}
                        onChange={(e) =>
                          handleEditChange("status", e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={handleEditSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setEditTaskId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{task.name}</td>
                    <td>
                      {new Date(task.due_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>{task.category}</td>
                    <td>{task.status}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEditClick(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </button>
                        {task.status === "pending" && (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => markAsComplete(task.id)}
                          >
                            Mark as Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
