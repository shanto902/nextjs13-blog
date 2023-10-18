"use client";
import {
  Lightbulb,
  LightbulbIcon,
  MoonIcon,
  SearchIcon,
  X,
} from "lucide-react";
import { useState } from "react"; // Import useState hook
import LangSwitcher from "../elements/LangSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const SearchComponent = ({ locale }: { locale: string }) => {
  const [isInputFocused, setInputFocused] = useState(false); // Initialize state to track input focus

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  return (
    <div className="flex flex-nowrap gap-2 items-center ">
      <form className="border-2 border-neutral rounded-full relative hover:text-red-600 ">
        <input
          type="text"
          name="search"
          placeholder="Search"
          className={`bg-transparent px-5 py-3 text-neutral w-10 h-10   rounded-full focus:outline-0 focus:w-full focus:pl-10 transition-all duration-300 ${
            isInputFocused ? "w-full" : ""
          }`} // Toggle w-full class based on input focus
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <SearchIcon className=" absolute z-[-10] top-2 left-2" />
      </form>
      <div
        className={`flex gap-2 h-full ${
          isInputFocused ? "opacity-0 hidden" : "opacity-100"
        } transition-opacity duration-300`}
      >
        {" "}
        {/* Toggle opacity class based on input focus */}
        <LangSwitcher locale={locale} />
       <ThemeSwitcher />
      </div>
    </div>
  );
};

export default SearchComponent;
