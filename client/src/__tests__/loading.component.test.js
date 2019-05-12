import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Loading from '../components/Loading';

describe('<Loading /> component', () => {
  let wrapper = shallow(<Loading />);

  it('renders <Loading /> component', () => {
    expect(wrapper.find('.loading-wrapper').exists()).toBeTruthy();
    expect(wrapper.find('.sr-only').text()).toEqual('Loading...');
  });

  it('defaults to size large', () => {
    expect(wrapper.find('.spinner-border.large').exists()).toBeTruthy();
  });

  it('changes size', () => {
    const props = {
      size: 'small',
    };

    wrapper = shallow(<Loading {...props} />);
    expect(wrapper.find('.spinner-border.small').exists()).toBeTruthy();
  });
});
