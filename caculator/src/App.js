import { useState } from "react";
import React from "react";
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAdd = () => {
    setResult(result + parseInt(inputValue));
    setInputValue("");
  };

  const handleSubtract = () => {
    setResult(result - parseInt(inputValue));
    setInputValue("");
  };

  const handleMultiply = () => {
    setResult(result * parseInt(inputValue));
    setInputValue("");
  };

  const handleResetInput = () => {
    setInputValue("");
  };

  const handleResetResult = () => {
    setResult(0);
  };

  return (
    <div className="calculator">
      <h1>Calculator App</h1>
      <div className="input-container">
        <input type="number" value={inputValue} onChange={handleInputChange} />
      </div>
      <div className="button-container">
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleSubtract}>Subtract</button>
        <button onClick={handleMultiply}>Multiply</button>
        <button className="reset-button" onClick={handleResetResult}>
          Reset Result
        </button>
		<button className="reset-button" onClick={handleResetInput}>
          Reset Input
        </button>
      </div>
      <div className="result-container">
        <h2>Result: {result}</h2>
      </div>
    </div>
  );
}

export default App;
