import { useState } from "react";

const Carousel = ({ plots }) => {
  const [active, setActive] = useState(0);

  const mapIndex = (i) => {
    return ((i % plots.length) + plots.length) % plots.length;
  };

  return (
    <div className="plot-carousel">
      <img
        key={`${plots[active]}`}
        src={`data:image/png;base64,${plots[active]}`}
        alt="A stock plot"
      />
      <div className="carousel-buttons">
        <button
          onClick={() => {
            setActive(mapIndex(active - 1));
          }}
        >
          Previous plot
        </button>
        <button
          onClick={() => {
            setActive(mapIndex(active + 1));
          }}
        >
          Next plot
        </button>
      </div>
      <h3>
        {active + 1}/{plots.length}
      </h3>
    </div>
  );
};

export default Carousel;
