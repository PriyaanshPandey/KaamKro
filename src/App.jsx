import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Howl } from "howler";
import { useMemo } from "react";


export default function App() {
  const sounds = useMemo(() => ({
  add: new Howl({
    src: ["/sounds/add.mp3"],
    volume: 0.4,
  }),
  delete: new Howl({
    src: ["/sounds/delete.mp3"],
    volume: 0.4,
  }),
  complete: new Howl({
    src: ["/sounds/complete.mp3"],
    volume: 0.4,
  }),
  star: new Howl({
    src: ["/sounds/star.mp3"],
    volume: 0.4,
  }),
  themeLight: new Howl({
    src: ["/sounds/theme-light.mp3"],
    volume: 0.4,
  }),
  themeDark: new Howl({
    src: ["/sounds/theme-dark.mp3"],
    volume: 0.4,
  }),
}), []);

  const [task, settask] = useState("");
  const [tasklist, settasklist] = useState([]);
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    let taskliststring = localStorage.getItem("tasks");
    if (taskliststring) {
      let tasklist = JSON.parse(localStorage.getItem("tasks"));
      settasklist(tasklist);
    }
  }, []);
  const [darktheme, setdarktheme] = useState(false);
  const [showfinished, setshowfinished] = useState(false);

  const handleedit = (e) => {
    let id = e.currentTarget.name;

    let t = tasklist.find((item) => {
      return item.id === id;
    });

    settask(t.task);
    let index = tasklist.findIndex((item) => {
      return item.id === id;
    });
    setEditId(id);
    savetols();
  };

  const handleremove = (e) => {
     sounds.delete.play();
    let id = e.currentTarget.name;
    let index = tasklist.findIndex((item) => {
      return item.id === id;
    });
    let newtasklist = [...tasklist];
    newtasklist.splice(index, 1);
    settasklist(newtasklist);
    savetols();
  };

  const addtask = () => {
     sounds.add.play();
    if (editId) {
      let newtasklist = tasklist.map((item) =>
        item.id === editId ? { ...item, task: task } : item,
      );

      settasklist(newtasklist);
      setEditId(null);
    } else {
      settasklist([
        ...tasklist,
        { id: uuidv4(), task, isCompleted: false, isImportant: false },
      ]);
    }

    settask("");
    savetols();
  };

  const handlechange = (e) => {
    settask(e.target.value);
  };

  const handlecheckbox = (e) => {
    sounds.complete.play();
    let id = e.target.name;
    let index = tasklist.findIndex((item) => {
      return item.id === id;
    });
    let newtasklist = [...tasklist];
    newtasklist[index].isCompleted = !newtasklist[index].isCompleted;
    settasklist(newtasklist);
    savetols();
  };
  const savetols = () => {
    localStorage.setItem("tasks", JSON.stringify(tasklist));
  };
  const themetoggle = () => {
    setdarktheme(!darktheme);
     if (darktheme) {
    sounds.themeLight.play();
  } else {
    sounds.themeDark.play();
  }

  };
  const handlefinished = () => {
    setshowfinished(!showfinished);
  };
  const filteredTasks = showfinished
    ? tasklist.filter((item) => item.isCompleted)
    : tasklist;
  const handleImportant = (e) => {
     sounds.star.play();
    let id = e.currentTarget.name;
    let index = tasklist.findIndex((item) => {
      return item.id === id;
    });
    let newtasklist = [...tasklist];
    newtasklist[index].isImportant = !newtasklist[index].isImportant;
    settasklist(newtasklist);
  };
  return (
    
      <>
  <Navbar darktheme={darktheme} />
  <div className="flex justify-center min-h-[90vh] transition-all duration-500">
    <div
      className={`${
        darktheme
          ? "bg-orange-500"
          : "bg-gray-800"
      } my-2 rounded-xl w-screen lg:w-4/5 py-2 px-8 transition-all duration-500 shadow-xl`}
    >
      <div className="addtask">
        <div className="flex justify-center items-center">
          <h1
            className={`${
              darktheme
                ? "text-white"
                : "text-gray-300"
            } text-3xl font-bold my-2 transition-all duration-500`}
          >
            Manage Your Tasks At One Place
          </h1>

          <button
            onClick={themetoggle}
            className={`${
              darktheme
                ? "bg-slate-600 hover:bg-slate-400"
                : "bg-slate-200 hover:bg-slate-50"
            } rounded-md px-3 flex justify-center py-1 mx-2 h-10 ml-10 transition-all duration-300 hover:scale-105 active:scale-95`}
          >
            {darktheme ? "🌙 " : " ☀"}
          </button>
        </div>

        <div className="flex justify-center mt-3">
          <input
            type="text"
            className={`${
              darktheme
                ? "bg-white text-black"
                : "bg-slate-200"
            } rounded-xl px-3 py-1 w-full lg:w-1/3 transition-all duration-300 focus:scale-[1.02] focus:outline-none`}
            placeholder="Type Your Task"
            value={task}
            onChange={handlechange}
          />

          <button
            onClick={addtask}
            disabled={task.length < 3}
            className={`${
              darktheme
                ? "bg-orange-700 hover:bg-orange-600"
                : "bg-black hover:bg-orange-600"
            } text-white rounded-md px-3 py-1 mx-2 transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-40`}
          >
            {editId ? <FaSave /> : <IoMdAdd />}
          </button>
        </div>

        <div className="flex text-white items-center mt-3">
          <h1 className="text-xl">Show Finished</h1>
          <input
            className="w-5 h-5 mx-4 transition-all duration-300 hover:scale-125"
            type="checkbox"
            onChange={handlefinished}
          />
        </div>
      </div>

      <div
        className={`${
          darktheme
            ? "bg-orange-400"
            : "bg-gray-600"
        } px-4 mt-4 rounded-md transition-all duration-500`}
      >
        <h1 className="text-2xl font-bold text-white py-2">
          YOUR TASKS
        </h1>
      </div>

      <div
        className={`${
          darktheme
            ? "bg-orange-400"
            : "bg-gray-600"
        } px-4 pb-4 rounded-md transition-all duration-500`}
      >
        {filteredTasks.map((item) => (
          <div
            key={item.id}
            className="todo flex justify-between items-center py-2 group transition-all duration-300 hover:scale-[1.01]"
          >
            <div
              className={`font-mono text-lg transition-all duration-300 ${
                item.isCompleted
                  ? "line-through text-black opacity-70"
                  : "text-white"
              } ${
                item.isImportant
                  ? "text-yellow-400 font-bold scale-105"
                  : ""
              }`}
            >
              {item.task}
            </div>

            <div className="buttons flex gap-3 items-center">
              <button
                onClick={handleedit}
                name={item.id}
                className={`${
                  darktheme
                    ? "bg-orange-700 hover:bg-orange-600"
                    : "bg-black hover:bg-gray-800"
                } text-white rounded-md px-3 py-1 transition-all duration-300 hover:scale-110 active:scale-90`}
              >
                <MdModeEdit />
              </button>

              <button
                onClick={handleremove}
                name={item.id}
                className={`${
                  darktheme
                    ? "bg-orange-700 hover:bg-orange-600"
                    : "bg-black hover:bg-gray-800"
                } text-white rounded-md px-3 py-1 transition-all duration-300 hover:scale-110 active:scale-90`}
              >
                <MdDelete />
              </button>

              <input
                type="checkbox"
                className="w-5 h-5 transition-all duration-300 hover:scale-125"
                name={item.id}
                onChange={handlecheckbox}
              />

              <button
                onClick={handleImportant}
                name={item.id}
                className="text-xl transition-all duration-300 hover:scale-125 active:scale-90"
              >
                {item.isImportant ? (
                  <FaStar className="text-red-600 transition-all duration-300 scale-110" />
                ) : (
                  <FaRegStar className="text-white transition-all duration-300 group-hover:text-yellow-400" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</>
   
  );
}
