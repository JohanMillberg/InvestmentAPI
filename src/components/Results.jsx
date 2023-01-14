import Carousel from "./Carousel";

const Results = ({ plots, status }) => {
  if (status === "loading") {
    return (
      <div className="results">
        <h2>Fetching stocks...</h2>
      </div>
    );
  }

  return (
    <div className="results">
      {plots.length > 0 && <Carousel plots={plots} />}
    </div>
  );
};

export default Results;
