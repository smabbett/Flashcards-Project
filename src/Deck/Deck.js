import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import { deleteDeck } from '../utils/api';

export const Deck = ({ decks }) => {
  const { deckId } = useParams();
  const history = useHistory();

  const deck = decks.find((deck) => deck.id === Number(deckId));

  if (deck) {
    const list = deck.cards.map((card) => <Card key={card.id} card={card} />);
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
        <div>
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>

          <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary m-2">
            Edit
          </Link>

          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary m-2">
            Study
          </Link>

          <Link
            to={`/decks/${deck.id}/cards/new`}
            className="btn btn-secondary m-2"
          >
            Add Cards
          </Link>
          <button
            className="btn btn-danger m-2"
            id={deck.id}
            onClick={async () => {
              const result = window.confirm(
                'Delete this deck? \nYou will not be able to recover it.'
              );
              if (result) {
                deleteDeck(deck.id).then(history.push('/'));
              }
            }}
          >
            Delete
          </button>
        </div>
        <div>
          <h2>Cards</h2>
          <section>{list}</section>
        </div>
      </div>
    );
  }
  return <div>No such deck</div>;
};

export default Deck;
