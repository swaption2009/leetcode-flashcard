import React, { useState, useEffect } from 'react';
import './App.css';
import Flashcard from './components/Flashcard';
import Controls from './components/Controls';
import Filter from './components/Filter';
import Chatbox from './components/Chatbox';
import flashcardData from './data/flashcards.json';
import { GEMINI_API_KEY, GEMINI_API_URL } from './config';

function App() {
  const [allCards] = useState(flashcardData);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome! Ask me anything about the current card or coding concepts in general.' }
  ]);

  useEffect(() => {
    let cardsToFilter = allCards;
    if (currentFilter !== 'All') {
      cardsToFilter = allCards.filter(card => card.level === currentFilter);
    }
    setFilteredCards(cardsToFilter);
    setCurrentIndex(0);
  }, [currentFilter, allCards]);

  const setFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % filteredCards.length);
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + filteredCards.length) % filteredCards.length);
  };

  const shuffleCards = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setFilteredCards(shuffled);
    setCurrentIndex(0);
  };

  const callGeminiAPI = async (userMessage, currentCard) => {
    try {
      const context = currentCard ? 
        `Current flashcard context:
        Problem: ${currentCard.question.title}
        Description: ${currentCard.question.description}
        Examples: ${currentCard.question.examples}
        Level: ${currentCard.level}
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
      const currentCard = filteredCards[currentIndex];
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

  return (
    <div className="App">
      <h1>LeetCode Flashcards</h1>
      <Filter setFilter={setFilter} currentFilter={currentFilter} />
      <div className="card-counter">
        Card {filteredCards.length > 0 ? currentIndex + 1 : 0} of {filteredCards.length}
      </div>
      <div className="main-content">
        <div className="flashcard-column">
          <Flashcard card={filteredCards[currentIndex]} />
          <Controls goToPrev={goToPrev} goToNext={goToNext} shuffleCards={shuffleCards} />
        </div>
        <Chatbox messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
