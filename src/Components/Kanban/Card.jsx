// Card.js
import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import Modal from "../Modal";
import Progress from "../../assests/menu.svg";
// import TitleModal from "../TitleModal";
// import CommentAndAttachmentModal from "../CommentAndAttachmentModal";
import EditModal from "../EditModal";

const Card = ({ card }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [commentModal, setCommentModal] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 80) {
        setProgress(progress + 1);
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, [progress]);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD", // This should match the accept value in useDrop
    item: { taskId: card._id, taskStatus: card.title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  function formatDate(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateParts = inputDate.split("-");
    if (dateParts.length !== 3) {
      // Invalid date format, handle accordingly
      return "Invalid Date";
    }

    const year = parseInt(dateParts[0]);
    const monthIndex = parseInt(dateParts[1]) - 1; // Adjust for zero-based months
    const day = parseInt(dateParts[2]);

    if (isNaN(year) || isNaN(monthIndex) || isNaN(day)) {
      // Invalid date values, handle accordingly
      return "Invalid Date";
    }

    const monthName = months[monthIndex];

    return `${day} ${monthName} ${year}`;
  }
  return (
    <div ref={drag} className={`card ${isDragging ? "dragging" : ""}`}>
      <div className="main_f">
        <div className="child_nxt">
          <div>
            <div className="card_heading">{card?.taskName}</div>
            <div className="card_heading2">{card?.userId?.firstName}</div>
          </div>
          <img
            className=""
            src="/images/More.svg"
            onClick={() => {
              setIsEditModalOpen(true);
            }}
            alt=""
          ></img>
        </div>
        <div className="progres">
          <div className="pro1">
            <img src={Progress} alt="progress" />
            <p className="card_heading2" style={{ marginTop: "15px" }}>
              Progress
            </p>
          </div>
          {/* <h1 style={{ fontWeight: "600" }} className="card_heading">
            5/10
          </h1> */}
        </div>
        {/* <div style={{ padding: "0px 20px" }}>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div> */}
        <div className="child_nxt">
          <div>
            <button className="date_btnn">{formatDate(card.dueDate)}</button>
          </div>
          <div className="d-flex" style={{ marginTop: "7px" }}>
            <div className="d-flex">
              <img src="/images/mssg.svg" alt="" />
              {/* <div style={{ marginTop: "10px" }}>4</div> */}
            </div>

            <div className="d-flex" style={{ marginLeft: "10px" }}>
              <img src="/images/attech.svg" alt="" />
              {/* <div style={{ marginTop: "10px" }}>2</div> */}
            </div>
          </div>
        </div>
      </div>

      <Modal setModalOpen={setModalOpen} isModalOpen={isModalOpen} />

      <EditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        id={card?._id}
      />
    </div>
  );
};

export default Card;
