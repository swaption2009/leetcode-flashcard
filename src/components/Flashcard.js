import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MdFlipCameraAndroid } from 'react-icons/md';

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!card) {
    return <div className="flashcard">No cards to display.</div>;
  }

  return (
    <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-face card-front">
          <div className="flip-icon">
            <MdFlipCameraAndroid size={24} />
            <span>Click to flip</span>
          </div>
          <h2>{card.question.title}</h2>
          <div className="question-content">
            <h4>Description:</h4>
            <ReactMarkdown>{card.question.description}</ReactMarkdown>
            <h4>Examples:</h4>
            <ReactMarkdown>{card.question.examples}</ReactMarkdown>
          </div>
        </div>
        <div className="card-face card-back">
          <div className="flip-icon">
            <MdFlipCameraAndroid size={24} />
            <span>Click to flip</span>
          </div>
          <div className="answer-content">
            <h4>Algorithm:</h4>
            <ReactMarkdown>{card.answer.algorithm}</ReactMarkdown>
            <h4>Big O Complexity:</h4>
            <ReactMarkdown>{card.answer.bigO}</ReactMarkdown>
            <h4>Code:</h4>
            <ReactMarkdown>{`\`\`\`python\n${card.answer.code}\n\`\`\``}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard; 