import React, { useState, useEffect } from 'react';
import DeckList from '../components/DeckList';
import NewDeckForm from '../components/NewDeckForm';
import { getDecks, addDeck, updateDeck, deleteDeck } from '../utils/localStorage';

const Home = () => {
  const [decks, setDecks] = useState([]);
  const [showNewDeckForm, setShowNewDeckForm] = useState(false);
  const [editDeck, setEditDeck] = useState(null);

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = () => {
    const loadedDecks = getDecks();
    setDecks(loadedDecks);
  };

  const handleCreateDeck = (newDeck) => {
    addDeck(newDeck);
    loadDecks();
    setShowNewDeckForm(false);
  };

  const handleEditDeck = (deck) => {
    setEditDeck(deck);
    setShowNewDeckForm(true);
  };

  const handleSaveEdit = (updatedDeck) => {
    updateDeck(updatedDeck);
    loadDecks();
    setShowNewDeckForm(false);
    setEditDeck(null);
  };

  const handleDeleteDeck = (deckId) => {
    deleteDeck(deckId);
    loadDecks();
  };

  const handleCloseForm = () => {
    setShowNewDeckForm(false);
    setEditDeck(null);
  };

  return (
    <div className="container">
      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Your Flashcard Decks</h1>
          <button 
            className="btn-primary" 
            onClick={() => setShowNewDeckForm(true)}
          >
            Create New Deck
          </button>
        </div>
        
        <DeckList 
          decks={decks} 
          onDeleteDeck={handleDeleteDeck} 
          onEditDeck={handleEditDeck} 
        />
        
        {showNewDeckForm && (
          <div className="modal-backdrop">
            <div className="modal">
              <div className="modal-header">
                <h3 className="modal-title">
                  {editDeck ? 'Edit Deck' : 'Create New Deck'}
                </h3>
                <button className="modal-close" onClick={handleCloseForm}>×</button>
              </div>
              <NewDeckForm 
                onSubmit={editDeck ? handleSaveEdit : handleCreateDeck} 
                onCancel={handleCloseForm}
                initialData={editDeck}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 