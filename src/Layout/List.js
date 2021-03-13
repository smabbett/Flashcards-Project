import { deleteDeck } from '../utils/api';
import { Link, useHistory } from 'react-router-dom';

export const List = ({ decks }) => {
  const history = useHistory();
  // const handleDelete = async () => {
  //   const result = window.confirm(
  //     'Delete this deck? \nYou will not be able to recover it.'
  //   );
  //   if (result) {
  //     deleteDeck(deck.id).then(history.push('/'));
  //   }
  // };

  const list = decks.map((deck) => {
    return (
      <div key={deck.id} className="card col-md-10">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h5 className="card-title">{deck.name}</h5>
            </div>
            <div className="col-md-4">
              <p className="text-end">{`${deck.cards.length} cards`}</p>
            </div>
          </div>
          <p className="card-text">{deck.description}</p>

          <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
            View
          </Link>

          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
            Study
          </Link>

          <button
            className="btn btn-danger"
            onClick={async () => {
              const result = window.confirm(
                'Delete this deck? \nYou will not be able to recover it.'
              );
              if (result) {
                deleteDeck(deck.id).then(history.push('/'));
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <main className="container">
      <div>
        <Link to="decks/new" className="btn btn-secondary m-3">
          Create Deck
        </Link>
      </div>
      <section className="row">{list}</section>
    </main>
  );
};
export default List;
