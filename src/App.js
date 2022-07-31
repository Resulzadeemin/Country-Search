import React from "react";
import "./App.css";
import Country from "./Components/Country";
import { Theme } from "./Context/Theme";
import { useState, useEffect } from "react";
import { Switch } from "antd";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
function App() {
  const [tema, setTema] = useState(localStorage.tema ?? "dark");

  useEffect(() => {
    localStorage.setItem("tema", tema);
  }, [tema]);

  const changeTema = () => {
    if (tema === "dark") {
      setTema("light");
    } else {
      setTema("dark");
    }
  };
  return (
    <div className="App">
      <b>{tema === "dark" ? "Dark Mode" : "Light Mode"}</b>
      <Switch
        onClick={changeTema}
        checkedChildren={<BsFillMoonFill />}
        unCheckedChildren={<BsFillSunFill />}
        defaultChecked={tema === "dark" ? true : false}
      />
      <ThemeContext.Provider value={Theme[tema]}>
        <Country />
      </ThemeContext.Provider>
    </div>
  );
}
export const ThemeContext = React.createContext();
export default App;
