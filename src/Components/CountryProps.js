import React from "react";
import "./CountryProps.css";
import { motion } from "framer-motion";
import CountUp from "react-countup"
function CountryProps({ url, officialName,end }) {
  return (
    <motion.div
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 3 }}
      exit={{ opacity: 2, scale: 0 }}
      transition={{ duration: 1.2,delayChildren:0.3,staggerChildren:0.2 }}
      className="country-props"
    >
      <img src={url} />
      <div className="title-pop">
        <p>Ölkə: {officialName}</p>
        <CountUp 
            end={end}
            duration={3}
            separator="."
            // decimals={4}
            className="countUp"
            // decimal=","
            prefix="Ehali sayi: "
            // suffix=" left"
          />
        </div>
    </motion.div>
  );
}

export default CountryProps;
