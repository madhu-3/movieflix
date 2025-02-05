import React from "react";

const Dialog = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-20">
      <div className="h-full w-1/2 bg-black relative">{children}</div>
    </div>
  );
};

export default Dialog;
