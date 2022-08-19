import React from "react";
import { Suspense } from "react"
import { ThemeContext } from "../App";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Country.css"
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import BootstrapLoading from "./BootstrapLoading";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom"
import { RiEmotionSadLine } from "react-icons/ri";
import { BsArrowClockwise } from "react-icons/bs";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorBoundary";
import { Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const CountryProps = React.lazy(()=> import ("../Components/CountryProps"));
function Country() {
  const theme = useContext(ThemeContext);
  const [allCountry, setAllCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [spinLoad, setSpinLoad] = useState("");
  const [spinLoad2, setSpinLoad2] = useState("");
  const [select, setSelect] = useState([])
  const [disBtn, setDisBtn] = useState(true)
  const [limit, setLimit] = useState(50)
  const [error, setError] = useState("")
  let API_URL = "https://restcountries.com/v3.1/all"
  useEffect(() => {
    axios.get(`${API_URL}`)
      .then((response) => { setAllCountry(response.data);setSelect(response.data);setLoading(false);})
      .catch(() => { setLoading(true);setError(<Alert
        message="Error"
        description="İnternet bağlantınızı yoxlayın.."
        type="error"
        showIcon
        closable
        style={{width:"500px",margin:"0 auto"}}
      />)}); 
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
        setLimit(limit + 50);setSpinLoad2(false)
      }, 2000);
    }
    function handleSort1(){
      const sortedData = [...select].sort(
        (a,b)=> { return a.name.official > b.name.official ? 1 : -1 }
        // (a,b) => { return a.name.official.localeCompare(b.name.official) }
      )
      setSelect(sortedData)
    }
    function handleSort2(){
      const sortedData = [...select].sort(
        (a,b)=> { return a.name.official > b.name.official ? -1 : 1 }
        // (a,b) => { return a.name.official.localeCompare(b.name.official) }
      )
      setSelect(sortedData)
    }
    // if(Math.random() > 0.5){
    //   return new Error("test error boundary")
    // }
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
          <button onClick={handleSort1}>Sırala A-Z</button>
          <button onClick={handleSort2}>Sırala Z-A</button>
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
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{}}>
                  <Suspense fallback={<div><LoadingOutlined /></div>}>
                    <Link style={theme} to={`about/${item.cca3}`}>
                      <CountryProps
                        url={item.flags.png}
                        officialName={item.name.official}
                      />
                    </Link>
                  </Suspense>
                </ErrorBoundary>
              </div>
            );
          })
        }
      </div>
        <div>
          {
            select.length > limit &&
            <button onClick={loadMore}>
              {spinLoad2 && <span>Yüklənir..<BootstrapLoading /></span>}
              {!spinLoad2 && <span>Daha 50 Ölkə<BsArrowClockwise/></span>}
            </button>
          } 
        </div>
          <div className="error">
            <h2>{error}</h2>
          </div>
      </div>
    </div>
  );
}

export default Country;
