import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import CreateDeck from '../Deck/CreateDeck';
import EditDeck from '../Deck/EditDeck';
import Study from '../Deck/Study';
import Deck from '../Deck/Deck';
import List from './List';
import { listDecks } from '../utils/api';
import ErrorMessage from './ErrorMessage';
import AddCard from '../Card/AddCard';
import EditCard from '../Card/EditCard';

function Layout() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    async function getData() {
      try {
        let data = await listDecks(abortController.signal);
        setDecks(data);
      } catch (err) {
        setError(err);
      }
    }
    getData();
    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (decks)
    return (
      <>
        <Header />
        <div className="container">
          <Switch>
            <Route exact={true} path="/">
              <List decks={decks} />
            </Route>
            <Route path="/decks/new">
              <CreateDeck />
            </Route>
            <Route path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route path="/decks/:deckId/study">
              <Study />
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route path="/decks/:deckId">
              <Deck decks={decks} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          {/* TODO: Implement the screen starting here */}
        </div>
      </>
    );
}

export default Layout;
