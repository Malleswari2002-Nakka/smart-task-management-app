interface StatsProps {
  stats: {
    Totaltasks: Number;
    Completed: Number;
    Pending: Number;
    Overdue?: Number;
  };
}

function TaskStatus({ stats }: StatsProps) {
  return (
    // <div className="card" style={{ width: "18rem", borderColor: "grey" }}>
    //   <img src="./public/task.jpg" className="card-img-top" alt="..." />
    //   {Object.entries(stats).map(([label, value], idx) => (
    //     <div key={idx} className="card-body">
    //       <h5 className="card-title">{label}</h5>
    //       <p className="card-text">{value}</p>
    //     </div>
    //   ))}
    // </div>
    <div className="d-flex justify-content-between mb-4">
      {Object.entries(stats).map(([label, value], idx) => (
        <div key={idx} className="card p-3 shadow-sm text-center mx-2">
          <h5 className="fw-bold">{label}</h5>
          <p className="fs-4">{String(value)}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskStatus;
