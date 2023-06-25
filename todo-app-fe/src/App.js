import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    fetch("https://todo-app-kvcr.onrender.com/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //make an api call to create a new todo
    const resp = await fetch("https://todo-app-kvcr.onrender.com/todos", {
      method: "POST",
      body: JSON.stringify({ title: title, description: description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    console.log(data);
    setTodos(data);
    setTitle("");
    setDescription("");
  };

  const handleDelete = async(e)=>{
    console.log(e.target.id)
    const id = e.target.id;
    const resp = await fetch(`/todos/${id}`,{
      method:"DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await resp.json();
    console.log(data)
    setTodos(data)
  }
  return (
    <div>
      <div className="text-3xl font-bold text-blue-400 flex justify-center mt-5">
        Todo App
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 mt-5"
      >
        <div>
          <div className="  text-lg font-semibold text-gray-600">Title</div>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="rounded-lg w-96 p-2 px-4 border border-gray-400 text-gray-700 "
            />
          </div>
        </div>
        <div>
          <div className=" text-lg font-semibold text-gray-600">
            Description
          </div>
          <div>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="rounded-lg w-96 p-2 px-4 border border-gray-400 text-gray-700 "
            />
          </div>
        </div>
        <button className="p-2 w-96 m-2 bg-blue-400 rounded-lg font-bold text-white">
          Create a todo
        </button>
      </form>
      <div className="flex flex-col items-center gap-2 m-2 p-2 border-t mt-4">
        <div className="text-gray-700 font-bold text-lg m-2">
          List of All the todos
        </div>
        <div className="flex  px-4 w-[600px] gap-4 text-gray-600 font-medium hover:bg-gray-200">
          <div className="py-1 w-[200px] font-bold">ID</div>
          <div className="py-1 w-[200px] font-bold">Title</div>
          <div className="py-1 w-[400px] font-bold">Description</div>
          <div>🗑️</div>
        </div>
        {todos.map((todo, idx) => {
          return (
            <div
              key={idx}
              className="flex  px-4 w-[600px] gap-4 text-gray-600 font-medium hover:bg-gray-200"
            >
              <div className="py-1 w-[200px]">{idx + 1}</div>
              <div className="py-1 w-[200px]">{todo.title}</div>
              <div className="py-1 w-[400px]">{todo.description}</div>
              <div id={todo.id} className="cursor-pointer text-xl" onClick={handleDelete}>❎</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
