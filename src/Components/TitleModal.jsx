import React, { useState } from "react";
import { updateTask2 } from "../Api";
import { toast } from "react-toastify";
// import './Modal.css'; // Import your CSS file for styling

const TitleModal = ({ titleModal, setTitleModal, id }) => {
  const [data, setData] = useState({
    taskName: "",
  });
  const closeModal = () => {
    setTitleModal(false);
  };
  const handleTask = async (values) => {
    try {
      const res = await updateTask2(values, id);
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
        setTitleModal(false);
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
    <div>
      {/* Modal */}
      {titleModal && (
        <div className="modal">
          <div className="">
            <div className="new_task">
              <p>Update task title</p>
              <div className="task_input">
                <label htmlFor="taskName">Task Title</label>
                <input
                  onChange={(e) =>
                    setData({ ...data, taskName: e.target.value })
                  }
                  type="text"
                  name="taskName"
                />
              </div>

              <div className="task_btn">
                <button onClick={() => setTitleModal(false)}>Cancel</button>
                <button onClick={() => handleTask(data)}>Done</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay background */}
      {titleModal && <div className="overlay" onClick={closeModal}></div>}
    </div>
  );
};

export default TitleModal;
