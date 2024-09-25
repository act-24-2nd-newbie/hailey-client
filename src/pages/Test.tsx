import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayPage = () => {
  const location = useLocation();
  const { inputValue } = location.state || {}; // Get the input value from state

  return (
    <div>
      <h1>Display Page</h1>
      <p>You entered: {inputValue}</p>
    </div>
  );
};

export default DisplayPage;
