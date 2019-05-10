import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { getIdFromURL } from '../utils/getIdFromURL';
import pokeApiWrapper from '../api';

import '../styles/pokemon-specie.scss';

class PokemonSpecie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speciesData: {},
      error: false,
    };
  }

  async componentDidMount() {
    const specieId = getIdFromURL(this.props.url);
    // make api call
    try {
      const response = await pokeApiWrapper.getPokemonSpecie(specieId);
      this.setState({
        speciesData: response.data,
      });
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const { name } = this.props;
    if (isEmpty(this.state.speciesData)) {
      return <h1>Loading...</h1>;
    }

    if (this.state.error) {
      return <p>An error occurred fetching data for this pokemon</p>;
    }

    return (
      <React.Fragment>
        <li className="list-items">
          <h4 className="pokemon-name">{`Name: ${name}`}</h4>
          <p>{`Color: ${this.state.speciesData.color.name}`}</p>
          <p>{`Shape: ${this.state.speciesData.shape.name}`}</p>
          <p>{`Habitat: ${this.state.speciesData.habitat.name}`}</p>
          <p>{`Growth Rate: ${this.state.speciesData.growth_rate.name}`}</p>
        </li>
        <button type="button">Show Evolution Chain</button>
      </React.Fragment>
    );
  }
}

PokemonSpecie.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PokemonSpecie;
