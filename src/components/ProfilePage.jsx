import React, { useState, useEffect, Suspense } from "react";
import { useProfile } from "./ProfileContext";
import "../styles/ProfilePage.css";
import { FaPen, FaTrashAlt, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
// Lazy-load ProfileModal
const ProfileModal = React.lazy(() => import("./ProfileModal"));

import LazyBackground from './LazyBackground'; // Import the component
function ProfilePage() {
  const { profile } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectedImages, setCollectedImages] = useState(() => {
    const savedImages = localStorage.getItem("collectedImages");
    return savedImages ? JSON.parse(savedImages) : [];
  });

  const imagesPerPage = 9;
  const [isEditing, setIsEditing] = useState(false);
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);
  const [selectedBg, setSelectedBg] = useState(() => {
    const savedBg = localStorage.getItem("profileBackground");
    return savedBg || "./wallpapers/bcg3.svg";
  });

  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [isBgModalClosing, setIsBgModalClosing] = useState(false); // Added state for closing modal

  // Retrieve the last selected page from localStorage
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  // Save current page to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const removeImageFromCollection = (image) => {
    const newCollectedImages = collectedImages.filter((img) => img.orig !== image.orig);
    setCollectedImages(newCollectedImages);
    localStorage.setItem("collectedImages", JSON.stringify(newCollectedImages));

    const newTotalPages = Math.ceil(newCollectedImages.length / imagesPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;

  const reversedImages = [...collectedImages].reverse();
  const currentImages = reversedImages.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setIsEditButtonClicked(!isEditButtonClicked);
  };

  const openBgModal = () => setIsBgModalOpen(true);
  const closeBgModal = () => setIsBgModalClosing(true); // Trigger closing with animation

  const changeBackground = (bgImage) => {
    setSelectedBg(bgImage);
    localStorage.setItem("profileBackground", bgImage);
    closeBgModal(); // Close modal after changing background
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("bg-modal")) {
      closeBgModal(); // Close modal if clicked outside
    }
  };

  const handleDownload = (image) => {
    const fileName = image.title.split(" ").join("_") + ".png"; // Use title for filename with .png extension
    
    fetch(image.orig)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => console.error('Download error:', error));
  };
  

  const handleEnlarge = (image) => {
    window.open(image.orig, "_blank");
  };

  // Handle modal closing animation
  useEffect(() => {
    if (isBgModalClosing) {
      const timeout = setTimeout(() => {
        setIsBgModalOpen(false);
        setIsBgModalClosing(false);
      }, 300); // Match the duration of the fade-out animation

      return () => clearTimeout(timeout);
    }
  }, [isBgModalClosing]);

  const modalAnimationClass = isBgModalClosing ? "animate__fadeOutUp" : "animate__fadeInDown";

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile__box animate__animated animate__fadeInDown">
          <div className="profile-card" style={{ backgroundImage: `url(${selectedBg})` }}></div>
          <button className="background__edit__btn" onClick={openBgModal}>
            <FaPen />
          </button>
          <div className="profile__layout">
  <div className="profile-image" style={{ backgroundImage: `url(${profile.profilePicture})` }} />
  <h2 className="profile__name">{profile.name}</h2>
  <p className="profile__description">{profile.description}</p>
  <div className="profile__change__box">
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={openModal}
      className="profile__change__btn"
    >
      Change Profile
    </motion.button>
  </div>
</div>

        </div>

        <div className="collection-section">
          <div className="edit__box">
            <div className="collection-counter animate__animated animate__fadeInUp">
              <img src="./icons/collection__icon.svg" alt="" className="collection__image__icon" />
              <p className="collection__text">Saved</p>
              {collectedImages.length}
            </div>
            <div className="edit-icon animate__animated animate__fadeInUp">
              <motion.button
                className="profile__edit__btn"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleEdit}
              >
                {isEditButtonClicked ? <FaCheck /> : <img className="collection__edit__icon" src="./icons/edit__icon.svg" />}
              </motion.button>
            </div>
          </div>

        

<ul className="collected_ul">
  {currentImages.map((image, index) => (
    <div className="collected_card" key={index}>
      <LazyBackground
        className="image-container animate__animated animate__fadeIn"
        src={image.orig}
      >
        <div className="image-buttons">
          <button onClick={() => handleDownload(image)} className="image__btn__download">
            <i className="ri-download-2-line profile__image__download__icon"></i>Download
          </button>
          <button onClick={() => handleEnlarge(image)} className="image__btn__enlarge">
            <i className="bx bx-expand profile__image__enlarge__icon"></i>Enlarge
          </button>
        </div>
        {isEditing && (
          <button
            className="remove-btn"
            onClick={(e) => {
              e.stopPropagation();
              removeImageFromCollection(image);
            }}
          >
            <FaTrashAlt />
          </button>
        )}
      </LazyBackground>
    </div>
  ))}
</ul>


          <div className="next__page">
            {collectedImages.length > imagesPerPage && (
              <div>
                <motion.button
                  className="pagination__btn"
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Prev
                </motion.button>

                {Array.from({ length: Math.ceil(collectedImages.length / imagesPerPage) }, (_, index) => (
                  <motion.button
                    key={index}
                    className={`pagination__btn ${currentPage === index + 1 ? "active" : ""}`}
                    onClick={() => paginate(index + 1)}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index + 1}
                  </motion.button>
                ))}

                <motion.button
                  className="pagination__btn"
                  disabled={currentPage === Math.ceil(collectedImages.length / imagesPerPage)}
                  onClick={() => paginate(currentPage + 1)}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {isBgModalOpen && (
          <div className="bg-modal" onClick={handleOutsideClick}>
            <div className={`bg-modal-content animate__animated ${modalAnimationClass}`}>
              <div className="bg__modal__first__box">
                <h3 className="bg__modal__first__box__text">Customize Background</h3>
                <button onClick={closeBgModal}><i className="ri-close-line"></i></button>
              </div>
              <div className="bg-options">
                <img
                  src="./wallpapers/bcg1.svg"
                  alt="Background 1"
                  onClick={() => changeBackground("./wallpapers/bcg1.svg")}
                  className="bg-option"
                />
                <img
                  src="./wallpapers/bcg2.svg"
                  alt="Background 2"
                  onClick={() => changeBackground("./wallpapers/bcg2.svg")}
                  className="bg-option"
                />
                <img
                  src="./wallpapers/bcg3.svg"
                  alt="Background 3"
                  onClick={() => changeBackground("./wallpapers/bcg3.svg")}
                  className="bg-option"
                />
              </div>
            </div>
          </div>
        )}

        <Suspense fallback={<div>Loading...</div>}>
          {isModalOpen && <ProfileModal onClose={closeModal} />}
        </Suspense>
      </div>
    </div>
  );
}

export default ProfilePage;
