import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";
import APPLOGO from "../assets/tflix.jpeg";

const Header = () => {
  const user = useSelector((state) => state.userConfig.user);
  const { t } = useTranslation();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between h-16 bg-black brightness-75 z-20">
      <img alt="logo" src={APPLOGO} />
      {!user && <LanguageSelect />}
      {user && (
        <div className="flex justify-between items-center gap-2">
          <LanguageSelect />
          <img alt="userlogo" src={user?.photoURL} className="w-10 h-10" />
          <button className="text-red-800 mr-10" onClick={handleLogout}>
            {t("header.signOut")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
