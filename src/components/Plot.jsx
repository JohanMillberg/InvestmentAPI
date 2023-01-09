import React, { useState, useRef } from 'react';

/*
Should be called like this:

fetch('/get_stocks', {
  method: 'POST',
  body: JSON.stringify({
    start: '2022-11-01',
    end: '2023-01-01',
    return_period_weeks: 4,
    min_avg_return: 0.1,
    max_dev_return: 0.07
  })
})
  .then(response => response.json())
  .then(data => {
  });
*/

export function Plot() {
    const [plots, setPlots] = useState([])
    const [formData, setFormData] = useState({
        "start": '',
        "end": '',
        "return_period_weeks": 4,
        "min_avg_return": 0.1,
        "max_dev_return": 0.07
    })
    
    var DEV_ENDPOINT = "/get_stocks"

    const handleChange = event => {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        var response = await fetch(DEV_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        var {plots} = await response.json();

        setPlots(plots);
    }

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
            {plots.map(plot => (
                <img src={`data:image/png;base64,${plot}`} alt="Stock plot" />
            ))}
        </div>
    );
}