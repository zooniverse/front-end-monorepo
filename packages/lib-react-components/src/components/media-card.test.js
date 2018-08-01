/* global expect */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import MediaCard from './media-card';

const imageSrc = 'test.png';
const videoSrc = 'test.mp4';
const children = <p>Tutorial Content</p>;

describe('MediaCard', function() {
  it('shallow renders MediaCard', function() {
    const wrapper = shallow(<MediaCard src={imageSrc} />);
    expect(wrapper.instance()).to.be.an.instanceof(MediaCard);
  });

  describe('MediaCard render', function() {
    let wrapper;

    it('correctly displays a video element', function() {
      wrapper = shallow(<MediaCard src={videoSrc} />);
      expect(wrapper.find('video').length).to.equal(1);
    });

    it('correctly displays an image element', function() {
      wrapper = shallow(<MediaCard src={imageSrc} />);
      expect(wrapper.find('img').length).to.equal(1);
    });

    it('correctly renders child content', function() {
      wrapper = shallow(<MediaCard src={imageSrc} children={children} />);
      expect(wrapper.find('p').text()).to.equal('Tutorial Content');
    });
  });

});
