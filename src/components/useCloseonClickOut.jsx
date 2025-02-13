import React, { useEffect } from "react";

const useCloseonClickOut = (ref, handleClose) => {
  useEffect(() => {
    const handleCloseDropDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleCloseDropDown);

    return () => {
      document.removeEventListener("mousedown", handleCloseDropDown);
    };
  }, []);
};

export default useCloseonClickOut;
