import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import CreateDeck from '../Deck/CreateDeck';
import EditDeck from '../Deck/EditDeck';
import Study from '../Deck/Study';
import Deck from '../Deck/Deck';
import List from './List';

import AddCard from '../Card/AddCard';
import EditCard from '../Card/EditCard';

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <List />
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
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
