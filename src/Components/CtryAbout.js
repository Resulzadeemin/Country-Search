import React from "react";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import {ThemeContext} from "../App"
function CtryAbout() {
  const theme = useContext(ThemeContext)
  const [select, setSelect] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  let API_URL = "https://restcountries.com/v3.1/all"
  useEffect(() => {
    axios.get(`${API_URL}`)
      .then((response) => {setSelect(response.data);setLoading(false)})
      .catch((error) => { alert("connect problem..");});
  }, [id]);
  return (
    <div style={theme}>
      <Link style={theme} to="/"> Back to home </Link>
      {
       loading === true ? <Spin className="load" size="large" /> : select.filter((item) => item.cca3 === id).map((data,index) => {
            return (
              <div key={index}>
                <img src={data.flags.png} />
                <div><span> Capital: {data.capital} </span></div>
                <div><span> CoatOfArms: <img style={{width:"50px"}} src={data.coatOfArms.png} /></span></div>
                <div><span> Population: {data.population} </span></div>
                <div><span> Offical Name: {data.name.official} </span></div>
                <div><span> Region: {data.region} </span></div>
                <div>
                  <span>Border Countries: </span>
                  {
                    data.borders.map(
                      (item,index)=>{ return <Link key={index} to={`/about/${item}`}>{item + ","}</Link> }
                    )
                  }
                </div>
              </div>
            );
          })
        }
    </div>
  );
}

export default CtryAbout;