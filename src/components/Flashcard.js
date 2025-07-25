import React, { useState } from 'react';

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!card) {
    return <div className="flashcard">No cards to display.</div>;
  }

  return (
    <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-face card-front">
          <h2>{card.question.title}</h2>
          <p>{card.question.description}</p>
          <pre><code>{card.question.examples}</code></pre>
        </div>
        <div className="card-face card-back">
          <h3>Level: {card.level}</h3>
          <h4>Algorithm:</h4>
          <p>{card.answer.algorithm}</p>
          <h4>Big O Complexity:</h4>
          <p>{card.answer.bigO}</p>
          <h4>Code:</h4>
          <pre><code>{card.answer.code}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default Flashcard; 