import React from 'react';

const Filter = ({ setFilter, currentFilter }) => {
  const filters = ['All', 'Easy', 'Medium', 'Hard'];

  return (
    <div className="filter-controls">
      {filters.map(filter => (
        <button
          key={filter}
          className={currentFilter === filter ? 'active' : ''}
          onClick={() => setFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default Filter; 