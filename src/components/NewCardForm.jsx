import React, { useState } from 'react';

const NewCardForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [question, setQuestion] = useState(initialData ? initialData.question : '');
  const [answer, setAnswer] = useState(initialData ? initialData.answer : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (question.trim() === '' || answer.trim() === '') {
      alert('Please provide both a question and an answer');
      return;
    }
    
    onSubmit({
      question: question.trim(),
      answer: answer.trim(),
      id: initialData ? initialData.id : null
    });
    
    setQuestion('');
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardQuestion">Question</label>
        <textarea
          id="cardQuestion"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here"
          autoFocus
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="cardAnswer">Answer</label>
        <textarea
          id="cardAnswer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter the answer here"
        ></textarea>
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialData ? 'Save Changes' : 'Add Card'}
        </button>
      </div>
    </form>
  );
};

export default NewCardForm; 