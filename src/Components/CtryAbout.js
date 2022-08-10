import React from "react";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { ThemeContext } from "../App";
import "./CtryAbout.css";
import { IoMdReturnLeft } from "react-icons/io";
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
      <div>
        <Link style={theme} to="/"><IoMdReturnLeft />Geri Dön</Link>
      </div>
      {
       loading === true ? <Spin className="load" size="large" /> : select.filter((item) => item.cca3 === id).map((data,index) => {
            return (
      <div key={index}>

          <div class="accordion accordion-flush container-sm" id="accordionFlushExample">
              <div><span type="header">{data.name.official}</span></div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button style={theme} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Paytaxt
                </button>
              </h2>
              <div style={theme} id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div><span type="capital">{data.capital}</span></div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button style={theme} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Bayraq
                </button>
              </h2>
              <div style={theme} id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <img style={{width:"200px"}} src={data.flags.png} />
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingThree">
                <button style={theme} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Gerb
                </button>
              </h2>
              <div style={theme} id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div><img style={{width:"100px"}} src={data.coatOfArms.png} /></div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingFour">
                <button style={theme} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  Əhali
                </button>
              </h2>
              <div style={theme} id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                <div><span type="population">{data.population} </span></div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingSix">
                <button style={theme} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                  Bölgə
                </button>
              </h2>
              <div style={theme} id="flush-collapseSix" class="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
                <div><span type="region">{data.region} </span></div>
              </div>
            </div>
              
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingSeven">
                <button style={theme} class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                  Sərhəd Ölkə
                </button>
              </h2>
              <div style={theme} id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                <div className="border-Country">
                  {
                    data.borders.map(
                      (item,index)=>{ return <Link key={index} to={`/about/${item}`}>{item}</Link> }
                    )
                  }
                </div>
              </div>
            </div>
          </div>
       </div>
            );
          })
        }
    </div>
  );
}

export default CtryAbout;