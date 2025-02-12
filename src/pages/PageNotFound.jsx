import React from "react";
import "../styles/PageNotFound.css";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="pageNot__box">
      <video
        className="not__found__video"
        autoPlay
        muted
        loop
        playsInline
        style={{ playbackRate: 0.5 }}
      >
        <source src="./extra/pagenotfound.webm" type="video/webm" />
      </video>
      <p className="pagenot__popup__text">
        Beeep! The page you're looking for isn't answering... <br /> It might be busy,
        or it just doesn't exist!
      </p>
    <motion.button
  initial={{ scale: 1 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="pagenot__btn"
>
  <NavLink to="/" className="pagenot__btn__link">
    Go to Homepage
  </NavLink>
</motion.button>

    </div>
  );
};

export default PageNotFound;
