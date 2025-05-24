// interface Tasks {
//   Title: string;
//   duedate: string;
// }
// interface task {
//   data: Tasks[];
// }
// const UpcomingTasks = ({ data }: task) => {
//   return (
//     <div className="mt-5">
//       <h1 className="mb-4" style={{ color: "black" }}>
//         Upcoming Tasks
//       </h1>
//       <div className="d-flex flex-row flex-wrap gap-4">
//         {data.map((task, index) => (
//           <div key={index} className="card " style={{ width: "18rem" }}>
//             <img src="./task.jpg" className="card-img-top" alt="" />
//             <div className="card-body">
//               <h5 className="card-title">{task.Title}</h5>
//               <p className="card-text">Due: {task.duedate}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UpcomingTasks;

import { useEffect, useState } from "react";

interface Task {
  Title: string;
  due_date: string;
}

const UpcomingTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingTasks = async () => {
    try {
      const response = await fetch("http://localhost:5001/tasks/upcoming");
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming tasks");
      }
      const data: Task[] = await response.json();
      setTasks(data);
    } catch (err) {
      setError("Error fetching upcoming tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingTasks();
  }, []);

  if (loading) return <p>Loading upcoming tasks...</p>;
  if (error) return <p>{error}</p>;
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="mt-5">
      <h1 className="mb-4" style={{ color: "black" }}>
        Upcoming Tasks
      </h1>
      <div className="d-flex flex-row flex-wrap gap-4">
        {tasks.map((task, index) => (
          <div key={index} className="card" style={{ width: "18rem" }}>
            <img src="./task.jpg" className="card-img-top" alt="Task" />
            <div className="card-body">
              <h5 className="card-title">{task.Title}</h5>
              <p className="card-text">Due: {formatDate(task.due_date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;
