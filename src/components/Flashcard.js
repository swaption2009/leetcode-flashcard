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
            <ReactMarkdown>{card.question.description}</ReactMarkdown>
            <ReactMarkdown>{card.question.examples}</ReactMarkdown>
          </div>
        </div>
        <div className="card-face card-back">
          <div className="flip-icon">
            <MdFlipCameraAndroid size={24} />
            <span>Click to flip</span>
          </div>
          <div className="answer-content">
            <ReactMarkdown>{card.answer.algorithm}</ReactMarkdown>
            <ReactMarkdown>{card.answer.bigO}</ReactMarkdown>
            <ReactMarkdown>{`\`\`\`python\n${card.answer.code}\n\`\`\``}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard; 