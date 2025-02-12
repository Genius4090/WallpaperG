import React, { useRef, useState, useEffect } from 'react';

const LazyBackground = ({ src, alt, className, style = {}, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    let observer;
    const currentRef = divRef.current;

    if (currentRef && !isLoaded) {
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && currentRef) {
                setIsLoaded(true);
                observer.unobserve(currentRef);
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(currentRef);
      } else {
        // Fallback if IntersectionObserver is not available
        setIsLoaded(true);
      }
    }

    return () => {
      if (observer && observer.unobserve && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoaded]);

  const combinedStyle = {
    ...style,
    backgroundImage: isLoaded ? `url(${src})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      ref={divRef}
      className={className}
      style={combinedStyle}
      onClick={props.onClick}
      role="img"
      aria-label={alt}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default LazyBackground;
