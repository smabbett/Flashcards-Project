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
    <div className="container">
      <div className="card col-md-10">
        <div className="row">
          <div className="col-md-6">
            <div className="card-body">
              <p className="card-text">{card.front}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card-body">
              <p className="card-text">{card.back}</p>
              <div className="text-right">
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
        </div>
      </div>
    </div>
  );
};
export default Card;
