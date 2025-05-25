import TaskStatus from "./TaskStatus";
import WelcomeMessage from "./WelcomeMessage";
import TaskChart from "./TaskChart";
import UpcomingTasks from "./UpcomingTasks";
import type { GrDocumentUpdate } from "react-icons/gr";

function Dashboard() {
  const stats = {
    Totaltasks: 20,
    Completed: 10,
    Pending: 5,
    Overdue: 2,
  };
  const chartData = [
    { name: "Completed", value: 10 },
    { name: "Pending", value: 5 },
    { name: "Overdue", value: 2 },
  ];
  const data = [
    { Title: "task1", duedate: "20-05-2025" },
    { Title: "task2", duedate: "25-05-2025" },
    { Title: "task3", duedate: "03-06-2025" },
  ];
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>
      <WelcomeMessage name="malli" />
      <TaskStatus stats={stats} />
      <h2 className="mb-4 mt-5 text-center">Task Status Overview</h2>
      <TaskChart data={chartData} />

      <UpcomingTasks data={data} />
    </div>
  );
}

export default Dashboard;
