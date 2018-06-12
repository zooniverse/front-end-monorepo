/* global expect */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import StepThrough from '../src/components/step-through';

const children = [
  <p>test 1</p>,
  <p>test 2</p>,
  <p>test 3</p>
]

describe.skip('StepThrough', function() {
  it('shallow renders StepThrough', function() {
    const wrapper = shallow(<StepThrough />);
    expect(wrapper.instance()).to.be.an.instanceof(StepThrough);
  });

  describe('StepThrough render', function() {
    const previousStub = sinon.stub(StepThrough.prototype, 'goPrevious');
    const nextStub = sinon.stub(StepThrough.prototype, 'goNext');
    const goStub = sinon.stub(StepThrough.prototype, 'goTo');
    const wrapper = shallow(<StepThrough children={children} />);

    it('calls goPrevious on backwards navigate', function() {
      wrapper.find('button').at(0).simulate('click');
      sinon.assert.called(previousStub);
      previousStub.restore();
    });

    it('calls goNext on forwards navigate', function() {
      wrapper.find('button').at(1).simulate('click');
      sinon.assert.called(nextStub);
      nextStub.restore();
    });

    it('calls goTo on pip click', function() {
      wrapper.find('input').at(1).simulate('change');
      sinon.assert.called(goStub);
      goStub.restore();
    });

    it('displays the correct number of steps', function() {
      expect(wrapper.find('label').length).to.equal(3);
    });
  });

});
