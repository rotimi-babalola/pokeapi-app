import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    this.getEvolutionChainId = this.getEvolutionChainId.bind(this);
  }

  async componentDidMount() {
    // if the url is not available search by name
    let searchQuery;
    if (this.props.url) {
      searchQuery = getIdFromURL(this.props.url);
    } else {
      searchQuery = this.props.name;
    }
    // make api call
    try {
      const response = await pokeApiWrapper.getPokemonSpecie(searchQuery);
      this.setState({
        speciesData: response.data,
      });
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  getEvolutionChainId() {
    const { url } = this.state.speciesData.evolution_chain;
    return getIdFromURL(url);
  }

  render() {
    const { name, showEvolutionButton } = this.props;
    if (isEmpty(this.state.speciesData)) {
      return <p>Loading...</p>;
    }

    if (this.state.error) {
      return <p>An error occurred fetching data for this pokemon</p>;
    }

    const evolutionChainId = this.getEvolutionChainId();

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
            {showEvolutionButton && (
              <Link to={`/evolution-chain/${evolutionChainId}/${name}`}>
                <button type="button" className="btn btn-primary">
                  Show Evolution Chain
                </button>
              </Link>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

PokemonSpecie.defaultProps = {
  showEvolutionButton: true,
};

PokemonSpecie.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  showEvolutionButton: PropTypes.bool,
};

export default PokemonSpecie;
