/* global expect */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */

import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import DisplayNameSlugEditor from '../src/components/display-name-slug-editor';

const resource = {
  id: '3',
  display_name: 'resource-name',
  live: false,
  slug: 'owner/resource-name'
};

const orgResource = {
  id: '5',
  display_name: 'another-resource',
  listed_at: '2017-03-28T10:53:56.194Z',
  slug: 'another-owner/another-resource'
};

const liveResource = {
  id: '5',
  display_name: 'live-resource',
  live: true,
  slug: 'another-owner/live-resource'
};

const untitledProject = {
  id: '2',
  display_name: 'untitled-project',
  slug: 'owner/untitled-project'
};

const untitledOrg = {
  id: '2',
  display_name: 'untitled-organization',
  slug: 'owner/untitled-organization'
};

describe('<DisplayNameSlugEditor />', function() {
  let wrapper;

  before(function() {
    wrapper = shallow(<DisplayNameSlugEditor resource={resource} resourceType="project" />);
  });

  it('mounts', function() {
    expect(wrapper.instance()).to.be.an.instanceof(DisplayNameSlugEditor);
  });

  it('should render a text input', function() {
    expect(wrapper.find('input[type="text"]')).to.have.length(1);
  });

  it('should render help text about the url', function() {
    wrapper.setState({ url: 'projects/owner/resource-name' });
    expect(wrapper.find('small').text()).to.include('Try to keep it short and sweet.');
  });

  describe('component lifecycle', function() {
    const getResourceUrlSpy = sinon.spy(DisplayNameSlugEditor.prototype, 'getResourceUrl');

    before(function() {
      wrapper = mount(<DisplayNameSlugEditor resource={resource} resourceType="project" />);
    });

    describe('componentDidMount', function() {
      after(function() {
        getResourceUrlSpy.reset();
      });

      it('should call getResourceUrl', function() {
        expect(getResourceUrlSpy.calledOnce).to.be.true;
        expect(getResourceUrlSpy.calledWith(resource)).to.be.true;
      });

      it('should set value state as the resource display_name on componentDidMount', function() {
        expect(wrapper.state().value).to.equal(resource.display_name);
        expect(wrapper.find('input[type="text"]').props().value).to.equal(resource.display_name);
      });

      it('should set url to a concatenated string with the display_name and resourceType', function() {
        const url = `/projects/${resource.slug}`;
        expect(wrapper.state().url).to.equal(url);
        expect(wrapper.find('a').text()).to.equal(url);
      });
    });

    describe('componentWillReceiveProps', function() {
      before(function() {
        wrapper.setProps({ resource: orgResource });
      });

      it('calls getResourceUrl using nextProps.resource', function() {
        expect(getResourceUrlSpy.calledOnce).to.be.true;
        expect(getResourceUrlSpy.calledWith(orgResource)).to.be.true;
      });

      it('updates the value and url state', function() {
        const url = `/projects/${orgResource.slug}`;
        expect(wrapper.state().url).to.equal(url);
        expect(wrapper.find('a').text()).to.equal(url);
        expect(wrapper.state().value).to.equal(orgResource.display_name);
        expect(wrapper.find('input[type="text"]').props().value).to.equal(orgResource.display_name);
      });
    });
  });

  describe('input onChange', function() {
    let input;
    let value;
    let button;
    const onChangeSpy = sinon.spy(DisplayNameSlugEditor.prototype, 'handleInputChange');
    const undoNameChangeSpy = sinon.spy(DisplayNameSlugEditor.prototype, 'undoNameChange');
    const warnURLChangeSpy = sinon.spy(DisplayNameSlugEditor.prototype, 'warnURLChange');

    before(function() {
      wrapper = mount(<DisplayNameSlugEditor resource={resource} resourceType="project" />);
      input = wrapper.find('input[type="text"]');
      value = 'Lorem ipsum';
      input.simulate('change', { target: { value }});
      button = wrapper.find('button');
    });

    it('updates value state when input onChange event fires', function() {
      expect(onChangeSpy.calledOnce).to.be.true;
      expect(wrapper.state().value).to.equal(value);
    });

    it('calls warnURLChange when input onChange event fires', function() {
      expect(warnURLChangeSpy.calledOnce).to.be.true;
      expect(warnURLChangeSpy.calledWith(resource, value)).to.be.true;
      expect(warnURLChangeSpy.calledAfter(onChangeSpy)).to.be.true;
      warnURLChangeSpy.reset();
    });

    it('warns the user about URL changes', function() {
      expect(wrapper.state().warn).to.be.true;
      expect(button.text()).to.equal('Cancel');
    });

    it('returns the value state when value method called', function() {
      expect(wrapper.instance().value()).to.equal(value);
    });

    it('resets the value state to the original resource display_name when canceled', function() {
      button.simulate('click');
      expect(undoNameChangeSpy.calledOnce).to.be.true;
      expect(wrapper.state().value).to.equal(resource.display_name);
    });

    it('does not warn the user about URL changes if the slug includes "untitled-project"', function() {
      wrapper = mount(<DisplayNameSlugEditor resource={untitledProject} resourceType="project" />);
      input.simulate('change', { target: { value: 'a new name' }});
      expect(warnURLChangeSpy.calledOnce).to.be.true;
      expect(wrapper.state().warn).to.be.false;
      warnURLChangeSpy.reset();
    });

    it('does not warn the user about URL changes if the slug includes "untitled-organization"', function() {
      wrapper = mount(<DisplayNameSlugEditor resource={untitledOrg} resourceType="organization" />);
      input.simulate('change', { target: { value: 'a new name' }});
      expect(warnURLChangeSpy.calledOnce).to.be.true;
      expect(wrapper.state().warn).to.be.false;
    });
  });

  describe('when resource is listed or live', function() {
    let input;
    before(function() {
      wrapper = mount(<DisplayNameSlugEditor resource={liveResource} resourceType="project" />);
      input = wrapper.find('input[type="text"]');
    });

    it('disables the input if the resource is live', function() {
      expect(input.props().disabled).to.be.true;
    });

    it('disables the input if the resource is listed_at', function() {
      wrapper.setProps({ resource: orgResource });
      expect(input.props().disabled).to.be.true;
    });

    it('should render help text about why it is disabled', function() {
      expect(wrapper.find('small').text()).to.include("You cannot change a live project's name.");
    });
  });
});
