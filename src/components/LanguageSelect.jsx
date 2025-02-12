import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelect = ({ handleLangClose }) => {
  const { i18n } = useTranslation();

  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang);
    handleLangClose();
  };
  return (
    <div className="text-white h-full w-full flex flex-col justify-center gap-6 p-4">
      <h1 className="text-xl">
        Choose Language in which you want the app to display
      </h1>
      <div className="flex justify-center">
        <button
          className={`p-2 border-2 border-red-400 transition-all duration-500 hover:bg-white hover:text-black ${
            i18n.language === "en" ? "bg-purple-500" : ""
          }`}
          onClick={() => handleLangChange("en")}
        >
          English
        </button>
        <button
          className={`p-2 border-2 border-red-400 border-l-0 transition-all duration-500 hover:bg-white hover:text-black ${
            i18n.language === "hi" ? "bg-purple-500" : ""
          }`}
          onClick={(e) => handleLangChange("hi")}
        >
          Hindi
        </button>
      </div>
    </div>
  );
};

export default LanguageSelect;
