import React from 'react';
import { uniqueId, isEmpty } from 'lodash';

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
      filtered: [],
      searchQuery: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.filterSpecies = this.filterSpecies.bind(this);
    this.renderItems = this.renderItems.bind(this);
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

  filterSpecies(query) {
    const { pokemonSpecies } = this.state;
    const filtered = pokemonSpecies.filter(el => el.name.includes(query));
    this.setState({
      filtered,
    });
  }

  handleInputChange(evt) {
    const searchQuery = evt.target.value;
    this.setState(
      {
        searchQuery,
      },
      () => this.filterSpecies(this.state.searchQuery),
    );
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

  renderItems() {
    if (this.state.searchQuery && !isEmpty(this.state.filtered)) {
      return this.state.filtered.map(el => (
        <PokemonSpecie name={el.name} url={el.url} key={uniqueId()} />
      ));
    }
    if (this.state.searchQuery && isEmpty(this.state.filtered)) {
      return <p>Pokemon not found :(</p>;
    }
    return this.state.pokemonSpecies.map(el => (
      <PokemonSpecie name={el.name} url={el.url} key={uniqueId()} />
    ));
  }

  render() {
    if (this.state.error) {
      return <h1>An error occurred</h1>;
    }

    if (!this.state.pokemonSpecies.length) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <h1 className="heading">Pokemon App</h1>
        <Controls
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
        />
        <div className="card-wrapper">{this.renderItems()}</div>
      </React.Fragment>
    );
  }
}

export default PokemonSpecies;
