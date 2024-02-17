import React, { useState } from "react";
import { updateTask2 } from "../Api";
import { toast } from "react-toastify";

const CommentAndAttachmentModal = ({ commentModal, setCommentModal, id }) => {
  const [data, setData] = useState({
    comment: "",
  });
  const [file, setFile] = useState(null);
  const closeModal = () => {
    setCommentModal(false);
  };

  const handlefile = (event) => {
    setFile(event.target.files[0]);
  };
  const handleFormData = (values) => {
    var formData = new FormData();
    formData.append("comment", values?.comment);
    if (!!file) formData.append("filename", file);

    return formData;
  };
  const handleTask = async (values) => {
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
  return (
    <div>
      {/* Modal */}
      {commentModal && (
        <div className="modal">
          <div className="">
            <div className="new_task">
              <p>Update task title</p>
              <div className="task_input">
                <label htmlFor="comment">Add comment</label>
                <input
                  onChange={(e) =>
                    setData({ ...data, comment: e.target.value })
                  }
                  type="text"
                  name="comment"
                />
              </div>
              <div className="task_input">
                <label htmlFor="filename">Upload Attachment</label>
                <input
                  onChange={(e) => handlefile(e)}
                  type="file"
                  name="filename"
                />
              </div>

              <div className="task_btn">
                <button onClick={() => setCommentModal(false)}>Cancel</button>
                <button onClick={() => handleTask(data)}>Done</button>
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
