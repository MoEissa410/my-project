import React, { useEffect, useState, useRef } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";

const slides = [
  "https://images-eu.ssl-images-amazon.com/images/G/42/consumables/COOP23/Beyti-750x300-Sep23.png",
  "https://m.media-amazon.com/images/G/42/consumables/stores22/Supermarket/1461724_EG_L2_3Col_CN_Snacks_750x300_AR_53658d39-fc17-4b96-a03f-d91e9ecefd8a._CB607327748_.jpg",
  "https://m.media-amazon.com/images/I/61fpwAF0LZL._AC_UF894,1000_QL80_.jpg",
  "https://media.licdn.com/dms/image/C5612AQHFxQ4qZXBITg/article-cover_image-shrink_720_1280/0/1520159011433?e=2147483647&v=beta&t=FZK61ToleRC1Od7-k7sAznK3ZnEbToiXOH03DS6Pb1A",
];

const Slide = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

Slide.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const goToSlide = (index) => {
    setCurrent(index);
    clearTimeout(timeoutRef.current);
    if (!isPaused) {
      timeoutRef.current = setTimeout(goToNextSlide, 5000);
    }
  };

  const goToPreviousSlide = () => {
    const prevPicture = (current - 1 + slides.length) % slides.length;
    goToSlide(prevPicture);
  };

  const goToNextSlide = () => {
    const nextPicture = (current + 1) % slides.length;
    goToSlide(nextPicture);
  };

  const handleSwipe = (direction) => {
    clearTimeout(timeoutRef.current);
    if (direction === "left") {
      goToNextSlide();
    } else if (direction === "right") {
      goToPreviousSlide();
    }
    if (!isPaused) {
      timeoutRef.current = setTimeout(goToNextSlide, 5000);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(goToNextSlide, 5000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, isPaused]);

  if (slides.length === 0) {
    return null; // Handle case when there are no slides
  }

  if (slides.length === 1) {
    return <Slide src={slides[0]} alt={`Slide 0`} />; // Handle case when there is only one slide
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden" {...handlers}>
      <div
        className="w-full h-full flex transition ease-out duration-[0.6s] z-10"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide key={index} src={slide} alt={`Slide ${index}`} />
        ))}
      </div>
      <div className="absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none">
        <button
          onClick={goToPreviousSlide}
          className="ring-2 ring-Primary bg-gray-500 opacity-50 hover:bg-gray-500 hover:opacity-90 rounded-full p-4"
        >
          <AiOutlineArrowLeft />
        </button>
      </div>
      <div className="absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none">
        <button
          onClick={goToNextSlide}
          className="ring-2 ring-Primary bg-gray-500 opacity-50 hover:bg-gray-500 hover:opacity-90 rounded-full p-4"
        >
          <AiOutlineArrowRight />
        </button>
      </div>
      <div className="relative bottom-8 py-4 flex justify-center gap-3 w-full z-20">
        {slides.map((_, index) => (
          <div
            key={`circle${index}`}
            className={`rounded-full w-6 h-1 cursor-pointer  ${
              index === current ? "bg-yellow-300" : "bg-gray-500"
            }`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
