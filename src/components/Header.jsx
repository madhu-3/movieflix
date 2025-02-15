import React, { useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";
import APPLOGO from "../assets/movieflixlogo.png";
import { Link } from "react-router-dom";
import {
  faArrowRightFromBracket,
  faBars,
  faHouse,
  faMagnifyingGlass,
  faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const user = useSelector((state) => state.userConfig.user);
  const [showMenu, setShowMenu] = useState(false);
  const isBrowse = window.location.href.includes("browse");
  const { t } = useTranslation();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between h-16 bg-black brightness-75 z-20 px-3">
      <Link to={"/"}>
        <img alt="logo" src={APPLOGO} className="w-full h-full" />
      </Link>
      {!user && <LanguageSelect />}
      {user && (
        <>
          <div className="hidden md:flex justify-between items-center gap-2">
            <Link to={isBrowse ? "/gptsearch" : "/browse"}>
              <button className="bg-purple-400 p-2 flex items-center gap-1 rounded-md hover:opacity-80">
                {isBrowse ? (
                  <>
                    <FontAwesomeIcon icon={faWandSparkles} />
                    <p>GPT Search</p>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </>
                ) : (
                  <p>Browse</p>
                )}
              </button>
            </Link>
            <LanguageSelect />
            <img alt="userlogo" src={user?.photoURL} className="w-10 h-10" />
            <button className="text-red-800 mr-10" onClick={handleLogout}>
              {t("header.signOut")}
            </button>
          </div>
          <div className="flex gap-2 md:hidden relative my-auto">
            <LanguageSelect />
            <img
              alt="userlogo"
              src={user?.photoURL}
              className="w-10 h-10"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="absolute top-12 right-0 mt-3 w-40 bg-white shadow-lg p-4">
                <div className="absolute top-[-8px] right-[20px] w-4 h-4 bg-white rotate-45"></div>
                <div className="flex flex-col">
                  <Link to={isBrowse ? "/gptsearch" : "/browse"}>
                    {isBrowse ? (
                      <button className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <p className="text-black font-semibold">GPT Search</p>
                      </button>
                    ) : (
                      <button className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faHouse} />
                        <p className="text-black font-semibold">Browse</p>
                      </button>
                    )}
                  </Link>
                  <button
                    className="flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <p className="text-black font-semibold">
                      {t("header.signOut")}
                    </p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
