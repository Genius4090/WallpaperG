import React, { useEffect, useState, memo } from 'react';
import '../styles/Modal.css';

function Modal({ selected, closeModal}) {
  const [isCollected, setIsCollected] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Check if the image is in the collection when the modal opens
  useEffect(() => {
    const currentCollection = JSON.parse(localStorage.getItem('collectedImages')) || [];
    setIsCollected(currentCollection.some((item) => item.orig === selected.orig)); 
  }, [selected.orig]);

  const handleToggleCollection = () => {
    const currentCollection = JSON.parse(localStorage.getItem('collectedImages')) || [];

    if (isCollected) {
      const updatedCollection = currentCollection.filter((img) => img.orig !== selected.orig);
      localStorage.setItem('collectedImages', JSON.stringify(updatedCollection));
      setIsCollected(false);
    } else {
      const updatedCollection = [...currentCollection, { orig: selected.orig, title: selected.title }];
      localStorage.setItem('collectedImages', JSON.stringify(updatedCollection));
      setIsCollected(true);
    }
  };

  const handleDownload = () => {
    const fileName = selected.title.split(" ").join("_") + ".jpg"; // Using title for file name

    fetch(selected.orig)  // Fetch the image using the orig URL
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;  // Set download file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => console.error('Download error:', error));
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div
        className={`triplist__modal__content animate__animated ${isClosing ? 'animate__fadeOutUp' : 'animate__fadeInDown'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal__box1'>
          <p className='modal__title'>{selected.title}</p>
          <i onClick={handleCloseModal} className="bx bx-x modal__close__btn"></i>
        </div>
        <div className='modal__image__box'>
          <img
            className="modal-image"
            src={selected.orig}
            alt={selected.title}
          />
        </div>

        <div className='modal__box2'>
          <div className='modal__minibox__1'>
            <h2 className='modal__resolution__text'>
              <i className="ri-computer-line modal__pc__icon"></i>
              {selected.resolutionX} <i className="bx bx-x resolution__text__space"></i> {selected.resolutionY}
            </h2>
            <h2 className='modal__size__text'>
              <i className="ri-download-2-line modal__size__icon"></i> {selected.size} MB
            </h2>
          </div>

          <div className='modal__minibox__2'>
            <button
              className='modal__collect__btn'
              onClick={handleToggleCollection}
              style={{
                backgroundColor: isCollected ? '#6200ea' : 'rgba(255, 0, 170, 1)',
              }}
            >
              {isCollected ? (
                <i className="ri-bookmark-fill modal__iscollected__icon"></i>
              ) : (
                <i className="ri-bookmark-line modal__iscollected__icon"></i>
              )}
              {isCollected ? 'Remove' : 'Collect'}
            </button>
            <button className='modal__download__btn' onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Modal);
