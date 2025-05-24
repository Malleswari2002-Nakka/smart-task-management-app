// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface Tasks {
//   date: string;
//   completed: number;
// }

// const CompletedTasksGraph = () => {
//   const [data, setData] = useState<Tasks[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCompletedTasks = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/tasks/completed");
//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.json();
//         setData(data);
//       } catch (err) {
//         setError("Failed to load completed tasks data");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompletedTasks();
//   }, []);

//   if (loading) return <p>Loading chart data...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2 className="text-center mt-4 mb-4" style={{ color: "black" }}>
//         Completed Tasks in Last 7 Days
//       </h2>
//       <div style={{ width: "100%", height: 300 }}>
//         <ResponsiveContainer>
//           <LineChart
//             data={data}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="completed"
//               stroke="#4CAF50"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default CompletedTasksGraph;
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface Tasks {
//   date: string;
//   completed: number;
// }

// const CompletedTasksGraph = () => {
//   const [data, setData] = useState<Tasks[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCompletedTasks = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/tasks/completed");
//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.json();

//         const formattedData = data.map((task: Tasks) => {
//           const dateObj = new Date(task.date);
//           return {
//             ...task,
//             date: dateObj.toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//               year: "numeric",
//             }),
//           };
//         });

//         setData(formattedData);
//       } catch (err) {
//         setError("Failed to load completed tasks data");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompletedTasks();
//   }, []);

//   if (loading) return <p>Loading chart data...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2 className="text-center mt-4 mb-4" style={{ color: "black" }}>
//         Completed Tasks in Last 7 Days
//       </h2>
//       <div style={{ width: "100%", height: 300 }}>
//         <ResponsiveContainer>
//           <LineChart
//             data={data}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="completed"
//               stroke="#4CAF50"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default CompletedTasksGraph;
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TaskData {
  date: string; // date string from backend (ISO or YYYY-MM-DD)
  dueCount: number; // number of tasks due on that date
}

const DueTasksGraph = () => {
  const [data, setData] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDueTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks/completed`); // Adjust URL accordingly
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const rawData: TaskData[] = await response.json();

        // Format dates like "May 23, 2025"
        const formattedData = rawData.map((task) => {
          const dateObj = new Date(task.date);
          return {
            ...task,
            date: dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          };
        });

        setData(formattedData);
      } catch (err) {
        setError("Failed to load due tasks data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDueTasks();
  }, []);

  if (loading) return <p>Loading chart data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-center mt-4 mb-4" style={{ color: "black" }}>
        Tasks Due From Today to Next 7 Days
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="dueCount"
              stroke="#FF5722"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DueTasksGraph;
