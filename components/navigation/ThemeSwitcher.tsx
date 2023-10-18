import { LightbulbIcon, MoonIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Store the theme preference in localStorage
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    // On component mount, retrieve the theme from localStorage (if set)
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }

    // Apply the theme to the HTML element
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div className="bg-primary border-neutral border-2 w-20 h-10 rounded-3xl flex items-center justify-around text-neutral">
      <button
        disabled={theme === "light" && true}
        onClick={toggleTheme}
        className={`${
          theme === "light"
            ? " cursor-default "
            : "cursor-pointer  bg-white text-black"
        } w-8 h-8 text-sm font-bold flex justify-center items-center  rounded-full p-1`}
      >
        <LightbulbIcon />
      </button>
      <div className="w-[1px] bg-neutral h-7"></div>
      <button
        disabled={theme === "dark" && true}
        onClick={toggleTheme}
        className={`${
          theme === "dark"
            ? " cursor-default "
            : "cursor-pointer  bg-black text-white"
        }  w-8 h-8  text-sm font-bold flex justify-center items-center  rounded-full p-1`}
      >
        <MoonIcon />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
