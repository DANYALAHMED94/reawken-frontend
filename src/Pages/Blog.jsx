import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogTable from "../Components/BlogTable";
import CreateBlogModal from "../Components/CreateBlogModal";

const Blog = () => {
  const [toggleState, setToggleState] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const navigation = useNavigate();

  const handleLogoutButton = () => {
    localStorage.removeItem("user");
    navigation("/login");
  };
  return (
    <>
      <div className="doc_Page">
        <div className="doc_header">
          <div className="header_child_3">
            <div className="header_child_1">
              <div>
                <p onClick={() => handleLogoutButton()} className="para2">
                  Logout
                </p>
              </div>
              <div className="title_Doc">Welcome,</div>
              <div className="user_name pl-2">Admin</div>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="heading2">Admin Panel</h1>
        </div>

        <div className="flex_icons2">
          <div
            className={toggleState === 2 ? "active" : "active2"}
            onClick={() => {
              toggleTab(2);
              setModalOpen(true);
            }}
          >
            <img className="pr-2" src="/images/add.svg" alt=""></img>
            Create Blog
          </div>
        </div>

        <BlogTable />
      </div>
      <CreateBlogModal setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
    </>
  );
};

export default Blog;
