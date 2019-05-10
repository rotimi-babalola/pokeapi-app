import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { getIdFromURL } from '../utils';
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
      return <p>Loading...</p>;
    }

    if (this.state.error) {
      return <p>An error occurred fetching data for this pokemon</p>;
    }

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
              Color:&nbsp;
              <span className="card-text__span">
                {this.state.speciesData.color.name}
              </span>
            </p>
            <p className="card-text">
              Shape:&nbsp;
              <span className="card-text__span">
                {this.state.speciesData.shape.name}
              </span>
            </p>
            <p className="card-text">
              Habitat:&nbsp;
              <span className="card-text__span">
                {this.state.speciesData.habitat.name}
              </span>
            </p>
            <p className="card-text">
              Growth Rate:&nbsp;
              <span className="card-text__span">
                {this.state.speciesData.growth_rate.name}
              </span>
            </p>
            <button type="button" className="btn btn-primary">
              Show Evolution Chain
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

PokemonSpecie.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PokemonSpecie;
