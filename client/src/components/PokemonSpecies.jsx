import React from 'react';
import { uniqueId } from 'lodash';

import pokeApiWrapper from '../api';

import PokemonSpecie from './PokemonSpecie';
import Controls from './Controls';
import Loading from './Loading';

import '../styles/pokemon-species.scss';

const LIMIT = 12;

class PokemonSpecies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonSpecies: [],
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
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

  async handleChange(evt) {
    const sortByField = evt.target.value;

    const { pokemonSpecies } = this.state;

    if (sortByField !== 'default') {
      const sortedSpecies = pokemonSpecies.slice().sort((a, b) => {
        if (a[sortByField] < b[sortByField]) {
          return -1;
        }
        if (a[sortByField] > b[sortByField]) {
          return 1;
        }
        return 0;
      });

      this.setState({
        pokemonSpecies: sortedSpecies,
      });
    } else {
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
  }

  render() {
    if (!this.state.pokemonSpecies.length) {
      return <Loading />;
    }

    if (this.state.error) {
      return <h1>An error occurred</h1>;
    }

    return (
      <React.Fragment>
        <h1 className="heading">Pokemon Species</h1>
        <Controls onChange={this.handleChange} />
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
