import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { useState, useEffect } from "react";
import axios from "axios";
import CountryProps from "./CountryProps";
import "./Country.css"
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import BootstrapLoading from "./BootstrapLoading";
import { GoSearch } from "react-icons/go";
function Country() {
  const theme = useContext(ThemeContext);
  const [allCountry, setAllCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [spinLoad, setSpinLoad] = useState("");
  const [select,setSelect] = useState([])
  const [end,setEnd] = useState("")
  const [disBtn,setDisBtn] = useState(true)

  let API_URL = "https://restcountries.com/v3.1/all"
  useEffect(() => {
    axios.get(`${API_URL}`)
      .then((response) => { setAllCountry(response.data);setSelect(response.data);setLoading(false);})
      .catch((error) => { alert("connect problem..");});
  }, []);

  const selectCountry = (cat) => {
    const result = allCountry.filter((e) => {
      return e.region === cat;
    });
    setSelect(result);
  };

  const srchCountry = () => {
    setSpinLoad(true)
    setTimeout(() => {
      const results = allCountry.filter((a)=>a.name.official.toLowerCase().includes(search.toLowerCase()));setSpinLoad(false)
      setSelect(results)
      setSearch("")
    }, 2000);
  }
  const inputHandler = (e) => {
    setSearch(e.target.value);
    setEnd(e.target.value)
    if(e.target.value.length < 1){
      setDisBtn(true)
    }
    else{
      setDisBtn(false)
    }
  };
  return (
    <div style={theme}>
        <div className="category-btn">
            <button onClick={()=>setSelect(allCountry)}>All Country</button>
            <button onClick={()=>selectCountry("Europe")}>Europe</button>
            <button onClick={()=>selectCountry("Asia")}>Asia</button>
            <button onClick={()=>selectCountry("Africa")}>Africa</button>
            <button onClick={()=>selectCountry("Americas")}>Americas</button>
        </div>

        <div className="inp-btn">
          <input
            style={theme}
            type="text"
            onChange={inputHandler}
            value={search}
            placeholder="srch country.."
          />
          <button type="submit" onClick={srchCountry} disabled={disBtn}>
            {spinLoad && <BootstrapLoading />}
            {!spinLoad && <span>Search Country<GoSearch className="icon-srch" /></span>}
          </button>
      </div>

      <div className="country">
        {
          loading == true ? <Spin className="load" size="large" /> : select.length == 0 ? <div className="not-found">{`"${end}" not found`}</div> : select.map((item, index) => {
            return (
              <div key={index}>
                <CountryProps
                  url={item.flags.png}
                  officialName={item.name.official}
                  capital={item.capital}
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Country;
