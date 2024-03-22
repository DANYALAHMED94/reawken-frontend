import React from "react";
import AddNewTask from "./AddNewTask";

const Modal = ({ isModalOpen, setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="">
            <div className="">
              <AddNewTask
                setModalOpen={setModalOpen}
                isModalOpen={isModalOpen}
              />
            </div>
          </div>
        </div>
      )}

      {/* Overlay background */}
      {isModalOpen && <div className="overlay" onClick={closeModal}></div>}
    </div>
  );
};

export default Modal;
