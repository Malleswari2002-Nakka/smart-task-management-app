// interface task {
//   Title: string;
// }
// interface today {
//   data: task[];
// }
// const DueToday = ({ data }: today) => {
//   return (
//     <div>
//       <h2 className="mt-5" style={{ color: "black" }}>
//         Today's Tasks
//       </h2>
//       <div className="d-flex flex-row flex-wrap gap-4">
//         {data.map((title, index) => (
//           <div key={index} className="card " style={{ width: "18rem" }}>
//             <img src="./task.jpg" className="card-img-top" alt="" />
//             <div className="card-body">
//               <h5 className="card-title">{title.Title}</h5>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DueToday;
import { useEffect, useState } from "react";

interface Task {
  Title: string;
}

const DueToday = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDueToday = async () => {
    try {
      const response = await fetch("http://localhost:5001/tasks/duetoday");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data: Task[] = await response.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDueToday();
  }, []);

  if (loading) return <p>Loading today's tasks...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="mt-5" style={{ color: "black" }}>
        Today's Tasks
      </h2>
      <div className="d-flex flex-row flex-wrap gap-4">
        {tasks.length === 0 ? (
          <p>No tasks due today.</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="card" style={{ width: "18rem" }}>
              <img src="./task.jpg" className="card-img-top" alt="task" />
              <div className="card-body">
                <h5 className="card-title">{task.Title}</h5>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DueToday;
