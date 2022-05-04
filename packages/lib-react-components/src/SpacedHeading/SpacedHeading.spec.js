import { shallow } from 'enzyme'
import React from 'react'
import { Heading } from 'grommet'
import SpacedText from '../SpacedText'
import SpacedHeading from './SpacedHeading'

const MOCK_PROPS = {
  children: 'Foobar',
  level: 1
}

describe('Component > SpacedHeading', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<SpacedHeading {...MOCK_PROPS} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a Heading component', function () {
    expect(wrapper.find(Heading)).to.have.lengthOf(1)
  })

  // What's really being tested here? props are an implementation detail
  // This looks like styling that could be tested in storybook instead
  it('should set the expected props on the Heading component', function () {
    let headingProps = wrapper.props()
    expect(headingProps.level).to.equal(1)
    expect(headingProps.className).to.be.empty()
    expect(headingProps.size).to.equal('medium')
    wrapper.setProps({ className: 'heading', level: 2, size: 'small' })
    headingProps = wrapper.props()
    expect(headingProps.level).to.equal(2)
    expect(headingProps.className).to.equal('heading')
    expect(headingProps.size).to.equal('small')
  })

  it('should render a SpacedText component', function () {
    expect(wrapper.find(SpacedText)).to.have.lengthOf(1)
  })

  // Same here, this looks like styling testing not meant as a unit test
  it('should set the expected props for the SpacedText component', function () {
    let textProps = wrapper.find(SpacedText).props()
    expect(textProps.color).to.deep.equal({
      dark: 'neutral-6',
      light: 'black'
    })
    expect(textProps.weight).to.equal('bold')
    wrapper.setProps({ color: 'accent-1', weight: 'normal' })
    textProps = wrapper.find(SpacedText).props()
    expect(textProps.color).to.equal('accent-1')
    expect(textProps.weight).to.equal('normal')
  })
})
