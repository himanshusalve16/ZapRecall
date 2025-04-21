import React from 'react';
import { Link } from 'react-router-dom';

const DeckList = ({ decks, onDeleteDeck, onEditDeck }) => {
  return (
    <div className="deck-list">
      {decks.length === 0 ? (
        <div className="empty-state">
          <h3>No decks found</h3>
          <p>Create your first flashcard deck to get started!</p>
        </div>
      ) : (
        decks.map(deck => (
          <div key={deck.id} className="deck-card">
            <Link to={`/deck/${deck.id}`} style={{ textDecoration: 'none' }}>
              <h3>{deck.title}</h3>
              <p>{deck.cards.length} cards</p>
            </Link>
            <div className="deck-actions">
              <button 
                className="btn-secondary" 
                onClick={(e) => {
                  e.preventDefault();
                  onEditDeck(deck);
                }}
              >
                Edit
              </button>
              <button 
                className="btn-danger" 
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm('Are you sure you want to delete this deck?')) {
                    onDeleteDeck(deck.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DeckList; 