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
    <div class="container">
      <div class="card col-md-10">
        <div className="row">
          <div class="col-md-6">
            <div class="card-body">
              <p class="card-text">{card.front}</p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card-body">
              <p class="card-text">{card.back}</p>
              <div className="text-right">
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary m-2"
                >
                  Edit
                </Link>

                <button className="btn btn-danger m-2" onClick={handleDelete}>
                  Delete
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
