import TaskStatus from "./TaskStatus";
import WelcomeMessage from "./WelcomeMessage";
import UpcomingTasks from "./UpcomingTasks";
import CompletedTasksGraph from "./CompletedTasksGraph";
import DueToday from "./DueToday";
import PopularCategories from "./PopularCategories";
import Head from "./Head";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const Dashboard = () => {
  return (
    <div>
      <Head />
      <div className="text-center fs-4 mt-5" style={{ fontWeight: "bold" }}>
        <WelcomeMessage name="malli" />
        <TaskStatus />
      </div>
      <DueToday />
      <UpcomingTasks />
      <CompletedTasksGraph />
      <PopularCategories />
    </div>
  );
};

export default Dashboard;
