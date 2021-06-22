import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { updateDeck, readDeck, createDeck } from '../utils/api';
import ErrorMessage from '../Layout/ErrorMessage';

function EditDeck() {
  const { deckId } = useParams();
  const initialState = {
    name: '',
    description: '',
  };
  const [formData, setFormData] = useState({ ...initialState });
  const [error, setError] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    if (deckId) {
      readDeck(deckId).then(setFormData);
    }
  }, [deckId]);

  const handleChange = ({ target }) => {
    const value = target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleReset = (event) => {
    if (deckId) {
      readDeck(deckId).then(setFormData);
    } else {
      setFormData({ ...initialState });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    if (deckId) {
      updateDeck(formData, abortController.signal)
        .then(history.push(`/decks/${formData.id}`))
        .catch(setError);
    } else {
      createDeck(formData, abortController.signal)
        .then((data) => history.push(`/decks/${data.id}`))
        .catch(setError);
      return () => abortController.abort();
    }
    if (error) {
      return <ErrorMessage error={error} />;
    }
  };

  if (formData)
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">
                <span className="oi oi-home" /> Home
              </a>
            </li>
            <li className="breadcrumb-item">
              {deckId ? (
                <Link to={`/decks/${deckId}`}>{formData.name}</Link>
              ) : null}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deckId ? 'Edit Deck' : 'Create Deck'}
            </li>
          </ol>
        </nav>
        <h1>{deckId ? 'Edit Deck' : 'Create Deck'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <textarea
              className="form-control"
              id="name"
              name="name"
              placeholder="Deck Name"
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Description of Deck"
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <input
            className="btn btn-secondary mr-2"
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

export default EditDeck;
