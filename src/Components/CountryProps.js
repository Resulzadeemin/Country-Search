import React from "react";
import "./CountryProps.css";
function CountryProps({ url, officialName }) {
  return (
    <div className="country-props">
      <img src={url} />
      <p>Ölkə: {officialName}</p>      
    </div>
  );
}

export default CountryProps;
