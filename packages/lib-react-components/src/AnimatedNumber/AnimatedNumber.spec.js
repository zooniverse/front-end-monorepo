import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStory } from '@storybook/react'
import sinon from 'sinon'

import Meta, * as Stories from './AnimatedNumber.stories'
import { prefersReducedMotion } from './AnimatedNumber'

describe('AnimatedNumber', function () {
  let oldIntersectionObserver
  /*
  * The tests run in Node, so we need to mock the IntersectionObserver
  * and manually set mock entries.
  */
  const mockEntries = [{
    isIntersecting: true,
    intersectionRatio: 1
  }]

  class MockIntersectionObserver {
    constructor(fn) {
      this.fn = fn
    }
    observe() {
      this.fn(mockEntries)
    }
    unobserve() { }
    disconnect() { }
  }

  beforeEach(function () {
    oldIntersectionObserver = window.IntersectionObserver
    window.IntersectionObserver = MockIntersectionObserver
  })

  afterEach(function () {
    window.IntersectionObserver = oldIntersectionObserver
  })

  describe('without any animation', function () {
    describe('default behaviour', function () {
      it('should animate the number', async function () {
        const Story = composeStory(Stories.Default, Meta)
        render(<Story />)
        expect(prefersReducedMotion()).to.be.true()
        const number = document.querySelector('span')
        expect(number.textContent).to.equal('0')
        await waitFor(() => {
          expect(number.textContent).to.equal('123,456')
        })
      })
    })
    
    describe('with 0', function () {
      it('should not animate the number', async function () {
        const Story = composeStory(Stories.Zero, Meta)
        render(<Story />)
        expect(prefersReducedMotion()).to.be.true()
        const number = document.querySelector('span')
        expect(number.textContent).to.equal('0')
        await waitFor(() => {
          expect(number.textContent).to.equal('0')
        })
      })
    })

    describe('updating after the animation', function () {
      it('should update the number', async function () {
        const user = userEvent.setup()
        const Story = composeStory(Stories.UpdateTheValue, Meta)
        render(<Story />)
        expect(prefersReducedMotion()).to.be.true()
        const number = document.querySelector('span')
        expect(number.textContent).to.equal('0')
        await waitFor(() => {
          expect(number.textContent).to.equal('10')
        })
        await user.click(document.querySelector('button'))
        await waitFor(() => {
          expect(number.textContent).to.equal('11')
        })
      })
    })
  
    describe('with a deferred value', function () {
      it('should animate the number', async function () {
        const clock = sinon.useFakeTimers({
          shouldClearNativeTimers: true
        })
        const Story = composeStory(Stories.DeferredAnimation, Meta)
        render(<Story />)
        expect(prefersReducedMotion()).to.be.true()
        const number = document.querySelector('span')
        expect(number.textContent).to.equal('0')
        // wait 2000ms for the value prop to change
        clock.tick(2000)
        clock.restore()
        expect(number.textContent).to.equal('0')
        await waitFor(() => {
          expect(number.textContent).to.equal('700,000,000')
        })
      })
    })
  })

  describe('with animation', function() {
    /*
    * Override the slow test warning threshold
    * as the d3 animations take ~1000ms to run.
    */
    this.slow(3000)

    beforeEach(function() {
      sinon.stub(window, 'matchMedia').returns({
        matches: false
      })
    })

    afterEach(function() {
      window.matchMedia.restore()
    })

    describe('default behaviour', function () {
      it('should animate the number', async function () {
        const Story = composeStory(Stories.Default, Meta)
        render(<Story />)
        expect(prefersReducedMotion()).to.be.false()
        const number = document.querySelector('span')
        expect(number.textContent).to.equal('0')
        await waitFor(() => {
          expect(number.textContent).to.equal('123,456')
        }, { timeout: 2000 })
      })
    })
    
    describe('with 0', function () {
      it('should not animate the number', async function () {
        const Story = composeStory(Stories.Zero, Meta)
        render(<Story />)
        expect(prefersReducedMotion()).to.be.false()
        const number = document.querySelector('span')
        expect(number.textContent).to.equal('0')
        await waitFor(() => {
          expect(number.textContent).to.equal('0')
        })
      })
    })
  
    describe('updating after the animation', function () {
      it('should update the number when the animation completes', async function () {
        const user = userEvent.setup()
        const Story = composeStory(Stories.UpdateTheValue, Meta)
        render(<Story />)
        expect(prefersReducedMotion()).to.be.false()
        const number = document.querySelector('span')
        expect(number.textContent).to.equal('0')
        await waitFor(() => {
          expect(number.textContent).to.equal('10')
        })
        await user.click(document.querySelector('button'))
        await waitFor(() => {
          expect(number.textContent).to.equal('11')
        })
      })
    })

    describe('with a deferred value', function () {
      it('should animate the number', async function () {
        const clock = sinon.useFakeTimers({
          shouldClearNativeTimers: true
        })
        const Story = composeStory(Stories.DeferredAnimation, Meta)
        render(<Story />)
        expect(prefersReducedMotion()).to.be.false()
        const number = document.querySelector('span')
        expect(number.textContent).to.equal('0')
        // wait 2000ms for the value prop to change
        clock.tick(2000)
        expect(number.textContent).to.equal('0')
        clock.restore()
        await waitFor(() => {
          expect(number.textContent).to.equal('700,000,000')
        }, { timeout: 2000 })
      })
    })
  })
})
