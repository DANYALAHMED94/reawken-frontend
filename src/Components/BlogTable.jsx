import React, { useEffect, useState } from "react";
import { deleteBlogById, getAllBlogs } from "../Api";
import { toast } from "react-toastify";
import Loader from "./Loader";
import EditBlogModal from "./EditBlogModal";
import Edit from "../assests/edit.svg";
import Delete from "../assests/delete.svg";

export default function BlogTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    getAllBlog();
  }, []);

  const getAllBlog = async () => {
    try {
      const res = await getAllBlogs();
      if (res?.data?.success) {
        setData(res?.data?.blog);
        setLoading(false);
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

  const handleEdit = (value) => {
    setId(value._id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteBlogById(id);
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
        window.location.reload();
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Loader />
          ) : (
            <>
              {data?.map((obj, _) => (
                <tr key={obj._id}>
                  <td data-label="Title">{obj.title}</td>
                  <td data-label="Actions">
                    <button
                      title="Edit"
                      className="edit-btn"
                      onClick={() => handleEdit(obj)}
                    >
                      <img src={Edit} alt="edit" />
                    </button>
                    <button
                      title="Delete"
                      className="edit-btn"
                      onClick={() => handleDelete(obj._id)}
                    >
                      <img src={Delete} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <EditBlogModal
        id={id}
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
}
