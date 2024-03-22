// Board.js
import React, { useState } from "react";
// import "./Board.css";
import { useDrop } from "react-dnd";
import Card from "./Card";
import Modal from "../Modal";
import { updateTask } from "../../Api";
import Loader from "../Loader";

const Board = ({ title, data, loading }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [, drop] = useDrop({
    accept: "CARD", // Make sure this matches the type set in useDrag
    drop: (item) => handleCardDrop(item),
  });

  const handleCardDrop = async (item) => {
    const data = {
      taskId: item.taskId,
      taskStatus: title,
    };
    try {
      await updateTask(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div ref={drop} className="board">
      <div className="fisrt_f">
        <div className="">
          {title} ({data?.length})
        </div>
        <div className="d-flex">
          <img className="pr-2" src="/images/add.svg" alt=""></img>
          <div className="dropdown">
            <button onClick={() => setModalOpen(true)} className="">
              Add new task
            </button>
          </div>
        </div>
      </div>
      {/* <button onClick={addCard}>Add Card</button> */}
      <div className="card-container">
        {loading ? (
          <Loader />
        ) : (
          <div>
            {data?.map((card) => (
              <Card key={card._id} card={card} title={title} />
            ))}
          </div>
        )}
      </div>
      <Modal setModalOpen={setModalOpen} isModalOpen={isModalOpen} />
    </div>
  );
};

export default Board;
