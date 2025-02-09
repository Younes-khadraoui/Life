import TodoForm from "../components/TodoForm";
import TodosTable from "../components/TodosTable";
import AddBtn from "../components/ui/AddBtn";
import { useState } from "react";

const TodoPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  console.log(window.go)
  
  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  return (
    <>
      <TodosTable />
      <AddBtn onClick={toggleForm} />
      <TodoForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}/>
    </>
  );
};

export default TodoPage;
