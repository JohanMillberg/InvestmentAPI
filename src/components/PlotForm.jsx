import React, { useState } from "react";
import Results from "./Results";
import usePlotList from "./usePlotList";

function PlotForm() {
  const [requestParams, setRequestParams] = useState({
    start: "",
    end: "",
    return_period_weeks: 4,
    min_avg_return: 0.0,
    max_dev_return: 0.0,
  });
  const result = usePlotList(requestParams);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const obj = {
      start: formData.get("start") ?? "",
      end: formData.get("end") ?? "",
      return_period_weeks: formData.get("return_period_weeks") ?? 0,
      min_avg_return: formData.get("min_avg_return") ?? 0,
      max_dev_return: formData.get("max_dev_return") ?? 0,
    };
    setRequestParams(obj);
  };

  return (
    <div className="plot-container">
      <h2>Enter desired properties of stocks</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" name="start" />
        <br />
        <label htmlFor="endDate">End Date:</label>
        <input type="date" name="end" />
        <br />
        <label htmlFor="weeks">Return period in weeks:</label>
        <input type="number" name="return_period_weeks" step="any" />
        <br />
        <label htmlFor="minReturn">Minimum Average Return:</label>
        <input type="number" name="min_avg_return" step="any" />
        <br />
        <label htmlFor="maxDev">Maximum Volatility:</label>
        <input type="number" name="max_dev_return" step="any" />
        <br />
        <button type="submit">Fetch plots</button>
      </form>
      <Results plots={result[0]} status={result[1]} />
    </div>
  );
}

export default PlotForm;
