import React, { useState, useRef } from "react";
import { updateTask2, addComment } from "../Api";
import { toast } from "react-toastify";
import Comment from "./Comment";
import Plus from "../assests/plus.svg";

const CommentAndAttachmentModal = ({ commentModal, setCommentModal, id }) => {
  const [data, setData] = useState({
    comment: "",
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const closeModal = () => {
    setCommentModal(false);
  };

  const handlefile = (event) => {
    setFile(event.target.files[0]);
  };
  const handleFormData = (values) => {
    var formData = new FormData();
    if (!!file) formData.append("filename", file);

    return formData;
  };

  const handleTask = async (values) => {
    if (data) {
      try {
        const res = await addComment(data, id);
        if (res?.data?.success) {
          // toast.success(`${res?.data?.message}`, {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
          setCommentModal(false);
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
    }
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
        setCommentModal(false);
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
      {commentModal && (
        <div className="">
          <div className="modal">
            <div className="modal2">
              {/* <p>dfghjk</p> */}
              <div className="modal1">
                <div>
                  <Comment id={id} />
                </div>
                <div className="new_task">
                  <div className="">
                    <div>
                      <div className="task_input">
                        <label htmlFor="comment">Add comment</label>
                        <input
                          onChange={(e) =>
                            setData({
                              ...data,
                              comment: e.target.value,
                            })
                          }
                          type="text"
                          name="comment"
                        />
                      </div>
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
                    </div>
                  </div>

                  <div className="task_btn">
                    <button onClick={() => setCommentModal(false)}>
                      Cancel
                    </button>
                    <button onClick={() => handleTask(data)}>Done</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay background */}
      {commentModal && <div className="overlay" onClick={closeModal}></div>}
    </div>
  );
};
export default CommentAndAttachmentModal;
