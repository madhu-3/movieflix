import React from "react";
import ReactDOM from "react-dom";

const Dialog = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-20">
      <div className="h-full w-1/2 bg-black relative">{children}</div>
    </div>,
    document.getElementById("dialog-root")
  );
};

export default Dialog;
