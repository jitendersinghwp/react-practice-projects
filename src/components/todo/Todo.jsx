import { useEffect, useRef, useState } from "react";
import { useLocalstorage } from "../../utils/hooks/useLocalstorage";

function Todo() {
  const todoRef = useRef(null);
  const editTodoRef = useRef(null);
  const todoStatusRefs = useRef([]);
  const [todos, setTodos] = useLocalstorage("todos", []);
  const [todoEditIndex, setTodoEditIndex] = useState(null);

  useEffect(() => {
    if (todoEditIndex !== null) {
      editTodoRef.current.focus();
    }
  }, [todoEditIndex]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const todoValue = todoRef.current.value;
    if (!todoValue) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), todo: todoValue, status: false },
    ]);
    todoRef.current.value = "";
  };

  const updateTodoTask = (index, key, value) => {

   setTodos((prev) => {
      const oldTodos = [...prev];
      oldTodos[index][key] = value;
      return oldTodos;
    });

  }

  const handleTodoStatus = (index) => {
    const checkBox = todoStatusRefs.current[index];

    updateTodoTask(index, "status", checkBox.checked);
  };

  const handleUpdateTodo = (index) => {
    const updatedTodo = editTodoRef.current;

    updateTodoTask(index, "todo", updatedTodo.value);

    setTodoEditIndex(null);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-6/12 mx-auto">
      <h1 className="text-center text-2xl font-bold mt-4">Todo App</h1>
      <form className="mt-[40px]">
        <div className="border border-gray-300 rounded-md p-4 flex ">
          <input
            type="text"
            name="todo"
            className="flex-1 text-[18px] focus:outline-0"
            ref={todoRef}
          />
          <button
            type="submit"
            className="bg-red-500 text-[18px] px-4 py-2.5 text-white rounded-md"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>
      </form>
      <ul className="mt-4">
        {todos.length === 0 && (
          <p className="text-center text-gray-500">
            No todos found. Please add some todos.
          </p>
        )}
        {todos.length > 0 &&
          todos.map((todo, key) => (
            <li className="pb-3 flex gap-2.5" key={todo?.id}>
              <div className="flex flex-1 gap-2 align-middle">
                <input
                  id={todo?.id}
                  type="checkbox"
                  ref={(el) => (todoStatusRefs.current[key] = el)}
                  checked={todo?.status}
                  onChange={() => handleTodoStatus(key)}
                />
                {todoEditIndex !== key ? (
                  <label
                    htmlFor={todo?.id}
                    className={`text-[18px] ${
                      todo?.status ? "line-through" : ""
                    }`}
                  >
                    {todo?.todo}
                  </label>
                ) : (
                  <input
                    type="text"
                    name="editTodo"
                    className="border-0 text-[18px] focus:outline-0 flex-1"
                    ref={editTodoRef}
                    defaultValue={todo?.todo}
                  />
                )}
                {todoEditIndex !== key ? (
                  <div className="justify-end ml-auto flex gap-2">
                    <button
                      className="px-1.5 py-0.5 bg-green-400 text-[14px] rounded-md cursor-pointer"
                      onClick={() => setTodoEditIndex(key)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-1.5 py-0.5 bg-red-700 text-white text-[14px] rounded-md cursor-pointer"
                      onClick={() => handleDeleteTodo(todo?.id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="justify-end ml-auto flex gap-2">
                    <button
                      className="px-1.5 py-0.5 bg-green-400 text-[14px] rounded-md cursor-pointer"
                      onClick={() => handleUpdateTodo(key)}
                    >
                      Save
                    </button>
                    <button
                      className="px-1.5 py-0.5 bg-red-700 text-white text-[14px] rounded-md cursor-pointer"
                      onClick={() => setTodoEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Todo;
