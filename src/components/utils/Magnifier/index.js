import React, { useRef, useState } from "react";

const Magnifier = ({ imageUrl, zoomLevel, zoomRadius }) => {
  const imageRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoomedImage, setShowZoomedImage] = useState(false);

  const handleMouseMove = (event) => {
    const bounds = imageRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setShowZoomedImage(true);
  };

  const handleMouseLeave = () => {
    setShowZoomedImage(false);
  };

  const clipPath = `ellipse(${zoomRadius}px ${zoomRadius}px at ${position.x}px ${position.y}px)`;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img
        src={imageUrl}
        alt="Original"
        ref={imageRef}
        style={{
          display: "block",
          maxWidth: "100%",
        }}
      />
      {showZoomedImage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.8,
            pointerEvents: "none",
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: `-${position.x}px -${position.y}px`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            transform: `scale(${zoomLevel})`,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.5,
          pointerEvents: "none",
          backgroundColor: "black",
          clipPath: clipPath,
        }}
      />
    </div>
  );
};

export default Magnifier;
