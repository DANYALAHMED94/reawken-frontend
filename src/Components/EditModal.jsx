import React, { useEffect, useRef, useState } from "react";
// import { useUserContext } from "../context";
import { addComment, getTaskById, updateTask2 } from "../Api";
import { toast } from "react-toastify";
import Plus from "../assests/plus.svg";
import Comment from "./Comment";

const EditModal = ({ isEditModalOpen, setIsEditModalOpen, id }) => {
  const initailValue = {
    taskName: "",
    taskStatus: "",
    dueDate: "",
    date: "",
    time: "",
    userId: "",
  };
  const [data, setData] = useState(initailValue);
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState({
    comment: "",
  });
  const [isClicked, setIsClicked] = useState(false);

  const fileInputRef = useRef(null);
  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    getSingleTask();
    // eslint-disable-next-line
  }, []);

  const handlefile = (event) => {
    setFile(event.target.files[0]);
  };
  const handleFormData = (values) => {
    var formData = new FormData();
    formData.append("taskName", values?.taskName);
    formData.append("taskStatus", values?.taskStatus);
    formData.append("date", values?.date);
    formData.append("time", values?.time);
    formData.append("dueDate", values?.dueDate);
    if (!!file) formData.append("filename", file);

    return formData;
  };

  const handleTaskUpdate = async (values) => {
    setIsClicked(true);
    try {
      const res = await updateTask2(handleFormData(values), id);
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
        setIsEditModalOpen(false);
        setFile("");
        window.location.reload();
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

  const getSingleTask = async () => {
    try {
      const res = await getTaskById(id);
      if (res?.status === 200) {
        setData(res?.data?.data);
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

  const { taskName, taskStatus, reminder, dueDate } = data;

  const handleComment = async (values) => {
    try {
      const res = await addComment(values, id);
      if (res?.data?.success) {
        setComment({
          comment: "",
        });
        setIsEditModalOpen(false);
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

  const notifyWithPromise = () => {
    toast.promise(handleTaskUpdate(data), {
      pending: "Loading...",
      success: (data) => `Data fetched successfully: ${data}`,
      error: (error) => `Error fetching data: ${error.message}`,
    });
  };

  const notifyComment = () => {
    toast.promise(handleComment(comment), {
      pending: "Loading...",
      success: (data) => `Data fetched successfully: ${data}`,
      error: (error) => `Error fetching data: ${error.message}`,
    });
  };

  const handleChange = async (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      {/* Modal */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="edit-modal">
            <p>{data?.taskName}</p>
            <div className="edit-container">
              <div className="edits">
                <div className="task_input">
                  <label htmlFor="comment">Add comment</label>
                  <input
                    onChange={(e) =>
                      setComment({
                        ...comment,
                        comment: e.target.value,
                      })
                    }
                    value={comment?.comment}
                    type="text"
                    name="comment"
                  />
                </div>
                {comment?.comment.length === 0 ? null : (
                  <div className="save-button">
                    <button onClick={() => notifyComment()}>save</button>
                  </div>
                )}

                <div className="task_input">
                  <label
                    // onClick={handleAddAttachmentClick}
                    htmlFor="filename"
                    style={{ fontSize: "14px", cursor: "pointer" }}
                  >
                    <img
                      src={Plus}
                      alt=""
                      style={{
                        height: "15px",
                        width: "15px",
                      }}
                    />
                    Add Attachment
                  </label>
                  <input
                    onChange={(e) => handlefile(e)}
                    type="file"
                    name="filename"
                    ref={fileInputRef}
                    id="filename"
                    style={{ display: "none" }}
                  />
                  {file && <p>Selected file: {file.name}</p>}
                </div>
                {file ? (
                  <div className="save-button">
                    <button onClick={() => notifyWithPromise()}>save</button>
                  </div>
                ) : null}
                <Comment id={data?._id} />
              </div>
              <div className="edit_task">
                <div className="task_input">
                  <label htmlFor="taskName">Task name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="taskName"
                    value={taskName}
                  />
                </div>
                <div className="task_input">
                  <label htmlFor="taskStatus">Task status</label>
                  <select
                    onChange={handleChange}
                    value={taskStatus}
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
                    onChange={handleChange}
                    value={dueDate}
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
                        onChange={handleChange}
                        value={reminder?.date}
                        name="date"
                      />
                    </div>
                    <div
                      style={{ width: "50%", marginTop: "0px" }}
                      className="task_input"
                    >
                      <input
                        type="time"
                        onChange={handleChange}
                        value={reminder?.time}
                        name="time"
                      />
                    </div>
                  </div>
                </div>

                <div className="task_btn">
                  <button onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </button>
                  <button
                    disabled={isClicked}
                    onClick={() => notifyWithPromise()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay background */}
      {isEditModalOpen && <div className="overlay" onClick={closeModal}></div>}
    </div>
  );
};

export default EditModal;
