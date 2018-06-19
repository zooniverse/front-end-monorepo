/* global expect */
/* eslint-env browser, mocha */
/* eslint-disable func-names, prefer-arrow-callback */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import Paginator from '../src/components/paginator';

describe('Paginator', function() {
  it('mounts Paginator', function() {
    const wrapper = mount(<Paginator />);
    expect(wrapper.find(Paginator)).to.have.length(1);
  });

  describe('with default props', function() {
    let wrapper;

    beforeEach(function() {
      wrapper = mount(<Paginator totalItems={<span>Should not show</span>} />);
    });

    it('should have first and last buttons', function() {
      expect(wrapper.find('#first')).to.have.length(1);
      expect(wrapper.find('#last')).to.have.length(1);
    });
    it('should not show totalItems', function() {
      expect(wrapper.contains(<span>Should not show</span>)).to.equal(false);
    });
    it('should start on page 1', function() {
      expect(wrapper.prop('page')).to.equal(1);
    });
    it('should have pageKey of "page"', function() {
      expect(wrapper.prop('pageKey')).to.equal('page');
    });
    it('should include a page select input', function() {
      expect(wrapper.find('select')).to.have.length(1);
    });
    it('should disable first and previous if on first page', function() {
      const firstButton = wrapper.find('#first');
      const prevButton = wrapper.find('#previous');
      expect(firstButton.prop('disabled')).to.equal(true);
      expect(prevButton.prop('disabled')).to.equal(true);
    });
  });

  describe('on last page', function() {
    it('should disable last and next buttons', function() {
      const wrapper = mount(<Paginator page={5} pageCount={5} />);
      const lastButton = wrapper.find('#last');
      const nextButton = wrapper.find('#next');
      expect(lastButton.prop('disabled')).to.equal(true);
      expect(nextButton.prop('disabled')).to.equal(true);
    });
  });

  describe('with className prop provided', function() {
    it('should reflect className\'s styling', function() {
      const wrapper = mount(<Paginator className="customStyle" />);
      expect(wrapper.find(Paginator).hasClass('customStyle')).to.equal(true);
    });
  });

  describe('with props firstAndLast and pageSelector false', function() {
    it('should not show a first button, last button or page select', function() {
      const wrapper = mount(<Paginator firstAndLast={false} pageSelector={false} />);
      expect(wrapper.find('#first')).to.have.length(0);
      expect(wrapper.find('#last')).to.have.length(0);
      expect(wrapper.find('select')).to.have.length(0);
    });
  });

  describe('with props for first, previous, next and last labels', function() {
    it('should show the labels provided', function() {
      const firstLabel = 'Custom First';
      const previousLabel = <span>Custom Previous</span>;
      const nextLabel = 'Custom Next';
      const lastLabel = <p>Custom Last</p>;
      const wrapper = mount(<Paginator
        firstLabel={firstLabel}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        lastLabel={lastLabel}
      />);
      expect(wrapper.find('#first').text()).to.equal('Custom First');
      expect(wrapper.find('#previous').contains(previousLabel)).to.equal(true);
      expect(wrapper.find('#next').text()).to.equal('Custom Next');
      expect(wrapper.find('#last').contains(lastLabel)).to.equal(true);
    });
  });

  describe('with props itemCount true and totalItems defined', function() {
    it('should render totalItems', function() {
      const totalItems = <span>`1 - 5 of 10`</span>;
      const wrapper = mount(<Paginator itemCount={true} totalItems={totalItems} />);
      expect(wrapper.contains(totalItems)).to.equal(true);
    });
  });

  describe('with props page, pageKey and router provided', function() {
    let wrapper;
    const router = { push() {} };
    const spy = sinon.spy(router, 'push');

    beforeEach(function() {
      wrapper = mount(<Paginator page={5} pageCount={10} pageKey={'testPage'} router={router} />);
    });

    afterEach(function() {
      spy.resetHistory();
    });

    it('should start on page', function() {
      expect(wrapper.prop('page')).to.equal(5);
    });
    it('should add pageKey to param onChange', function() {
      wrapper.find('#next').simulate('click');
      expect(Object.keys(spy.args[0][0].query)).to.include('testPage');
    });
    it('should go to the next page', function() {
      wrapper.find('#next').simulate('click');
      expect(spy.args[0][0].query.testPage).to.equal(6);
    });
    it('should go to the last page', function() {
      wrapper.find('#last').simulate('click');
      expect(spy.args[0][0].query.testPage).to.equal(10);
    });
    it('should go to the previous page', function() {
      wrapper.find('#previous').simulate('click');
      expect(spy.args[0][0].query.testPage).to.equal(4);
    });
    it('should go to the first page', function() {
      wrapper.find('#first').simulate('click');
      expect(spy.args[0][0].query.testPage).to.equal(1);
    });
    it('should go to a page selected', function() {
      wrapper.find('select').simulate('change', { target: { value: 3 }});
      expect(spy.args[0][0].query.testPage).to.equal(3);
    });
  });

  describe('with onPageChange prop provided', function() {
    let wrapper;
    const onPageChange = sinon.spy();

    beforeEach(function() {
      wrapper = mount(<Paginator page={5} pageCount={10} onPageChange={onPageChange} />);
    });

    afterEach(function() {
      onPageChange.resetHistory();
    });

    it('should go to the next page', function() {
      wrapper.find('#next').simulate('click');
      expect(onPageChange.withArgs(6).calledOnce).to.equal(true);
    });
    it('should go to the last page', function() {
      wrapper.find('#last').simulate('click');
      expect(onPageChange.withArgs(10).calledOnce).to.equal(true);
    });
    it('should go to the previous page', function() {
      wrapper.find('#previous').simulate('click');
      expect(onPageChange.withArgs(4).calledOnce).to.equal(true);
    });
    it('should go to the first page', function() {
      wrapper.find('#first').simulate('click');
      expect(onPageChange.withArgs(1).calledOnce).to.equal(true);
    });
    it('should go to a page selected', function() {
      wrapper.find('select').simulate('change', { target: { value: 3 }});
      expect(onPageChange.withArgs(3).calledOnce).to.equal(true);
    });
  });

  describe('with props onClickNext and onClickPrev provided', function() {
    let wrapper;
    const onClickNext = sinon.spy();
    const onClickPrev = sinon.spy();

    beforeEach(function() {
      wrapper = mount(<Paginator page={5} pageCount={10} onClickNext={onClickNext} onClickPrev={onClickPrev} />);
    });
    it('should appropriately call onClickNext', function() {
      wrapper.find('#next').simulate('click');
      expect(onClickNext.withArgs(5).calledOnce).to.equal(true);
    });
    it('should appropriately call onClickPrev', function() {
      wrapper.find('#previous').simulate('click');
      expect(onClickPrev.withArgs(5).calledOnce).to.equal(true);
    });
  });
});
