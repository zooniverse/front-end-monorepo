import { shallow } from 'enzyme';
import React from 'react';
import Nav from './nav';

describe('Header', function () {
  it('should render without crashing', function () {
    shallow(<Nav />);
  });
});
