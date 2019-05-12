import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import PokemonSpecies from '../components/PokemonSpecies';

import pokemonSpeciesData from '../mocks/pokemon-species';

describe('<PokemonSpecies /> component', () => {
  const wrapper = shallow(<PokemonSpecies />);

  afterEach(() => {
    wrapper.setState({ pokemonSpecies: [], error: false });
  });

  it('shows the <Loading /> component', () => {
    expect(wrapper.find('Loading').exists()).toBeTruthy();
    expect(wrapper.find('PokemonSpecie').exists()).toBeFalsy();
  });

  it('renders the <PokemonSpecies /> component', () => {
    wrapper.setState({ pokemonSpecies: pokemonSpeciesData });

    expect(wrapper.find('PokemonSpecie').exists()).toBeTruthy();
    expect(wrapper.find('Controls').exists()).toBeTruthy();
    expect(wrapper.find('PokemonSpecie').length).toEqual(
      pokemonSpeciesData.length,
    );
    expect(wrapper.find('.heading').exists()).toBeTruthy();
    expect(wrapper.find('.heading').text()).toEqual('Pokemon App');
  });

  it('shows error text', () => {
    wrapper.setState({ error: true });
    expect(wrapper.find('h1').text()).toEqual('An error occurred');
  });
});
