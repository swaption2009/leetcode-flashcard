import React, { useState, useEffect } from 'react';
import './App.css';
import Flashcard from './components/Flashcard';
import Controls from './components/Controls';
import Filter from './components/Filter';
import flashcardData from './data/flashcards.json';

function App() {
  const [allCards] = useState(flashcardData);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('All');

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

  return (
    <div className="App">
      <h1>LeetCode Flashcards</h1>
      <Filter setFilter={setFilter} currentFilter={currentFilter} />
      <div className="card-counter">
        Card {filteredCards.length > 0 ? currentIndex + 1 : 0} of {filteredCards.length}
      </div>
      <Flashcard card={filteredCards[currentIndex]} />
      <Controls goToPrev={goToPrev} goToNext={goToNext} shuffleCards={shuffleCards} />
    </div>
  );
}

export default App;
