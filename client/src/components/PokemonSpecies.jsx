import React from 'react';
import { uniqueId } from 'lodash';
import pokeApiWrapper from '../api';

class PokemonSpecies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonSpecies: [],
    };
  }

  componentDidMount() {
    pokeApiWrapper.getAllPokemonSpecies().then(response => {
      this.setState({
        pokemonSpecies: response.data.results,
      });
    });
  }

  render() {
    if (!this.state.pokemonSpecies.length) {
      return <h1>Loading...</h1>;
    }

    return (
      <React.Fragment>
        <h1>Pokemon Species</h1>
        <ul>
          {this.state.pokemonSpecies.map(el => (
            <li key={uniqueId()}>{el.name}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default PokemonSpecies;
