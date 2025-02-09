import { useState, useEffect } from "react";
import { GetTodos, DeleteTodo } from "../../wailsjs/go/main/App";
import { models } from "../../wailsjs/go/models";

const TodosTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [todos, setTodos] = useState<models.TodoResponse[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await GetTodos();
        const todosList = data.map((todo: any) => new models.TodoResponse(todo));
        setTodos(todosList);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (todoId: number) => {
    try {
      await DeleteTodo(String(todoId));
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const filteredTodos = todos?.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input w-full max-w-xs outline-none focus:outline-none"
        />
      </div>

      {filteredTodos && filteredTodos.length > 0 ? (
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category ID</th>
              <th>Severity</th>
              <th>Done</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.description || "-"}</td>
                <td>{todo.category_id}</td>
                <td>{todo.severity}</td>
                <td>{todo.done ? "Yes" : "No"}</td>
                <td>{String(todo.created_at)}</td>
                <td className="text-error pl-6">
                  <button onClick={() => handleDelete(todo.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="cursor-pointer"
                    >
                      <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9M7 6H17V19H7V6M9 8V17H11V8H9M13 8V17H15V8H13Z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No matching todos</div>
      )}
    </div>
  );
};

export default TodosTable;
