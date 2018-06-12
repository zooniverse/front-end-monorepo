/* global expect */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import { mount, render, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import FileButton from '../src/components/file-button';

describe('FileButton', function() {
  it('mounts FileButton', function() {
    const wrapper = mount(<FileButton />);
    expect(wrapper.instance()).to.be.an.instanceof(FileButton);
  });

  describe('onChange event', function() {
    const onSelect = sinon.spy();
    const wrapper = mount(<FileButton onSelect={onSelect} />);

    it('calls this.props.onSelect', function() {
      wrapper.find('input').simulate('change');
      expect(onSelect.calledOnce).to.equal(true);
    });
  });
});
