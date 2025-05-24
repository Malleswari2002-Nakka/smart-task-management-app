import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
// import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Head1 from "./Head1";
interface Task {
  id: number;
  name: string;
  due_date: string;
  status: string;
  category?: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/tasks/gettasks", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setTasks(result);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const exportData = (type: string) => {
    if (tasks.length === 0) return;

    const data = tasks.map((task) => ({
      ID: task.id,
      Name: task.name,
      "Due Date": new Date(task.due_date).toLocaleDateString("en-GB"),
      Status: task.status,
    }));

    if (type === ".csv" || type === ".xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

      const fileType = type === ".csv" ? "csv" : "xlsx";
      const fileData = XLSX.write(workbook, {
        bookType: fileType,
        type: "array",
      });
      const blob = new Blob([fileData], {
        type:
          fileType === "csv"
            ? "text/csv;charset=utf-8;"
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `tasks${type}`);
    } else if (type === ".pdf") {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [["ID", "Name", "Due Date", "Status"]],
        body: data.map((task) => [
          task.ID,
          task.Name,
          task["Due Date"],
          task.Status,
        ]),
      });
      doc.save("tasks.pdf");
    }
  };

  return (
    <div>
      <Head1 />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5rem",
          marginRight: "4rem",
        }}
      >
        <select
          name="sortby"
          id="sortby"
          className="p-2 mx-6 mt-4"
          style={{
            color: "black",
            border: "1px solid",
            borderRadius: "4px",
            borderColor: "black",
            fontFamily: "sans-serif",
            width: "25%",
          }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sortby</option>
          <option value="duedate">Due Date</option>
          <option value="name">Taskname</option>
          <option value="category">Category</option>
          <option value="status">Status</option>
        </select>
        <select
          name="export"
          id="export"
          className="p-2 mx-2 mt-4"
          style={{
            color: "black",
            border: "1px solid",
            borderRadius: "4px",
            borderColor: "lightblue",
            backgroundColor: "lightblue",
            fontFamily: "sans-serif",
          }}
          onChange={(e) => exportData(e.target.value)}
        >
          <option value="export">Export</option>
          <option value=".csv">.csv</option>
          <option value=".xlsx">.xlsx</option>
          <option value=".pdf">.pdf</option>
        </select>
        <Nav.Link as={Link} to="/addtask" className="nav-link">
          <button
            className="p-2 mx-2 mt-4"
            style={{
              color: "black",
              border: "1px solid",
              borderRadius: "4px",
              borderColor: "lightblue",
              backgroundColor: "lightblue",
              fontFamily: "sans-serif",
            }}
          >
            Add Task
          </button>
        </Nav.Link>
      </div>
      <div>
        <TaskList sortBy={sortBy} />
      </div>
    </div>
  );
};

export default Tasks;
