import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBlogById, updateBlog } from "../Api";

export default function EditBlogModal({ isModalOpen, setModalOpen, id }) {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    getBlog();
    // eslint-disable-next-line
  }, [id]);

  const getBlog = async () => {
    try {
      const res = await getBlogById(id);
      if (res?.data?.success) {
        setData(res?.data?.blog);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const { title, description } = data;

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

  const handleBlogUpdate = async (values) => {
    setIsClicked(true);
    try {
      const res = await updateBlog(handleFormData(values), id);
      if (res?.data?.success) {
        toast.success(`${res?.data?.message}`, {
          position: "top-right",
          autoClose: 2000,
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
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-right",
        autoClose: 2000,
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
    toast.promise(handleBlogUpdate(data), {
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
      {isModalOpen && (
        <div className="modal">
          <div className="">
            <div className="blog-modal">
              <div className="blog-header">
                <h1>Edit Blog</h1>
                <button onClick={() => closeModal()}>x</button>
              </div>
              <div className="blog-body">
                <div className="blog-input">
                  <label htmlFor="title">Title</label>
                  <input
                    value={title}
                    name="title"
                    onChange={handleChange}
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
                    onChange={handleChange}
                    value={description}
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
