import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listCards, readDeck } from '../utils/api';
import ErrorMessage from '../Layout/ErrorMessage';
import classNames from '../utils/class-names';

export const Study = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(undefined);
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        let data = await readDeck(deckId, abortController.signal);
        setDeck(data);
        let cardData = await listCards(deckId, abortController.signal);
        setCards(cardData);
      } catch (err) {
        setError(err);
      }
    }
    getDeck();
    return () => abortController.abort();
  }, []);

  function nextCard() {
    if (cardIndex === cards.length - 1) {
      const result = window.confirm('Do you want to restart the deck?');
      if (result) {
        setCardIndex(0);
      }
    } else {
      setCardIndex(cardIndex + 1);
    }
    setFlipped((prevState) => !prevState);
  }

  function flipCard() {
    setFlipped((prevState) => !prevState);
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (deck && cards)
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <a href={`/decks/${deck.id}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>Study: {deck.name}</h1>

        <div className="col-sm-12">
          {cards.length > 2 ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Card {cardIndex + 1} of {cards.length}
                </h5>
                <p className="card-text">
                  {!flipped
                    ? `${cards[cardIndex].front}`
                    : `${cards[cardIndex].back}`}
                </p>
                <button className="btn btn-secondary m-2" onClick={flipCard}>
                  Flip
                </button>
                <button
                  className={classNames({
                    'btn btn-primary': true,
                    invisible: !flipped,
                    visible: flipped,
                  })}
                  onClick={nextCard}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3>Not enough cards.</h3>
              <p>
                You need at least 3 cards to study. There are {cards.length}{' '}
                cards in this deck.
              </p>
              <Link
                to={`/decks/${deck.id}/cards/new`}
                className="btn btn-primary"
              >
                Add Cards
              </Link>
            </>
          )}
        </div>
      </>
    );
};
export default Study;
