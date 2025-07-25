import React, { useState, useEffect } from 'react';
import './App.css';
import Flashcard from './components/Flashcard';
import Controls from './components/Controls';
import Chatbox from './components/Chatbox';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './contexts/ThemeContext';
import { GEMINI_API_KEY, GEMINI_API_URL } from './config';
import flashcardsMarkdown from './data/flashcards.md';

const parseMarkdownToJSON = (markdown) => {
  const cards = markdown.split('---').filter(card => card.trim() !== '');
  return cards.map((card, index) => {
    const titleMatch = card.match(/### \*\*(.*?)\*\*/);
    const questionMatch = card.match(/#### \*\*Question\*\*([\s\S]*?)#### \*\*Answer\*\*/);
    const answerMatch = card.match(/#### \*\*Answer\*\*([\s\S]*)/);

    if (!titleMatch || !questionMatch || !answerMatch) return null;

    const title = titleMatch[1];
    const questionContent = questionMatch[1];
    const answerContent = answerMatch[1];

    const descriptionMatch = questionContent.match(/\*\*Description:\*\*([\s\S]*?)(?=\*\*Example|\*\*Examples)/);
    const examplesMatch = questionContent.match(/\*\*Examples?:\*\*([\s\S]*)/);

    const algorithmMatch = answerContent.match(/\*\*Algorithm:\*\*([\s\S]*?)\*\*Big O:\*\*/);
    const bigOMatch = answerContent.match(/\*\*Big O:\*\*([\s\S]*?)\*\*Python Code:\*\*/);
    const codeMatch = answerContent.match(/```python\n([\s\S]*?)\n```/);

    return {
      id: index + 1,
      question: {
        title,
        description: descriptionMatch ? descriptionMatch[1].trim() : '',
        examples: examplesMatch ? examplesMatch[1].trim() : '',
      },
      answer: {
        algorithm: algorithmMatch ? algorithmMatch[1].trim() : '',
        bigO: bigOMatch ? bigOMatch[1].trim() : '',
        code: codeMatch ? codeMatch[1].trim() : '',
      },
    };
  }).filter(Boolean);
};

function App() {
  const { isDarkMode } = useTheme();
  const [allCards, setAllCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome! Ask me anything about the current card or coding concepts in general.' }
  ]);

  useEffect(() => {
    fetch(flashcardsMarkdown)
      .then(response => response.text())
      .then(text => {
        const parsedCards = parseMarkdownToJSON(text);
        setAllCards(parsedCards);
      });
  }, []);

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % allCards.length);
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + allCards.length) % allCards.length);
  };

  const shuffleCards = () => {
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    setAllCards(shuffled);
    setCurrentIndex(0);
  };

  const callGeminiAPI = async (userMessage, currentCard) => {
    try {
      const context = currentCard ? 
        `Current flashcard context:
        Problem: ${currentCard.question.title}
        Description: ${currentCard.question.description}
        Examples: ${currentCard.question.examples}
        Algorithm: ${currentCard.answer.algorithm}
        Big O: ${currentCard.answer.bigO}
        Code: ${currentCard.answer.code}
        
        User question: ${userMessage}
        
        Please provide a helpful response related to this coding problem or general coding concepts.` :
        `User question: ${userMessage}
        
        Please provide a helpful response about coding concepts.`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: context
            }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again later.";
    }
  };

  const handleSendMessage = async (text) => {
    const userMessage = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);

    // Add a loading message
    const loadingMessage = { sender: 'bot', text: 'Thinking...' };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      const currentCard = allCards[currentIndex];
      const botResponse = await callGeminiAPI(text, currentCard);
      
      // Replace the loading message with the actual response
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: botResponse }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: "I'm sorry, I encountered an error. Please try again." }
      ]);
    }
  };

  if (allCards.length === 0) {
    return <div>Loading flashcards...</div>;
  }

  return (
    <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="app-header">
        <h1>LeetCode Flashcards</h1>
        <ThemeToggle />
      </div>
      <div className="card-counter">
        Card {allCards.length > 0 ? currentIndex + 1 : 0} of {allCards.length}
      </div>
      <div className="main-content">
        <div className="flashcard-column">
          <Flashcard card={allCards[currentIndex]} />
          <Controls goToPrev={goToPrev} goToNext={goToNext} shuffleCards={shuffleCards} />
        </div>
        <Chatbox messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
