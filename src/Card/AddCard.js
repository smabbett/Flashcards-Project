import React, { useEffect, useState } from 'react';
import { createCard, readDeck } from '../utils/api';
import ErrorMessage from '../Layout/ErrorMessage';
import { useParams } from 'react-router-dom';

function AddCard() {
  const initialState = {
    front: '',
    back: '',
  };
  const { deckId } = useParams();
  const [formData, setFormData] = useState({ ...initialState });
  const [error, setError] = useState(undefined);
  const [currentDeck, setCurrentDeck] = useState([]);

  useEffect(() => {
    readDeck(deckId).then(setCurrentDeck);
  }, []);

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
      .then(handleReset())
      .catch(setError);

    if (error) {
      return <ErrorMessage error={error} />;
    }
    return () => abortController.abort();
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <a href={`/decks/${deckId}`}>{currentDeck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{currentDeck.name}: Add Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front" className="form-label">
            Front Side
          </label>
          <textarea
            type="textarea"
            className="form-control"
            id="front"
            name="front"
            placeholder="Front Side"
            onChange={handleChange}
            value={formData.front}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back" className="form-label">
            Back Side
          </label>
          <textarea
            type="textarea"
            className="form-control"
            id="back"
            name="back"
            placeholder="Back Side"
            onChange={handleChange}
            value={formData.back}
          />
        </div>
        <input
          className="btn btn-secondary mr-3"
          type="reset"
          onClick={handleReset}
          value="Reset"
        ></input>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default AddCard;
