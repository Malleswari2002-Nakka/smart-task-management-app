import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
interface ChartData {
  name: string;
  value: Number;
}
interface Props {
  data: ChartData[];
}
function TaskChart({ data }: Props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default TaskChart;
