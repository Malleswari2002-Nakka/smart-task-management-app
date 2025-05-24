// import {
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface Tasks {
//   category: string;
//   tasks: number;
// }
// interface task {
//   data: Tasks[];
// }
// const COLORS = ["blue", "green", "red"];

// const PopularCategories = ({ data }: task) => {
//   return (
//     <div>
//       <h2 className="mt-4 text-center" style={{ color: "black" }}>
//         Popular Categories
//       </h2>
//       <div style={{ width: "100%", height: 300 }}>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ index, percent }) =>
//                 `${data[index].category} (${(percent * 100).toFixed(0)}%)`
//               }
//               outerRadius={100}
//               dataKey="tasks"
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend verticalAlign="bottom" height={36} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default PopularCategories;

import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TaskCategory {
  category: string;
  tasks: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28", "#AA00FF"];

const PopularCategories = () => {
  const [data, setData] = useState<TaskCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("${API_URL}/tasks/categories"); // Adjust URL
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const categoryData: TaskCategory[] = await response.json();
        setData(categoryData);
      } catch (err) {
        console.error(err);
        setError("Failed to load category data");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading category data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="mt-4 text-center" style={{ color: "black" }}>
        Popular Categories
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ index, percent }) =>
                `${data[index].category} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={100}
              dataKey="tasks"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PopularCategories;
