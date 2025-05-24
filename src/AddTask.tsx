import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  type Task = {
    name: string;
    description: string;
    category: string;
    dueDate: string;
    status: string;
  };
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState<Task>({
    name: "",
    description: "",
    category: "Select",
    dueDate: "",
    status: "Select",
  });

  // const [taskList, setTaskList] = useState<Task[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/task/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to save task.");
      }

      const newTask = await response.json();

      // setTaskList((prevList) => [...prevList, newTask]);

      // Clear form
      setTaskData({
        name: "",
        description: "",
        category: "Select",
        dueDate: "",
        status: "Select",
      });
      navigate("/tasks");
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const handleCancel = () => {
    navigate("/tasks");
  };
  return (
    <div className="container mt-4">
      <form
        onSubmit={handleSubmit}
        className="border border-secondary p-4 rounded shadow"
        style={{ backgroundColor: "lightblue" }}
      >
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            className="form-control"
            style={{ width: "25%" }}
            name="name"
            value={taskData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            name="description"
            rows={3}
            value={taskData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-control"
            style={{ width: "25%" }}
            name="category"
            value={taskData.category}
            onChange={handleChange}
          >
            <option value="Select">Select</option>
            <option value="UI">UI</option>
            <option value="Backend">Backend</option>
            <option value="Testing">Testing</option>
            <option value="Bug">Bug</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            className="form-control"
            style={{ width: "25%" }}
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            className="form-control"
            style={{ width: "25%" }}
            name="status"
            value={taskData.status}
            onChange={handleChange}
          >
            <option value="Select">Select</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "50px" }}
        >
          Save
        </button>
        <button
          type="submit"
          className="mx-2 btn btn-primary"
          onClick={handleCancel}
          style={{
            width: "70px",
            backgroundColor: "white",
            color: "black",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTask;
export default AddTask;
