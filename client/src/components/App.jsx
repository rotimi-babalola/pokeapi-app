import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonSpecies from './PokemonSpecies';
import PokemonEvolutionChain from './PokemonEvolutionChain';

import '../styles/app.scss';

const App = () => (
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
);

export default App;
