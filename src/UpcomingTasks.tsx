interface Task {
  Title: string;
  duedate: string;
}
interface Props {
  data: Task[];
}
function formatDateString(dateStr: string): string {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toString();
}
function UpcomingTasks({ data }: Props) {
  return (
    <div>
      <h1 className="mb-4 ">Upcoming Tasks</h1>
      <div className="d-flex flex-row flex-wrap gap-4">
        {data.map((task, index) => (
          <div key={index} className="card" style={{ width: "18rem" }}>
            <img src="./task.jpg" className="card-img-top" alt="Task" />
            <div className="card-body">
              <h5 className="card-title">{task.Title}</h5>
              <p className="card-text">Due: {formatDateString(task.duedate)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingTasks;
