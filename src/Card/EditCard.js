import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { updateCard, readCard, readDeck } from '../utils/api';
import ErrorMessage from '../Layout/ErrorMessage';

function EditCard() {
  const { deckId, cardId } = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);
  const [currentDeck, setCurrentDeck] = useState({});

  useEffect(() => {
    readCard(cardId).then(setFormData);
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
    readCard(cardId).then(setFormData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateCard(formData, abortController.signal).then().catch(setError);

    if (error) {
      return <ErrorMessage error={error} />;
    }
  };

  if (formData && currentDeck)
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {`${cardId}`}
            </li>
          </ol>
        </nav>
        <h1>Edit Card</h1>
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
              placeholder={formData.front}
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
              placeholder={formData.back}
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

export default EditCard;
