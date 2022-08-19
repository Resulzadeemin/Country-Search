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
import { FcInfo } from "react-icons/fc";
import { Alert } from 'antd';
import { Button, Modal } from 'antd';
function CtryAbout() {
  const theme = useContext(ThemeContext)
  const [select, setSelect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")
  const [loading2, setLoading2] = useState(false);
  const [visible, setVisible] = useState(false); 

  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
      setVisible(false);
    }, 3000);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const { id } = useParams();
  let API_URL = "https://restcountries.com/v3.1/all"
  useEffect(() => {
    axios.get(`${API_URL}`)
      .then((response) => {setSelect(response.data);setLoading(false)})
      .catch(() => { setLoading(true);setError(<Alert
        message="Error"
        description="İnternet bağlantınızı yoxlayın.."
        type="error"
        showIcon
        closable
        style={{width:"500px",margin:"0 auto"}}
      />)}); 
  }, [id]);
  return (
    <div style={theme}>
      <div className="return-home">
        <Link style={theme} to="/"><IoMdReturnLeft className="return-icon" />Geri Dön</Link>
      </div>
      {
       loading === true ? <Spin className="load" size="large" /> : select.filter((item) => item.cca3 === id).map((data,index) => {
            return (
      <div key={index}>

          <div className="accordion accordion-flush container-sm" id="accordionFlushExample">
            <div className="name-modal">
              <div>
                <span type="header">{data.name.official}</span>
              </div>
                <div>
                  <Button type="primary" onClick={showModal}>Vacib Qeyd</Button>
                    <Modal
                      visible={visible}
                      title={<div><span type="header"><FcInfo className="info-icon" />{data.name.official},sərhəd ölkələrin sayı: {data.borders?.length}</span></div>}
                      onOk={handleOk}
                      onCancel={handleCancel} footer={[ <Button key="back" onClick={handleCancel}>Geri Dön</Button>,
                        <Button key="link" href={data.maps.googleMaps} type="primary" loading={loading2} onClick={handleOk}>
                          Google Maps-da axtar
                        </Button>,
                      ]}>
                      <p><b>Sərhəd ölkələr</b> bölməsi boşdursa,ölkənin sərhəd ölkəsi yoxdur.Google Maps-da ətraflı axtarış edə bilərsiniz..</p>
                  </Modal>
                </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button style={theme} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Paytaxt
                </button>
              </h2>
              <div style={theme} id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div><span type="capital">{data.capital}</span></div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button style={theme} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Bayraq
                </button>
              </h2>
              <div style={theme} id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <img style={{width:"200px"}} src={data.flags.png} />
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button style={theme} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Gerb
                </button>
              </h2>
              <div style={theme} id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div><img style={{width:"100px"}} src={data.coatOfArms.png} /></div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingFour">
                <button style={theme} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  Əhali
                </button>
              </h2>
              <div style={theme} id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                <div><span type="population">{data.population} </span></div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingSix">
                <button style={theme} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                  Bölgə
                </button>
              </h2>
              <div style={theme} id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
                <div><span type="region">{data.region} </span></div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingSeven">
                <button style={theme} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                  Ərazi
                </button>
              </h2>
              <div style={theme} id="flush-collapseSeven" className="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                <div><span type="region">{data.area + " km2"} </span></div>
              </div>
            </div>
              
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingEight">
                <button style={theme} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                Müstəqil
                </button>
              </h2>
              <div style={theme} id="flush-collapseEight" className="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
                <div><span type="region">{data.independent === true ? "Hə" : " Yox"} </span></div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingNine">
                <button style={theme} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
                  Sərhəd Ölkələr
                </button>
              </h2>
              <div style={theme} id="flush-collapseNine" className="accordion-collapse collapse" aria-labelledby="flush-headingNine" data-bs-parent="#accordionFlushExample">
                <div className="border-Country">
                  {
                    
                     data.borders?.map(
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
          <div className="error">
            <h2>{error}</h2>
          </div>
    </div>
  );
}

export default CtryAbout;