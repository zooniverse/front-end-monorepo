import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TaskArea from './TaskArea';

describe('TaskArea', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<TaskArea />)
    expect(wrapper).to.have.lengthOf(1)
  })
})