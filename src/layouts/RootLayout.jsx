import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ProfileProvider, useProfile } from "../components/ProfileContext";

import "../styles/RootLayout.css";

function RootLayout() {
  const { profile } = useProfile(); // Get updated profile info
  const [isScrolled, setIsScrolled] = useState(false); // Track navbar scroll state
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [showPopup, setShowPopup] = useState(false); // State for pop-up message

  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we're on the home or wallpaper page
 

  // Scroll effect to update navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search handlers
  const handleSearch = () => {
    if (location.pathname === "/cards") {
      // Show pop-up message if on the wallpaper page
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000); // Hide pop-up after 3 seconds
    } else {
      navigate(`/cards?search=${searchQuery}`);
      setSearchQuery(""); // Clear input after search
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Pop-up message */}
      {showPopup && (
  <div className="popup-message">
    <video className="popup__video" autoPlay muted loop playsInline style={{ playbackRate: 0.5 }}>
  <source src="./extra/popup.webm" type="video/webm" />
</video>

    <p className="popup__text">Use the Seachbar below, please!</p>
  </div>
)}


      <header className={`header__site ${isScrolled ? "scrolled" : ""}`}>
        <input type="checkbox" id="sidebar-active" />
        <label id="overlay" htmlFor="sidebar-active"></label>
        <nav className="app__nav animate__animated animate__fadeInDown">
          <NavLink to="/profile">
          <div className="nav-profile-image-container animate__animated  animate__fadeInDown">
  <div
    className="nav-profile-image"
    style={{ backgroundImage: `url(${profile.profilePicture})` }}
  ></div>
</div>

          </NavLink>

          <label
            htmlFor="sidebar-active"
            className="open-sidebar-btn animate__animated animate__fadeInRight"
          >
            <i className="bx bx-menu-alt-left ul__icon"></i>
          </label>
          <ul className="app__ul">
            <label htmlFor="sidebar-active" className="close-sidebar-btn">
              <i className="bx bx-x ul__icon"></i>
            </label>

            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/cards" className="nav-link">
              Wallpaper
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
            <button className="pixel__unique__btn">
              <NavLink to="/pixel" className="nav-link nav__pixel__link">
                Pixel AI
              </NavLink>
            </button>
          </ul>

          {/* Always render the search input */}
          <div className="homer__input animate__animated animate__fadeInDown">
            <input
              type="text"
              placeholder="Wallpaper 4K"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="homer__input__child"
            />
            <button className="homer__input__btn" onClick={handleSearch}>
              <i className="bx bx-search"></i>
            </button>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

const RootLayoutWithProfileProvider = () => (
  <ProfileProvider>
    <RootLayout />
  </ProfileProvider>
);

export default RootLayoutWithProfileProvider;
