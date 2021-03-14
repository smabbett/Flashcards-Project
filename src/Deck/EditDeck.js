import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { updateDeck, readDeck } from '../utils/api';
import ErrorMessage from '../Layout/ErrorMessage';

function EditDeck() {
  const { deckId } = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);

  useEffect(() => {
    readDeck(deckId).then(setFormData);
  }, []);

  const handleChange = ({ target }) => {
    const value = target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleReset = (event) => {
    readDeck(deckId).then(setFormData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateDeck(formData, abortController.signal).then().catch(setError);

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
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{formData.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder={formData.name}
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
              placeholder={formData.description}
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
