import React, { useEffect, useState } from 'react';
import { createCard, readDeck } from '../utils/api';
import ErrorMessage from '../Layout/ErrorMessage';
import { useParams, useHistory } from 'react-router-dom';
import CardForm from './CardForm';

function AddCard() {
  const initialState = {
    front: '',
    back: '',
  };
  const { deckId } = useParams();
  const [formData, setFormData] = useState({ ...initialState });
  const [error, setError] = useState(undefined);
  const [deck, setDeck] = useState([]);
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleChange = ({ target }) => {
    const value = target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleReset = (event) => {
    setFormData({ ...initialState });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    createCard(deckId, formData, abortController.signal)
      .then((data) => setFormData(data))
      .catch(setError);

    return () => abortController.abort();
  };

  useEffect(() => {
    if (formData.id) {
      history.push(`/decks/${deckId}`);
    }
  }, [formData.id, history, deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
              <span className="oi oi-home" />
              Home
            </a>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <a href={`/decks/${deckId}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span className="oi oi-plus" /> Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default AddCard;
