import React from "react";
import { ThemeContext } from "../App";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import CountryProps from "./CountryProps";
import "./Country.css"
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import BootstrapLoading from "./BootstrapLoading";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom"
import { RiEmotionSadLine } from "react-icons/ri";
import { BsArrowClockwise } from "react-icons/bs";
function Country() {
  const theme = useContext(ThemeContext);
  const [allCountry, setAllCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [spinLoad, setSpinLoad] = useState("");
  const [spinLoad2, setSpinLoad2] = useState("");
  const [select, setSelect] = useState([])
  const [disBtn, setDisBtn] = useState(true)
  const [limit, setLimit] = useState(10)

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
  const inputHandler = (e) => {
    setSearch(e.target.value);
  }
  const srchCountry = () => {
    setSpinLoad(true)
    setTimeout(() => {
      const results = allCountry.filter((a)=>a.name.official.toLowerCase().includes(search.toLowerCase()));setSpinLoad(false)
      setSelect(results)
      setSearch("")
    }, 2000);
  }
    setTimeout(() => {
      if(search.length < 1){
        setDisBtn(true)
      }
      else{
        setDisBtn(false)
      } 
    }, 100);

    const loadMore = () =>{
      setSpinLoad2(true)
      setTimeout(() => {
        setLimit(limit + 5);setSpinLoad2(false)
      }, 2000);
    }
  return (
    <div style={theme}>
      <div className="container-sm">
        <div className="category-btn">
            <button onClick={()=>setSelect(allCountry)}>Bütün ölkələr</button>
            <button onClick={()=>selectCountry("Europe")}>Avropa</button>
            <button onClick={()=>selectCountry("Asia")}>Asia</button>
            <button onClick={()=>selectCountry("Africa")}>Afrika</button>
            <button onClick={()=>selectCountry("Americas")}>Amerika</button>
        </div>

        <div className="inp-btn">
          <input
            style={theme}
            type="text"
            onChange={inputHandler}
            value={search}
            placeholder="ölkə axtarın.."
          />
          <button type="submit" onClick={srchCountry} disabled={disBtn}>
            {spinLoad && <BootstrapLoading />}
            {!spinLoad && <span>Axtarış<GoSearch className="icon-srch" /></span>}
          </button>
      </div>

      <div className="country">
        {
          loading == true ?
          <Spin className="load" size="large" /> :
          select.length == 0 ?
          <div className="not-found">{`Axtarış Üzrə Nəticə Yoxdur..`}<RiEmotionSadLine className="not-icon"/></div> :
          select.slice(0,limit).map((item, index) => {
            return (
              <div key={index}>
                <Link style={theme} to={`about/${item.cca3}`}>
                  <CountryProps
                    url={item.flags.png}
                    officialName={item.name.official}
                  />
                </Link>
              </div>
            );
          })
        }
      </div>
        <div>
          <button onClick={loadMore}>
            {spinLoad2 && <span>Yüklənir..<BootstrapLoading /></span>}
            {!spinLoad2 && <span>Daha Çox<BsArrowClockwise/></span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Country;
