import React, { useEffect, useState } from "react";
import { deleteTaskNotification, getNotification } from "../Api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Notification() {
  const [notification, setNotification] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAllNotification();
    // eslint-disable-next-line
  }, [notification]);

  const getAllNotification = async () => {
    try {
      const res = await getNotification(id);
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

  const handleDelteNotifications = async (id) => {
    try {
      await deleteTaskNotification(id);
    } catch (error) {
      console.log(error);
    }
  };

  function formatDate(inputDate) {
    const parts = inputDate.split("-");
    // Rearrange the date parts to the desired format
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return formattedDate;
  }

  function formatFullDate(fullDateString) {
    const onlyDate = fullDateString.split("T")[0];
    const value = formatDate(onlyDate);
    return value;
  }
  return (
    <>
      <div style={{ padding: "20px" }}>
        <Link to="/">
          <img className="arrow2" src="/images/left-arrow (2).png" alt="" />
        </Link>
      </div>
      <div className="notification-section">
        <h1>Notifications</h1>
        {notification?.map((obj, _) => (
          <div key={obj._id}>
            {obj.notification.message ? (
              <div key={obj._id} className="notification-container">
                <div className="delete_notification">
                  <button
                    onClick={() => {
                      handleDelteNotifications(obj._id);
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="notification">
                  <span>{obj.notification.message}</span>
                </div>
                <div style={{ width: "100%" }}>
                  <div className="reminder">
                    Reminder: <span>{formatDate(obj.reminder.date)}</span>
                  </div>
                  <div className="created_at">
                    <p>{formatFullDate(obj.createdAt)}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}
