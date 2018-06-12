/* global expect */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import { mount, render } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import MediaIcon from '../src/components/media-icon';

const RESOURCE_WITH_METADATA = {
  delete: () => (new Promise((resolve) => { resolve(true); })),
  id: '1',
  metadata: { filename: 'kitty.jpg' },
  src: 'http://placekitten.com/200/300',
};

const RESOURCE_WITHOUT_METADATA = {
  delete: () => (new Promise((resolve) => { resolve(true); })),
  id: '1',
  src: 'http://placekitten.com/200/300',
};

describe('MediaIcon', function() {
  it('mounts MediaIcon', function() {
    const wrapper = mount(<MediaIcon resource={RESOURCE_WITH_METADATA} />);
    expect(wrapper.instance()).to.be.an.instanceof(MediaIcon);
  });

  describe('MediaIcon render', function() {
    let wrapper = render(<MediaIcon resource={RESOURCE_WITH_METADATA} />);

    it('renders a thumbnail img using the resource src', function() {
      const thumbnail = 'https://thumbnails.zooniverse.org/999x80/placekitten.com/200/300';
      expect(wrapper.find('img').attr('src')).to.equal(thumbnail);
    });

    it('renders the label from the resource metadata', function() {
      expect(wrapper.find('.media-icon-label').text()).to.equal(RESOURCE_WITH_METADATA.metadata.filename);
    });

    it('renders a textarea using metadata', function() {
      expect(wrapper.find('textarea')).to.have.length(1);
    });

    it('does not render a textarea without metadata', function() {
      wrapper = render(<MediaIcon resource={RESOURCE_WITHOUT_METADATA} />);
      expect(wrapper.find('textarea')).to.have.length(0);
    });
  });

  describe('onDelete event', function() {
    it('calls this.props.onDelete', function() {
      const onDelete = sinon.spy();
      const wrapper = mount(<MediaIcon resource={RESOURCE_WITH_METADATA} onDelete={onDelete} />);
      wrapper.find('.media-icon-delete-button').simulate('click');

      // wait a little time for the event handling inside MediaIcon, or else
      // we'll check to see if the function has been called too soon
      setTimeout(() =>
        expect(onDelete.calledOnce).to.equal(true),
      100);
    });
  });
});
