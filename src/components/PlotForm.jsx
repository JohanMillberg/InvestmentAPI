import React, { useState, useEffect } from "react";
import Results from "./Results";

function PlotForm() {
  const [plots, setPlots] = useState([]);
  const [formData, setFormData] = useState({
    start: "",
    end: "",
    return_period_weeks: 4,
    min_avg_return: 0.1,
    max_dev_return: 0.07,
  });

  const [hasStarted, setHasStarted] = useState(false);

  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    if (!hasStarted) {
      setResultMessage("Specify properties of stocks")
    } else if (!plots.length && hasStarted) {
      setResultMessage("No stocks with desired properties found");
    } else {
      setResultMessage("The following stocks match the given specifications");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plots]);

  var DEV_ENDPOINT = "http://localhost:5000/get_stocks";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setHasStarted(true);
    setResultMessage("Fetching plots...");

    var response = await fetch(DEV_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    var { plots } = await response.json();

    setPlots(plots);
  };

  return (
    <div className="plot-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          name="start"
          value={formData.start}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          name="end"
          value={formData.end}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="weeks">Return period in weeks:</label>
        <input
          type="number"
          name="return_period_weeks"
          value={formData.return_period_weeks}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="minReturn">Minimum Average Return:</label>
        <input
          type="number"
          name="min_avg_return"
          value={formData.min_avg_return}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="maxDev">Maximum Volatility:</label>
        <input
          type="number"
          name="max_dev_return"
          value={formData.max_dev_return}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Fetch plots</button>
      </form>
      <h2>{resultMessage}</h2>
      <Results plots={plots} />
    </div>
  );
}

export default PlotForm;
