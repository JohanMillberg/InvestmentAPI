const Results = ({ plots }) => {
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
