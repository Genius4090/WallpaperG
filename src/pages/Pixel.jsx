import React, { useState } from "react";
import "../styles/Pixel.css";
import { useFetchPixel } from "../hooks/useFetchPixel";
import { motion } from "framer-motion";

function Pixel() {
  // Fetch data from data.json
  const { data: dataList, loading, error } = useFetchPixel("./data/pixel.json");

  // State for current slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = dataList?.length;

  // Handle previous and next slide
  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  // Open the ZIP file in a new tab
  const downloadZip = () => {
    window.open(
      "https://drive.google.com/file/d/1T85gXLmydm4L-KARxDNPbBoL_h87-yZZ/view?usp=drive_link",
      "_blank"
    );
  };

  return (
    <div className="pixel__father">
      <div className="container pixel__container">
        <div className="pixel__header__section">
          <div className="pixel__heading__box">
            <div className="pixel__text__box animate__animated animate__fadeInDown">
              <h1 className="pixel__heading__p1">AI-Generated</h1>
              <p className="pixel__heading__p2">Pixel Art 4K Wallpapers</p>
            </div>
            <video
              src="/extra/helloTraveler.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="pixel__video animate__animated animate__fadeIn"
            />
          </div>

          <div className="pixel__list__box animate__animated animate__fadeInUp">
            <ul className="pixel__list__ul__first">
              <li>• 31 AI-generated wallpapers</li>
              <li>• Free to Download</li>
              <li>• 3 Themes</li>
            </ul>
            <ul className="pixel__list__ul__second">
              <li>• 4K upscaled</li>
              <li>• Royalty-Free</li>
            </ul>
          </div>
        </div>

        <div className="pixel__main__section">
          <div className="pixel__download__box">
            <p className="pixel__download__text animate__animated animate__fadeInDown">
              Love Pixel Art? Grab This Exclusive Wallpaper Pack with One{" "}
              <button className="pixel__click__btn " onClick={downloadZip}>
                Click!
              </button>
            </p>
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadZip}
              className="download__btn animate__animated animate__fadeIn"
            >
              Download ZIP File
            </motion.button>
          </div>

          {/* Handle loading and error states */}
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Pixel;
