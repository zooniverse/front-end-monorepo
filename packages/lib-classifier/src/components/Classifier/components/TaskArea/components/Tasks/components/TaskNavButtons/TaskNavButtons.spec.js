/* eslint
  func-names: 0,
  import/no-extraneous-dependencies: ["error", { "devDependencies": true }]
  prefer-arrow-callback: 0,
  "react/jsx-boolean-value": ["error", "always"]
*/

import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import TaskNavButtons, { ButtonsWrapper } from './TaskNavButtons';

const store = {
  subscribe: () => { },
  dispatch: () => { },
  getState: () => ({ userInterface: { theme: 'light' } })
};

const mockReduxStore = {
  context: { store },
  childContextTypes: { store: PropTypes.object.isRequired }
};

const classification = { gold_standard: false };

const subject = { id: '1' };

const project = { slug: 'zooniverse/my-project' };

describe('TaskNavButtons', function() {
  it('should render without crashing', function () {
    const wrapper = shallow(<TaskNavButtons classification={classification} project={project} subject={subject} />);
    expect(wrapper).to.be.ok;
  });

  it('should not render a NextButton component if props.showNextButton is false and and props.completed is false', function () {
    const wrapper = shallow(<TaskNavButtons classification={classification} project={project} subject={subject} />);
    expect(wrapper.find('NextButton')).to.have.lengthOf(0);
  });

  describe('when props.showNextButton is true', function() {
    let wrapper;
    before(function () {
      wrapper = mount(<TaskNavButtons classification={classification} project={project} subject={subject} showNextButton={true} />, mockReduxStore);
    });

    it('should render a NextButton component', function () {
      wrapper.setProps({ showNextButton: true });
      expect(wrapper.find('NextButton')).to.have.lengthOf(1);
    });

    it('should render a ButtonsWrapper component', function () {
      expect(wrapper.find(ButtonsWrapper)).to.have.lengthOf(1);
    });

    it('should not render a BackButton if props.showBackButton is false', function() {
      expect(wrapper.find('BackButton')).to.have.lengthOf(0);
    });

    it('should render a BackButton if props.showBackButton is true', function () {
      wrapper.setProps({ showBackButton: true });
      expect(wrapper.find('BackButton')).to.have.lengthOf(1);
    });

    it('should disable the Next button when waiting for a required answer.', function () {
      wrapper.setProps({ waitingForAnswer: true });
      expect(wrapper.find('NextButton').prop('disabled')).to.be.true;
    });
  });

  describe('when props.completed is true and props.showNextButton is false', function() {
    let wrapper;
    before(function () {
      wrapper = mount(<TaskNavButtons completed={true} classification={classification} project={project} subject={subject} />, mockReduxStore);
    });

    it('should render a NextButton component if props.completed is true and props.showNextButton is false', function () {
      expect(wrapper.find('NextButton')).to.have.lengthOf(1);
    });

    it('should render a ButtonsWrapper component', function() {
      expect(wrapper.find(ButtonsWrapper)).to.have.lengthOf(1);
    });

    it('should render a TalkLink component', function () {
      expect(wrapper.find('TalkLink')).to.have.lengthOf(1);
    });
  });

  describe('the default rendering', function() {
    let wrapper;
    before(function () {
      wrapper = mount(<TaskNavButtons classification={classification} project={project} subject={subject} />, mockReduxStore);
    });

    it('should render a DoneButton component', function() {
      expect(wrapper.find('DoneButton')).to.have.lengthOf(1);
    });

    it('should render a ButtonsWrapper component', function () {
      expect(wrapper.find(ButtonsWrapper)).to.have.lengthOf(1);
    });

    it('should render a BackButton if props.showBackButton is true', function () {
      wrapper.setProps({ showBackButton: true });
      expect(wrapper.find('BackButton')).to.have.lengthOf(1);
    });

    it('should not render a TalkLink component if props.showDoneAndTalkLink is false', function() {
      expect(wrapper.find('TalkLink')).to.have.lengthOf(0);
    });

    it('should render a TalkLink component if props.showDoneAndTalkLink is true', function () {
      wrapper.setProps({ showDoneAndTalkLink: true });
      expect(wrapper.find('TalkLink')).to.have.lengthOf(1);
    });

    it('should disable the Done button when waiting for a required answer.', function () {
      wrapper.setProps({ waitingForAnswer: true });
      expect(wrapper.find('DoneButton').prop('disabled')).to.be.true;
    });
  });
});
