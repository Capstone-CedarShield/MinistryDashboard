import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, onClose, children }) => {
  const dialogRef = useRef();

  useEffect(() => {
    const modal = dialogRef.current;
    if (open && modal && !modal.open) {
      modal.showModal();
    }
    return () => {
      if (modal && modal.open) {
        modal.close();
      }
    };
  }, [open]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return createPortal(
    <>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleBackdropClick} />
      )}
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="bg-white rounded-xl shadow-lg flex items-center justify-center p-8"
      >
        <div className="p-8 w-full max-w-5xl text-center">
          {children}
        </div>
      </dialog>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
