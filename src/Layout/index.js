import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./common/Header";
import NotFound from "./common/NotFound";
import Home from "./Home";
import DeckNew from "./DeckNew";
import DeckInfo from "./DeckInfo";
import Study from "./Study";
import DeckEdit from "./DeckEdit";
import CardNew from "./CardNew";
import CardEdit from "./CardEdit";

function Layout() {

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <DeckNew />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckInfo />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <CardNew />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
