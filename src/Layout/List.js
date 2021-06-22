import React, { useState, useEffect } from 'react';
import { deleteDeck, listDecks } from '../utils/api';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

export const List = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  
  useEffect(loadDecks, []);

 function loadDecks() {
  const abortController = new AbortController()
  listDecks(abortController.signal).then(setDecks).catch(setError)
  return ()=> abortController.abort()
 }

  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (decks.length) {
    const list = decks.map((deck) => {
      return (
        <div key={deck.id} className="card shadow mt-4">
          <h3 className="card-header">{deck.name}</h3>
          <div className="card-body">
            <p className="card-text">{deck.description}</p>
            <small className="card-text text-muted">{`${deck.cards.length} cards`}</small>
           
          </div>
          <div className="card-footer bg-transparent d-flex justify-content-center">
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
              <span className="oi oi-eye" /> View
            </Link>
            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary mr-2"
            >
              <span className="oi oi-book" /> Study
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => {
                const result = window.confirm(
                  'Delete this deck? \nYou will not be able to recover it.'
                );
                if (result) {
                  deleteDeck(deck.id).then(()=> loadDecks())
                  
                }
              }}
            >
              <span className="oi oi-circle-x" /> Delete
            </button>
          </div>
        </div>
      );
    });

    return (
      <main className="container">
        <div>
          <Link to="decks/new" className="btn btn-secondary m-3">
            <span className="oi oi-plus" /> Create Deck
          </Link>
        </div>
        <div>{list}</div>
      </main>
    );
  } else{
  
  return (
    <div className="p-4 border border-top-0">
      <p>Loading...</p>
    </div>
  );
  }
};
export default List;
