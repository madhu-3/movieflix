import { faChevronDown, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useCloseonClickOut from "./useCloseonClickOut";

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [toggleLang, setToggleLang] = useState(false);
  const langRef = useRef(null);

  useCloseonClickOut(langRef, () => setToggleLang(false));

  const handleLangChange = (e) => {
    const lang = e.target.dataset.val;
    i18n.changeLanguage(lang);
    setToggleLang(false);
  };
  return (
    <div className="relative my-auto" ref={langRef}>
      <button
        onClick={() => setToggleLang(!toggleLang)}
        className="bg-white p-3 border border-black rounded-md"
      >
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faGlobe} />
          <p>{i18n.language === "en" ? "English" : "Hindi"}</p>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </button>
      {toggleLang && (
        <ul
          onClick={handleLangChange}
          className="list-none absolute bg-white p-2 w-full cursor-pointer"
        >
          <li data-val="en">English</li>
          <li data-val="hi">Hindi</li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelect;
