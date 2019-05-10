import React from 'react';
import { uniqueId } from 'lodash';
import pokeApiWrapper from '../api';
import PokemonSpecie from './PokemonSpecie';

import '../styles/pokemon-species.scss';

const LIMIT = 12;

class PokemonSpecies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonSpecies: [],
      error: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await pokeApiWrapper.getAllPokemonSpecies(LIMIT);
      this.setState({
        pokemonSpecies: response.data.results,
      });
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    if (!this.state.pokemonSpecies.length) {
      return <h1>Loading...</h1>;
    }

    if (this.state.error) {
      return <h1>An error occurred</h1>;
    }

    return (
      <React.Fragment>
        <h1 className="heading">Pokemon Species</h1>
        <div className="card-wrapper">
          {this.state.pokemonSpecies.map(el => (
            <PokemonSpecie name={el.name} url={el.url} key={uniqueId()} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default PokemonSpecies;
