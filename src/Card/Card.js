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
      <div className="card mt-4">
        <div className="card-body">
          <div className="row">
          <p className="card-text col-md-6">{card.front}</p>
          <p className="card-text col-md-6">{card.back}</p>
          </div>
          <div className="row">
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
