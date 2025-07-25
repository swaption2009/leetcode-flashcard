import React from 'react';

const Controls = ({ goToPrev, goToNext, shuffleCards }) => {
  return (
    <div className="controls">
      <button onClick={goToPrev}>Previous</button>
      <button onClick={shuffleCards}>Shuffle</button>
      <button onClick={goToNext}>Next</button>
    </div>
  );
};

export default Controls; 