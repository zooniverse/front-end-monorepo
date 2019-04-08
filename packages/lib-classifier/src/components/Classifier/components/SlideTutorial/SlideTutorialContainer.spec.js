import React from 'react'
import { shallow } from 'enzyme'
import { Paragraph } from 'grommet'
import SlideTutorialContainer from './SlideTutorialContainer'
import en from './locales/en'

describe('SlideTutorialContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SlideTutorialContainer.wrappedComponent stepWithMedium={{}} />)
    expect(wrapper).to.be.ok
  })

  it('should render an error message if props.stepWithMedium is not defined', function () {
    const wrapper = shallow(<SlideTutorialContainer.wrappedComponent stepWithMedium={{}} />)
    expect(wrapper.contains(<Paragraph>{en.SlideTutorial.error}</Paragraph>)).to.be.true
  })

  it('should render an error message if props.stepWithMedium is an empty object', function () {
    const wrapper = shallow(<SlideTutorialContainer.wrappedComponent stepWithMedium={{}} />)
    expect(wrapper.contains(<Paragraph>{en.SlideTutorial.error}</Paragraph>)).to.be.true
  })
})
