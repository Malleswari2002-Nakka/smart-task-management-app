// interface Tasks {
//   Totaltasks: Number;
//   Completed: Number;
//   Pending: Number;
//   Overdue?: Number;
// }
// interface task {
//   data: Tasks[];
// }

// const TaskStatus = ({ data }: task) => {
//   const task = data[0];
//   if (!task) return null;
//   return (
//     <div className="d-flex justify-content-between mb-4">
//       {Object.entries(task).map(([label, value], idx) => (
//         <div key={idx} className="card p-3 shadow-sm text-center mx-2 mt-5">
//           <h5>{label}</h5>
//           <p>{String(value)}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskStatus;
import { useEffect, useState } from "react";

interface Tasks {
  Totaltasks: number;
  Completed: number;
  Pending: number;
  Overdue?: number;
}

const TaskStatus = () => {
  const [task, setTask] = useState<Tasks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTaskStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5001/tasks/status");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Tasks[] = await response.json();
      setTask(data[0]);
    } catch (err) {
      setError("Failed to fetch task status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskStatus();
  }, []);

  if (loading) return <p>Loading task status...</p>;
  if (error) return <p>{error}</p>;
  if (!task) return <p>No task status data available</p>;

  return (
    <div className="d-flex justify-content-between mb-4">
      {Object.entries(task).map(([label, value], idx) => (
        <div key={idx} className="card p-3 shadow-sm text-center mx-2 mt-5">
          <h5>{label}</h5>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskStatus;
