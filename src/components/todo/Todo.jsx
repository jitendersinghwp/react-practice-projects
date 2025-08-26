import { useEffect, useRef, useState } from "react";

function Todo() {
  const todoRef = useRef(null);
  const editTodoRef = useRef(null);
  const todoStatusRefs = useRef([]);
  const [todos, setTodos] = useState([]);
  const [todoEditIndex, setTodoEditIndex] = useState(null);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    const todoStr = localStorage.getItem("todos");
    if (todoStr) {
      setTodos(JSON.parse(todoStr));
    }
  }, []);

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

  const handleTodoStatus = (index) => {
    const checkBox = todoStatusRefs.current[index];
    setTodos((prev) => {
      const oldTodos = [...prev];
      oldTodos[index].status = checkBox.checked;
      return oldTodos;
    });
  };

  const handleUpdateTodo = (index) => {
    const updatedTodo = editTodoRef.current;

    if (!updatedTodo.value) return;

    setTodos((prev) => {
      const oldTodos = [...prev];
      oldTodos[index].todo = updatedTodo.value;
      return oldTodos;
    });

    setTodoEditIndex(null);
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
          todos.map((item, key) => (
            <li className="pb-3 flex gap-2.5" key={item?.id}>
              <div className="flex flex-1 gap-2 align-middle">
                <input
                  id={item?.id}
                  type="checkbox"
                  ref={(el) => (todoStatusRefs.current[key] = el)}
                  checked={item?.status}
                  onChange={() => handleTodoStatus(key)}
                />
                {todoEditIndex !== key ? (
                  <label
                    htmlFor={item?.id}
                    className={`text-[18px] ${
                      item?.status ? "line-through" : ""
                    }`}
                  >
                    {item?.todo}
                  </label>
                ) : (
                  <input
                    type="text"
                    name="editTodo"
                    className="border-0 text-[18px] focus:outline-0 flex-1"
                    ref={editTodoRef}
                    defaultValue={item?.todo}
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
                      onClick={() =>
                        setTodos((prev) =>
                          prev.filter((todo) => todo.id !== item.id)
                        )
                      }
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
