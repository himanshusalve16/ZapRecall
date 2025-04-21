// Get all decks from localStorage
export const getDecks = () => {
  const decks = localStorage.getItem('zaprecall-decks');
  return decks ? JSON.parse(decks) : [];
};

// Save all decks to localStorage
export const saveDecks = (decks) => {
  localStorage.setItem('zaprecall-decks', JSON.stringify(decks));
};

// Get a specific deck by ID
export const getDeckById = (id) => {
  const decks = getDecks();
  return decks.find(deck => deck.id === id) || null;
};

// Add a new deck
export const addDeck = (newDeck) => {
  const decks = getDecks();
  const deckWithId = {
    ...newDeck,
    id: Date.now().toString(),
    cards: []
  };
  saveDecks([...decks, deckWithId]);
  return deckWithId;
};

// Update an existing deck
export const updateDeck = (updatedDeck) => {
  const decks = getDecks();
  const updatedDecks = decks.map(deck => 
    deck.id === updatedDeck.id ? updatedDeck : deck
  );
  saveDecks(updatedDecks);
  return updatedDeck;
};

// Delete a deck
export const deleteDeck = (deckId) => {
  const decks = getDecks();
  const filteredDecks = decks.filter(deck => deck.id !== deckId);
  saveDecks(filteredDecks);
  return filteredDecks;
};

// Add a card to a deck
export const addCard = (deckId, newCard) => {
  const decks = getDecks();
  const deckIndex = decks.findIndex(deck => deck.id === deckId);
  
  if (deckIndex !== -1) {
    const updatedDeck = { ...decks[deckIndex] };
    const cardWithId = {
      ...newCard,
      id: Date.now().toString()
    };
    
    updatedDeck.cards = [...updatedDeck.cards, cardWithId];
    decks[deckIndex] = updatedDeck;
    
    saveDecks(decks);
    return updatedDeck;
  }
  
  return null;
};

// Update a card in a deck
export const updateCard = (deckId, updatedCard) => {
  const decks = getDecks();
  const deckIndex = decks.findIndex(deck => deck.id === deckId);
  
  if (deckIndex !== -1) {
    const updatedDeck = { ...decks[deckIndex] };
    
    updatedDeck.cards = updatedDeck.cards.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    );
    
    decks[deckIndex] = updatedDeck;
    saveDecks(decks);
    return updatedDeck;
  }
  
  return null;
};

// Delete a card from a deck
export const deleteCard = (deckId, cardId) => {
  const decks = getDecks();
  const deckIndex = decks.findIndex(deck => deck.id === deckId);
  
  if (deckIndex !== -1) {
    const updatedDeck = { ...decks[deckIndex] };
    
    updatedDeck.cards = updatedDeck.cards.filter(card => card.id !== cardId);
    decks[deckIndex] = updatedDeck;
    
    saveDecks(decks);
    return updatedDeck;
  }
  
  return null;
};

// Save theme preference to localStorage
export const saveTheme = (theme) => {
  localStorage.setItem('zaprecall-theme', theme);
};

// Get theme preference from localStorage
export const getTheme = () => {
  return localStorage.getItem('zaprecall-theme') || 'light';
}; 