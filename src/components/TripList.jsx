
import React, {
  useState,
  useEffect,
  useMemo,
  Suspense,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import "../styles/TripList.css";
import { useFetch } from "../hooks/useFetch";
import ScrollToTop from "./ScrollToTop";
const Modal = React.lazy(() => import("./Modal"));
import LazyBackground from './LazyBackground'; // Adjust the import path as necessary

function TripList() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [filterGenre, setFilterGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState(
    new URLSearchParams(search).get("search") || ""
  );
  const { data: list, loading, error } = useFetch("/data/data.json");
  const [collectedImages, setCollectedImages] = useState(() => {
    const savedImages = localStorage.getItem("collectedImages");
    return savedImages ? JSON.parse(savedImages) : [];
  });

  const [visibleCount, setVisibleCount] = useState(12);
  const [randomizeFlag, setRandomizeFlag] = useState(false); // New state for randomize flag
  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );

  useEffect(() => {
    return () => debouncedSearch.cancel(); // Cleanup debounced search on component unmount
  }, [debouncedSearch]);

  useEffect(() => {
    if (downloadLink) {
      const link = document.createElement("a");
      link.href = downloadLink.image;
      link.download = downloadLink.fileName; // Use the custom filename
      link.click();
      setDownloadLink(null); // Clear the download link state after download
    }
  }, [downloadLink]);
  

  const openModal = (item) => {
    setModal(true);
    setSelected(item);
  };

  const closeModal = () => {
    setModal(false);
    setSelected(null); // Clear selected item when modal is closed
  };

  const filteredList = useMemo(() => {
    if (!list) return [];

    let filtered = list
      .filter((trip) => {
        // Normalize trip.genre to an array if it's a string
        const genres = Array.isArray(trip.genre) ? trip.genre : [trip.genre];

        // Filter based on genre, handling 'All' and ensuring genre is an array
        return filterGenre === "All" || genres.includes(filterGenre);
      })
      .filter(
        (trip) =>
          trip.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false
      );

    if (randomizeFlag) {
      // Shuffle the entire filtered list if randomizeFlag is true
      filtered = filtered.sort(() => Math.random() - 0.5);
    }

    return filtered;
  }, [list, filterGenre, searchQuery, randomizeFlag]); // Include randomizeFlag in dependencies

  const displayedList = useMemo(
    () => filteredList.slice(0, visibleCount),
    [filteredList, visibleCount]
  );

  useEffect(() => {
    if (searchQuery) {
      navigate(`?search=${searchQuery}`);
    } else {
      navigate(`?`);
    }
  }, [searchQuery, navigate]);

  const handleAddToCollection = (image) => {
    const newCollectedImages = [...collectedImages, image];
    setCollectedImages(newCollectedImages);
    localStorage.setItem("collectedImages", JSON.stringify(newCollectedImages)); // Save to localStorage
  };

  const handleRandomize = () => {
    setRandomizeFlag((prevFlag) => !prevFlag); // Toggle randomizeFlag
  };

  return (
    <div>
      <ScrollToTop />
      <div className="triplist__hero">
        <div className="container triplist__hero__container">
          <h1 className="triplist__hero__heading animate__animated animate__fadeInUp">
            Find Your Perfect Wallpaper Today
          </h1>
          <div className="triplist__search__box">
            <input
              type="text"
              className="triplist__search__input"
              placeholder="Search ..."
              onChange={(e) => {
                setSearchQuery(e.target.value);
                debouncedSearch(e.target.value);
              }}
              value={searchQuery}
            />
            <button className="triplist__input__btn">
              <i className="hero__search_icon bx bx-search"></i>
            </button>
          </div>

          <div className="btn__box animate__animated animate__fadeIn">
            <button
              className={`filter_btn ${filterGenre === "All" ? "active" : ""}`}
              onClick={() => setFilterGenre("All")}
            >
              All
            </button>
            <button
              className={`filter_btn ${
                filterGenre === "Anime" ? "active" : ""
              }`}
              onClick={() => setFilterGenre("Anime")}
            >
              Anime
            </button>
            <button
              className={`filter_btn ${filterGenre === "Art" ? "active" : ""}`}
              onClick={() => setFilterGenre("Art")}
            >
              Art
            </button>
            <button
              className={`filter_btn ${filterGenre === "4K" ? "active" : ""}`}
              onClick={() => setFilterGenre("4K")}
            >
              4K
            </button>
            <button onClick={handleRandomize} className="filter_btn reload__btn"><i class='bx bx-repost'></i></button>
          </div>
        
        </div>
      </div>

      <div className="container">
        <div className="grid-container">
          {loading && (
            <div>
              <svg
                height="108px"
                width="108px"
                viewBox="0 0 128 128"
                className="loader"
              >
                <defs>
                  <clipPath id="loader-eyes">
                    <circle
                      transform="rotate(-40,64,64) translate(0,-56)"
                      r="8"
                      cy="64"
                      cx="64"
                      className="loader__eye1"
                    ></circle>
                    <circle
                      transform="rotate(40,64,64) translate(0,-56)"
                      r="8"
                      cy="64"
                      cx="64"
                      className="loader__eye2"
                    ></circle>
                  </clipPath>
                  <linearGradient y2="1" x2="0" y1="0" x1="0" id="loader-grad">
                    <stop stopColor="#000" offset="0%"></stop>
                    <stop stopColor="#fff" offset="100%"></stop>
                  </linearGradient>
                  <mask id="loader-mask">
                    <rect
                      fill="url(#loader-grad)"
                      height="128"
                      width="128"
                      y="0"
                      x="0"
                    ></rect>
                  </mask>
                </defs>
                <g
                  strokeDasharray="175.93 351.86"
                  strokeWidth="12"
                  strokeLinecap="round"
                >
                  <g>
                    <rect
                      clipPath="url(#loader-eyes)"
                      height="64"
                      width="128"
                      fill="hsl(193,90%,50%)"
                    ></rect>
                    <g stroke="hsl(193,90%,50%)" fill="none">
                      <circle
                        transform="rotate(180,64,64)"
                        r="56"
                        cy="64"
                        cx="64"
                        className="loader__mouth1"
                      ></circle>
                      <circle
                        transform="rotate(0,64,64)"
                        r="56"
                        cy="64"
                        cx="64"
                        className="loader__mouth2"
                      ></circle>
                    </g>
                  </g>
                  <g mask="url(#loader-mask)">
                    <rect
                      clipPath="url(#loader-eyes)"
                      height="64"
                      width="128"
                      fill="hsl(223,90%,50%)"
                    ></rect>
                    <g stroke="hsl(223,90%,50%)" fill="none">
                      <circle
                        transform="rotate(180,64,64)"
                        r="56"
                        cy="64"
                        cx="64"
                        className="loader__mouth1"
                      ></circle>
                      <circle
                        transform="rotate(0,64,64)"
                        r="56"
                        cy="64"
                        cx="64"
                        className="loader__mouth2"
                      ></circle>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          )}
          {error && <h1 className="loadingText">{error}</h1>}
          {displayedList && displayedList.length === 0 && !loading && (
            <div className="notfound__box animated__animated animate__fadeIn">
                <div className="notfound__message__box">
              <h2 className="notfound__message__box__text"> No wallpapers found </h2>
              </div>
              <video
                className=""
                autoPlay
                muted
                loop
                playsInline
                style={{ playbackRate: 0.5 }}
              >
                <source src="./extra/nowallpaper.webm" type="video/webm" />
              </video>
            
            </div>
          )}
      {displayedList &&
  displayedList.map((obj) => (
    <div key={obj.id} className="triplist__card animate__animated animate__fadeInUp">
      <LazyBackground
        className="triplist__image"
        src={obj.orig}
        alt={obj.title}
        onClick={() => openModal(obj)}
      />
    </div>
  ))}


        </div>

        {visibleCount < filteredList.length && (
          <button
            className="show-more-btn"
            onClick={() => setVisibleCount(visibleCount + 12)}
          >
            Show More
          </button>
        )}

        {modal && selected && (
          <Suspense fallback={<div>Loading modal...</div>}>
            <Modal
              selected={selected}
              closeModal={closeModal}
              setDownloadLink={setDownloadLink}
              handleAddToCollection={handleAddToCollection}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default TripList;
