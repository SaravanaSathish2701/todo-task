import Todo from "./Todo";
import { useState } from "react";

const todosData = [
  {
    id: 1,
    name: "Wakeup",
    description: "Wakeup early morning on 5:30 am",
    status: "Not Completed",
  },
  {
    id: 2,
    name: "Morning Study",
    description: "Study early morning 5:45 am to 6:30 am",
    status: "Not Completed",
  },
];

const Todos = () => {
  const [todos, setTodos] = useState(todosData);
  const [filter, setFilter] = useState("All");
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  const handleStatusChange = (id, newStatus) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const handleEdit = (id) => {
    const newName = prompt("Enter New Todo Name:");
    const newDescription = prompt("Enter New Todo Description:");

    if (newName && newDescription) {
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, name: newName, description: newDescription }
            : todo
        )
      );
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (e) => {
    e.preventDefault();
    const newName = e.target.elements.name.value;
    const newDescription = e.target.elements.description.value;

    if (newName && newDescription) {
      const newTodo = {
        id: todos.length + 1,
        name: newName,
        description: newDescription,
        status: "Not Completed",
      };
      setTodos([...todos, newTodo]);
      setFormState({ name: "", description: "" });
    }
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const filterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    return todo.status === filter;
  });

  return (
    <div className="container">
      <h1>My Todo</h1>
      <form className="add" onSubmit={addTodo}>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
          placeholder="Todo Name"
          required
        />
        <input
          type="text"
          name="description"
          value={formState.description}
          onChange={inputChange}
          placeholder="Todo Description"
          required
        />
        <button type="Submit">Add Todo</button>
      </form>
      <div className="head">
        <h2>My Todos</h2>
        <form>
          Status:{" "}
          <select onChange={filterChange}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </form>
      </div>
      <div>
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            name={todo.name}
            description={todo.description}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
