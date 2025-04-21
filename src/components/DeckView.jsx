import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Flashcard from './Flashcard';
import NewCardForm from './NewCardForm';
import { getDeckById, addCard, deleteCard } from '../utils/localStorage';

const DeckView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  useEffect(() => {
    const deckData = getDeckById(id);
    if (deckData) {
      setDeck(deckData);
    } else {
      history.push('/');
    }
  }, [id, history]);

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleAddCard = (newCard) => {
    const updatedDeck = addCard(deck.id, newCard);
    setDeck(updatedDeck);
    setShowAddCardForm(false);
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const updatedDeck = deleteCard(deck.id, cardId);
      setDeck(updatedDeck);
      
      // Adjust current card index if necessary
      if (currentCardIndex >= updatedDeck.cards.length) {
        setCurrentCardIndex(Math.max(0, updatedDeck.cards.length - 1));
      }
    }
  };

  if (!deck) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div style={{ marginTop: '2rem' }}>
        <h2>{deck.title}</h2>
        {deck.cards.length === 0 ? (
          <div className="empty-state">
            <p>No cards in this deck yet.</p>
            <button className="btn-primary" onClick={() => setShowAddCardForm(true)}>
              Add Your First Card
            </button>
          </div>
        ) : (
          <>
            <div className="card-count-display" style={{ textAlign: 'center', margin: '1rem 0' }}>
              Card {currentCardIndex + 1} of {deck.cards.length}
            </div>
            
            <Flashcard card={deck.cards[currentCardIndex]} />
            
            <div className="flashcard-navigation">
              <button 
                className="btn-secondary" 
                onClick={handlePrevCard} 
                disabled={currentCardIndex === 0}
              >
                Previous
              </button>
              <div>
                <button 
                  className="btn-danger" 
                  onClick={() => handleDeleteCard(deck.cards[currentCardIndex].id)}
                >
                  Delete Card
                </button>
              </div>
              <button 
                className="btn-secondary" 
                onClick={handleNextCard} 
                disabled={currentCardIndex === deck.cards.length - 1}
              >
                Next
              </button>
            </div>
          </>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Link to="/">
            <button className="btn-secondary">Back to Decks</button>
          </Link>
          {!showAddCardForm && (
            <button className="btn-primary" onClick={() => setShowAddCardForm(true)}>
              Add Card
            </button>
          )}
        </div>
        
        {showAddCardForm && (
          <div className="modal-backdrop">
            <div className="modal">
              <div className="modal-header">
                <h3 className="modal-title">Add New Card</h3>
                <button className="modal-close" onClick={() => setShowAddCardForm(false)}>×</button>
              </div>
              <NewCardForm onSubmit={handleAddCard} onCancel={() => setShowAddCardForm(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckView; 