import PropTypes from "prop-types";
import { useState } from "react";

const Todo = ({ id, name, description, onStatusChange, onEdit, onDelete }) => {
  const [status, setStatus] = useState("Not Completed");

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusChange(id, newStatus);
  };

  const handleEdit = () => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div key={id} className="todo">
      <div>
        <p>Name: {name}</p>
        <p>Description: {description}</p>
        <form>
          Status:{" "}
          <select value={status} onChange={handleStatusChange}>
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>
          <br />
          <br />
          <button type="button" className="edit" onClick={handleEdit}>
            Edit
          </button>
          <button type="button" className="delete" onClick={handleDelete}>
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Todo;
