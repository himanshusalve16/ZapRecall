import React, { useState } from 'react';

const NewDeckForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      alert('Please provide a title for the deck');
      return;
    }
    
    onSubmit({
      title: title.trim(),
      id: initialData ? initialData.id : null,
      cards: initialData ? initialData.cards : []
    });
    
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="deckTitle">Deck Title</label>
        <input
          type="text"
          id="deckTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your deck"
          autoFocus
        />
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialData ? 'Save Changes' : 'Create Deck'}
        </button>
      </div>
    </form>
  );
};

export default NewDeckForm; 