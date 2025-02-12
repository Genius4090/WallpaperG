import { FaLongArrowAltRight } from "react-icons/fa";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Home.css";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function Home() {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`2px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  return (
    <motion.section
      style={{ backgroundImage }} className="motion__bcg relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200">
      <div className="home__box">
    
      </div>
    <div className="home__second__box">
    <div>
        <h1 className="home__heading animate__animated animate__fadeInDown">Your Screen Deserves the Best</h1>
        <p className="home__description animate__animated animate__fadeInUp">
          Dive into our collection of premium 4K desktop wallpapers
        </p>
      
      </div>

      <div >
        <div className="buttons__box">
          <div className=" animate__animated animate__fadeInUp">
          <button className="know__more">
  <NavLink to="/about" className="know__more__text">
    Know More
  </NavLink>
</button>
          </div>
      
<div className="animate__animated animate__fadeInUp">
<motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.985 }}
            style={{ border, boxShadow }}
            className="explore__btn  "
          >   
            <NavLink to="/cards" className="explore__btn__text">Explore Now</NavLink>
            <FaLongArrowAltRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
</div>
          
        </div>





      </div>
    
    </div>
    <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
}

export default Home;
