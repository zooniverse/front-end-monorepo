/* global expect */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import Tutorial from '../src/components/tutorial';

const tutorial = {
  steps: [
    { content: 'test' },
    { content: 'test' }
  ]
};

describe('Tutorial', function() {
  it('shallow renders Tutorial', function() {
    const wrapper = shallow(<Tutorial />);
    expect(wrapper.instance()).to.be.an.instanceof(Tutorial);
  });

  describe('Tutorial render', function() {
    const clickStub = sinon.stub(Tutorial.prototype, 'handleNextClick');
    let wrapper = shallow(<Tutorial tutorial={tutorial} />);

    it('displays a navigation button', function() {
      expect(wrapper.find('button').at(0).text()).to.equal("Continue");
    });

    it('displays the correct number of tutorial steps', function() {
      expect(wrapper.find('MediaCard').length).to.equal(2);
    });

    it('will navigate through tutorial steps', function() {
      wrapper.find('button').at(0).simulate('click');
      sinon.assert.called(clickStub);
      clickStub.restore();
    });
  });

});
