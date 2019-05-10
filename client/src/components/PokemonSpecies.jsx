import React from 'react';
import { uniqueId } from 'lodash';
import pokeApiWrapper from '../api';
// import { getIdfromURL } from '../utils/getIdFromURL';
import PokemonSpecie from './PokemonSpecie';

import '../styles/pokemon-species.scss';

const LIMIT = 10;

class PokemonSpecies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonSpecies: [],
    };
  }

  componentDidMount() {
    pokeApiWrapper.getAllPokemonSpecies(LIMIT).then(response => {
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
        <h1 className="heading">Pokemon Species</h1>
        <ul>
          {this.state.pokemonSpecies.map(el => (
            <div key={uniqueId()} className="list-items-wrapper">
              <PokemonSpecie name={el.name} url={el.url} />
            </div>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default PokemonSpecies;
