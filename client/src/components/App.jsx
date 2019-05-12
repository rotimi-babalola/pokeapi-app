import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonSpecies from './PokemonSpecies';
import PokemonEvolutionChain from './PokemonEvolutionChain';

import '../styles/app.scss';

const App = () => (
  <div className="app-container">
    <Router>
      <Switch>
        <Route exact path="/" component={PokemonSpecies} />
        <Route
          exact
          path="/evolution-chain/:id/:name"
          component={PokemonEvolutionChain}
        />
      </Switch>
    </Router>
  </div>
);

export default App;
