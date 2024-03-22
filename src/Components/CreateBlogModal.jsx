import React, { useState } from "react";
import { toast } from "react-toastify";
import { createBlog } from "../Api";

export default function CreateBlogModal({ isModalOpen, setModalOpen }) {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlefile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormData = (values) => {
    var formData = new FormData();
    formData.append("title", values?.title);
    formData.append("description", values?.description);
    if (!!file) formData.append("filename", file);

    return formData;
  };

  const handleBlog = async (values) => {
    setIsClicked(true);
    try {
      const res = await createBlog(handleFormData(values));
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
        setFile("");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
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
    toast.promise(handleBlog(data), {
      pending: "Loading...",
      success: (data) => `Data fetched successfully: ${data}`,
      error: (error) => `Error fetching data: ${error.message}`,
    });
  };
  return (
    <div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="">
            <div className="blog-modal">
              <div className="blog-header">
                <h1>Create Blog</h1>
                <button onClick={() => closeModal()}>x</button>
              </div>
              <div className="blog-body">
                <div className="blog-input">
                  <label htmlFor="title">Title</label>
                  <input
                    name="title"
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                    type="text"
                  />
                </div>
                <div className="blog-input">
                  <label htmlFor="title">Upload Image</label>
                </div>
                <input
                  type="file"
                  name="filename"
                  onChange={(e) => handlefile(e)}
                />
                <div className="blog-input">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                    id="description"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <div className="blog-button">
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
      {isModalOpen && <div className="overlay" onClick={closeModal}></div>}
    </div>
  );
}
