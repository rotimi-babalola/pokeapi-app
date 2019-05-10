import React from 'react';
import PropTypes from 'prop-types';

import '../styles/pokemon-specie.scss';

class PokemonSpecie extends React.Component {
  componentDidMount() {
    // make api call
  }

  render() {
    const { name, url } = this.props;
    return (
      <React.Fragment>
        <li className="list-items">
          <h4>{`Name: ${name}`}</h4>
          <p>{url}</p>
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
