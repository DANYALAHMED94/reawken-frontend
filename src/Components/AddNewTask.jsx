import React, { useEffect, useState } from "react";
import { useUserContext } from "../context";
import { addTask } from "../Api";
import { toast } from "react-toastify";

const AddNewTask = ({ setModalOpen }) => {
  const [data, setData] = useState({
    taskName: "",
    taskStatus: "",
    dueDate: "",
    date: "",
    time: "",
    userId: "",
  });

  const { user, setUser } = useUserContext();
  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  const getUser = () => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    } else {
      setUser(null);
    }
  };

  const handleTask = async (values) => {
    const newData = { ...values, userId: user?.userId };
    try {
      const res = await addTask(newData);
      if (res?.data?.success) {
        toast.success(`${res?.data?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setModalOpen(false);
      }
    } catch (error) {
      toast.error(`${error?.response?.data.message}`, {
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

  // const handleReminderChange = (e) => {
  //   const { name, value } = e.target;

  //   const updatedTask = { ...data };

  //   updatedTask.reminder = {
  //     ...updatedTask.reminder,
  //     [name]: value,
  //   };

  //   setData(updatedTask);
  // };

  return (
    <div className="new_task">
      <p>Add new task</p>
      <div className="task_input">
        <label htmlFor="taskName">Task name</label>
        <input
          onChange={(e) => setData({ ...data, taskName: e.target.value })}
          type="text"
          name="taskName"
        />
      </div>
      <div className="task_input">
        <label htmlFor="taskStatus">Task status</label>
        <select
          onChange={(e) => setData({ ...data, taskStatus: e.target.value })}
          name="taskStatus"
          id="taskStatus"
        >
          <option value="">Select</option>
          <option value="In Progress">In Progress</option>
          <option value="Todo">To do</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="task_input">
        <label htmlFor="date">Due Date</label>
        <input
          type="date"
          onChange={(e) => setData({ ...data, dueDate: e.target.value })}
          name="duaDate"
        />
      </div>

      <div className="remind">
        <label htmlFor="date">Reminder:</label>

        <div className="reminder">
          <div
            style={{ width: "50%", marginTop: "0px" }}
            className="task_input"
          >
            <input
              type="date"
              onChange={(e) => setData({ ...data, date: e.target.value })}
              name="date"
              // value="data.reminder.date"
            />
          </div>
          <div
            style={{ width: "50%", marginTop: "0px" }}
            className="task_input"
          >
            <input
              type="time"
              onChange={(e) => setData({ ...data, time: e.target.value })}
              name="time"
              // value="data.reminder.time"
            />
          </div>
        </div>
      </div>

      <div className="task_btn">
        <button onClick={() => setModalOpen(false)}>Cancel</button>
        <button onClick={() => handleTask(data)}>Done</button>
      </div>
    </div>
  );
};

export default AddNewTask;
