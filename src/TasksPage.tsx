import { useState } from "react";
import SortByPage from "./SortByPage";
import Dashboard from "./Dashboard";
function Tasks() {
  return (
    <div>
      const[sortBy,setSortBy]=useState("duedate");
      <SortByPage sortBy={sortBy} onChange={setSortBy} />
    </div>
  );
}
export default Tasks;
