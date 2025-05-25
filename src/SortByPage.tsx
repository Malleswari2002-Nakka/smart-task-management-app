interface SortDropdownProps {
  sortBy: string;
  onChange: (value: string) => void;
}
function SortByPage({ sortBy, onChange }: SortDropdownProps) {
  return (
    <div>
      <label htmlFor="sort">Sort By: </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="duedate">Due Date</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}

export default SortByPage;
