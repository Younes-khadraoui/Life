import { CreateTodo } from "../../wailsjs/go/main/App";

const TodoForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newTodo = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      severity: parseInt(formData.get("severity") as string, 10) as 0 | 1 | 2,
    };

    try {
      await CreateTodo(newTodo.title, newTodo.description, newTodo.severity);
      console.log("Todo created successfully!");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Todo</h2>

        {/* {isError && <p className="text-red-500 mb-4">{error?.message}</p>} */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="input input-bordered w-full focus:outline-none"
            type="text"
            name="title"
            placeholder="Enter Todo Title"
            required
          />
          <textarea
            className="textarea textarea-bordered w-full focus:outline-none"
            name="description"
            placeholder="Enter Todo Description"
            rows={4}
          ></textarea>
          <select
            className="select select-bordered w-full focus:outline-none"
            name="severity"
          >
            <option value="2">Low</option>
            <option value="1">Medium</option>
            <option value="0">High</option>
          </select>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="btn btn-outline btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              // disabled={isPending}
            >
              {/* {isPending ? "Adding..." : "Add Todo"} */}
              "Add todo"
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
