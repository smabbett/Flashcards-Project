import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteCard } from '../utils/api';

export const Card = ({ card }) => {
  const { deckId } = useParams();
  const history = useHistory();

  const handleDelete = async () => {
    const result = window.confirm(
      'Delete this card? \nYou will not be able to recover it.'
    );
    if (result) {
      deleteCard(card.id).then(history.push('/'));
    }
  };

  return (
    <div className="col-lg-4">
      <div className="card shadow mt-4">
        <div className="card-header d-flex justify-content-between">
          <div>Front</div>
          <div>Back</div>
        </div>
        <div
          className="card-body d-flex justify-content-between"
          style={{ height: '10rem' }}
        >
          <p className="card-text pr-3">{card.front}</p>
          <p className="card-text pl-3">{card.back}</p>
        </div>
        <div className="card-footer d-flex justify-content-between bg-transparent">
          <Link
            to={`/decks/${deckId}/cards/${card.id}/edit`}
            className="btn btn-secondary m-2"
          >
            <span className="oi oi-pencil" /> Edit
          </Link>
          <button className="btn btn-danger m-2" onClick={handleDelete}>
            <span className="oi oi-circle-x" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
