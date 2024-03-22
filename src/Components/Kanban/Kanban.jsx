import React, { useEffect, useState } from "react";
import Board from "./Board";
import {
  //   getTask,
  getTodoTask,
  getInProgressTask,
  getCompletedTask,
} from "../../Api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Kanban() {
  //   const [data, setData] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    // getAllTasks();
    getAllCompletedTasks();
    getAllInProgressTasks();
    getAllTodoTasks();
    // eslint-disable-next-line
  }, []);
  const { id } = useParams();

  const getAllTodoTasks = async () => {
    try {
      const res = await getTodoTask(id);
      if (res?.data?.success) {
        setTodo(res?.data?.data);
        setLoading1(false);
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const getAllInProgressTasks = async () => {
    try {
      const res = await getInProgressTask(id);
      if (res?.data?.success) {
        setInProgress(res?.data?.data);
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const getAllCompletedTasks = async () => {
    try {
      const res = await getCompletedTask(id);
      if (res?.data?.success) {
        setCompleted(res?.data?.data);
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="App">
      <div className="board-container">
        <Board title="Todo" loading={loading1} data={todo} />
        <Board title="In Progress" data={inProgress} />
        <Board title="Completed" data={completed} />
      </div>
    </div>
  );
}

export default Kanban;
