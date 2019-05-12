import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import PokemonSpecie from '../components/PokemonSpecie';

import pokemonSpecieData from '../mocks/pokemon-species';

describe('<PokemonSpecie /> component', () => {
  const props = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  };

  let wrapper = shallow(<PokemonSpecie {...props} />);

  afterEach(() => {
    wrapper.setState({ speciesData: {} });
  });

  it('renders <PokemonSpecie /> component', () => {
    expect(wrapper.find('.card')).toBeTruthy();
    expect(wrapper.find('.card-title').text()).toEqual(props.name);
    expect(wrapper.find('Loading')).toBeTruthy();
  });

  it('sets state', () => {
    wrapper.setState({ speciesData: pokemonSpecieData });
    expect(wrapper.find('.card-text')).toBeTruthy();
    expect(wrapper.find('.card-text__span')).toBeTruthy();
    expect(wrapper.find('.card-text').length).toEqual(4);
    expect(wrapper.find('.card-text__span').length).toEqual(4);
    expect(
      wrapper
        .find('.card-text')
        .first()
        .text()
        .includes('Color'),
    ).toBeTruthy();
  });

  it('shows evolution chain button by default', () => {
    wrapper.setState({ speciesData: pokemonSpecieData });
    expect(wrapper.find('.btn.btn-primary')).toBeTruthy();
    expect(wrapper.find('.btn.btn-primary').text()).toEqual(
      'Show Evolution Chain',
    );
  });

  it('hides evolution chain button', () => {
    wrapper = shallow(<PokemonSpecie {...props} showEvolutionButton={false} />);
    wrapper.setState({ speciesData: pokemonSpecieData });

    expect(wrapper.find('.btn.btn-primary').exists()).toBeFalsy();
  });
});
