// Card.js
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Modal from "../Modal";

const Card = ({ card, title }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD", // This should match the accept value in useDrop
    item: { taskId: card._id, taskStatus: card.title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  function formatDate(inputDate) {
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
      {/* <div className="card_flex_dash"> */}
      {/* <div className="card_dash"> */}
      <div className="main_f">
        <div className="child_nxt">
          <div>
            <div>{card?.taskName}</div>
            <div>{card?.userId?.firstName}</div>
          </div>
          {/* <img className="" src="/images/More.svg" alt=""></img> */}
        </div>
        {/* <img className="d_img" src="/images/Progress.svg" alt="" /> */}
        <div className="child_nxt">
          <div>
            <button className="date_btnn">{formatDate(card.dueDate)}</button>
          </div>
          {/* <div className="d-flex">
            <div className="">
              <img src="/images/mssg.svg" alt="" />
              <div>4</div>
            </div>

            <div>
              <img src="/images/attech.svg" alt="" />
              <div>2</div>
            </div>
          </div> */}
        </div>
      </div>
      {/* </div> */}
      <Modal setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
    </div>
    // </div>
  );
};

export default Card;
