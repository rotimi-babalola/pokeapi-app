import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { getIdFromURL } from '../utils';
import pokeApiWrapper from '../api';

import Loading from './Loading';

import '../styles/pokemon-specie.scss';

class PokemonSpecie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speciesData: {},
      error: false,
    };
    this._isMounted = false;
    this.getEvolutionChainId = this.getEvolutionChainId.bind(this);
    this.renderCardContent = this.renderCardContent.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    // if the url is not available search by name
    let searchQuery;
    if (this.props.url) {
      searchQuery = getIdFromURL(this.props.url);
    } else {
      searchQuery = this.props.name;
    }

    try {
      const response = await pokeApiWrapper.getPokemonSpecie(searchQuery);
      // workaround to prevent setState on unmounted component warning
      if (this._isMounted) {
        this.setState({
          speciesData: response.data,
        });
      }
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getEvolutionChainId() {
    const { url } = this.state.speciesData.evolution_chain;
    return getIdFromURL(url);
  }

  renderCardContent() {
    const { showEvolutionButton, name } = this.props;

    if (this.state.error) {
      return <p>An error occurred fetching more data for this pokemon</p>;
    }

    if (isEmpty(this.state.speciesData)) {
      return <Loading size="small" />;
    }

    const evolutionChainId = this.getEvolutionChainId();

    return (
      <React.Fragment>
        <p className="card-text">
          Trigger Name:&nbsp;
          <span className="card-text__span">
            {this.props.triggerName || 'N/A'}
          </span>
        </p>
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
      </React.Fragment>
    );
  }

  render() {
    const { name } = this.props;

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            {this.renderCardContent()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

PokemonSpecie.defaultProps = {
  showEvolutionButton: true,
  url: null,
  triggerName: null,
};

PokemonSpecie.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  showEvolutionButton: PropTypes.bool,
  triggerName: PropTypes.string,
};

export default PokemonSpecie;
