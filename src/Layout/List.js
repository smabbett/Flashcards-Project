import React, { useState, useEffect } from 'react';
import { deleteDeck, listDecks } from '../utils/api';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

export const List = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  const abortController = new AbortController();
  async function getData() {
    try {
      let data = await listDecks(abortController.signal);
      setDecks(data);
    } catch (err) {
      setError(err);
    }
  }
  useEffect(() => {
    getData();
    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (decks) {
    const list = decks.map((deck) => {
      return (
        <div key={deck.id} className="card col-md-10">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h5 className="card-title">{deck.name}</h5>
              </div>
              <div className="col-md-4">
                <p className="text-end">{`${deck.cards.length} cards`}</p>
              </div>
            </div>
            <p className="card-text">{deck.description}</p>

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
              onClick={async () => {
                const result = window.confirm(
                  'Delete this deck? \nYou will not be able to recover it.'
                );
                if (result) {
                  deleteDeck(deck.id);
                  getData();
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
        <section className="row">{list}</section>
      </main>
    );
  }
  return (
    <div className="p-4 border border-top-0">
      <p>Loading...</p>
    </div>
  );
};
export default List;
