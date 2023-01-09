import logo from './logo.svg';
import './App.css';
import {Plot} from './components/Plot.jsx';

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


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Plot/>
    </div>
  );
}

export default App;
