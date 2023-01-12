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
      {plots.map((plot) => (
        <img
          key={`${plot}`}
          src={`data:image/png;base64,${plot}`}
          alt="A stock plot"
        />
      ))}
    </div>
  );
};

export default Results;
