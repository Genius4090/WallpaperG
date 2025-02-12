import React, { useState, useRef, useEffect } from "react";
import { useProfile } from "./ProfileContext";
import "../styles/ProfileModal.css";
import { motion } from "framer-motion";

const ProfileModal = ({ onClose }) => {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [profilePicture, setProfilePicture] = useState(profile.profilePicture);
  const [description, setDescription] = useState(profile.description);
  const [isClosing, setIsClosing] = useState(false); // Track closing state
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Convert image to base64
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleNameChange = (e) => {
    const text = e.target.value;

    // Limit the input to 22 characters
    if (text.length <= 22) {
      setName(text);
    }
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;

    // Limit the input to 60 characters
    if (text.length <= 60) {
      setDescription(text);
    }
  };

  const handleSave = () => {
    // Check if the name or description exceeds the max length
    if (name.length > 22 || description.length > 60) {
      alert("Name cannot have more than 22 characters and description cannot exceed 60 characters.");
      return; // Prevent saving if either exceeds max length
    }

    updateProfile({ name, profilePicture, description });
    setIsClosing(true); // Trigger close animation
  };

  const handleClose = () => {
    setIsClosing(true); // Trigger close animation
  };

  useEffect(() => {
    if (isClosing) {
      // Wait for the animation to finish before closing
      const timeout = setTimeout(() => {
        onClose();
      }, 300); // Match the duration of the fade-out animation

      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className={`modal-content ${
          isClosing
            ? "animate__animated animate__fadeOutUp"
            : "animate__animated animate__fadeInDown"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="profile__modal__heading">Edit Profile</h2>
        <div className="modal-profile-image-box">
          <div className="profile-image-container">
            <img
              src={profilePicture || "./default-avatar.png"}
              alt="Profile Preview"
              className="profile-preview-image"
            />
            <span
              className="pen-icon"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="pen__icon__icon__box">
                <i className="ri-pencil-fill cl pen__icon__icon"></i>
              </div>
            </span>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden-file-input"
            />
          </div>
        </div>

        <label className="profile__modal__input__label">
          <input
            className="profile__modal__input"
            type="text"
            value={name}
            onChange={handleNameChange} // Use the updated name handler
          />
        </label>
        <label className="profile__modal__bio__label">
          <textarea
            value={description}
            onChange={handleDescriptionChange} // Use the updated description handler
            placeholder="Enter a brief description"
            className="profile__modal__textarea"
          />
        </label>

        <div className="profile__modal__btn__box">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="profile__modal__save__btn"
            onClick={handleSave}
          >
            Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="profile__modal__close__btn"
            onClick={handleClose}
          >
            Close
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
