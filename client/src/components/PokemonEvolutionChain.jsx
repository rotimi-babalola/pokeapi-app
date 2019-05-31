import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, uniqueId } from 'lodash';
import { Link } from 'react-router-dom';

import pokeApiWrapper from '../api';
import { getEvolutionChain } from '../utils';

import PokemonSpecie from './PokemonSpecie';
import Loading from './Loading';

import '../styles/pokemon-evolution-chain.scss';

class PokemonEvolutionChain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evolutionChain: [],
      error: false,
    };
  }

  async componentDidMount() {
    const evolutionId = this.props.match.params.id;
    try {
      const response = await pokeApiWrapper.getPokemonEvolutionData(
        evolutionId,
      );
      this.setState({
        evolutionChain: getEvolutionChain(response.data),
      });
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const { name } = this.props.match.params;
    if (isEmpty(this.state.evolutionChain)) {
      return <Loading />;
    }
    if (this.state.error) {
      return <p>An error occurred fetching evolution data</p>;
    }

    return (
      <React.Fragment>
        <h3>{`Evolution chain for ${name}`}</h3>
        <div className="evolution-chain-wrapper">
          {this.state.evolutionChain.map(el => (
            <PokemonSpecie
              name={el.species_name}
              url={el.url}
              key={uniqueId()}
              triggerName={el.trigger_name}
              showEvolutionButton={false}
            />
          ))}
        </div>
        <Link to="/">
          <button type="button" className="btn btn-primary home">
            Go home
          </button>
        </Link>
      </React.Fragment>
    );
  }
}

PokemonEvolutionChain.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default PokemonEvolutionChain;
