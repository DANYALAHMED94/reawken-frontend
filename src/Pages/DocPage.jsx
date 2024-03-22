import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { getNewNotification, getTask, updateTaskNotification } from "../Api";
import { toast } from "react-toastify";
import { useUserContext } from "../context";
import { Link, useParams, useNavigate } from "react-router-dom";
import Kanban from "../Components/Kanban/Kanban";
import profile from "../assests/profile-dummy.jpg";
import bellIcon from ".././assests/bellIcon.svg";

const DocPage = () => {
  const [toggleState, setToggleState] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState([]);
  const navigation = useNavigate();
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const { id } = useParams();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAllNotification();
    // eslint-disable-next-line
  }, [notification]);

  const getUser = () => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line
  }, [data]);

  const getAllTasks = async () => {
    try {
      const res = await getTask(id);
      if (res?.data?.success) {
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

  function getCurrentDateFormatted() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date();

    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const monthName = months[monthIndex];

    return `${day} ${monthName} ${year}`;
  }

  const getAllNotification = async () => {
    try {
      const res = await getNewNotification(id);
      if (res?.data?.success) {
        setNotification(res?.data?.data);
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

  const handleNotificationUpdate = async () => {
    try {
      const res = await updateTaskNotification(id);

      if (res?.data?.success) {
        navigation(`/notifications/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoutButton = () => {
    localStorage.removeItem("user");
    // instance.logoutRedirect();
    navigation("/login");
  };
  return (
    <>
      <div className="doc_Page">
        <div className="doc_header">
          <div className="header_child_1">
            <div className="title_Doc">Welcome back,</div>
            <div className="user_name pl-2">{user?.firstName}</div>
          </div>

          <div className="header_child_2">
            <div>
              <p onClick={() => handleLogoutButton()} className="para">
                Logout
              </p>
            </div>
            <div className="d-flex pr-2 fff">
              <div
                onClick={() => {
                  handleNotificationUpdate();
                }}
                className="bell_icon"
              >
                <div className="bell">
                  {/* <Link to={`/notifications/${id}`}> */}
                  <img
                    className="setting pr-2"
                    src={bellIcon}
                    alt="bell-icon"
                  />
                  {/* </Link> */}
                </div>
                {notification?.length === 0 ? null : (
                  <div className="notification_number">
                    {notification?.length}
                  </div>
                )}
              </div>
              <div>
                <Link to={`/setting/${id}`}>
                  <img
                    className="setting pr-2"
                    src="/images/seetingicon.svg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="title_Doc pl-3">{getCurrentDateFormatted()}</div>
              <div className="image-container">
                {user?.filename !== null &&
                user?.filename !== "" &&
                user?.filename !== undefined ? (
                  <img
                    src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${user?.filename}`}
                    alt="Profile"
                    className=""
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "360px",
                      margin: "0px 10px",
                    }}
                  />
                ) : (
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "360px",
                      margin: "0px 10px",
                    }}
                    src={profile}
                    alt="Profile"
                    className=""
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex_icons">
          <div
            className={toggleState === 1 ? "active" : "active2"}
            onClick={() => toggleTab(1)}
          >
            <img className="pr-2" src="/images/dash.svg" alt=""></img>
            Dashboard
          </div>
          <div
            className={toggleState === 2 ? "active" : "active2"}
            onClick={() => {
              toggleTab(2);
              setModalOpen(true);
            }}
          >
            <img className="pr-2" src="/images/add.svg" alt=""></img>
            Add new
          </div>
        </div>

        <Kanban data={data} />
      </div>
      <Modal setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
    </>
  );
};

export default DocPage;
