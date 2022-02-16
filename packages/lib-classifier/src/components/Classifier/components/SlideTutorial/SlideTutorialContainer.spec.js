import React from 'react'
import { shallow } from 'enzyme'
import { Paragraph } from 'grommet'
import { SlideTutorialContainer } from './SlideTutorialContainer'
/** useTranslation will simply return the translation key in a test environment */

describe('SlideTutorialContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SlideTutorialContainer stepWithMedium={{}} />)
    expect(wrapper).to.be.ok()
  })

  it('should render an error message if props.stepWithMedium is not defined', function () {
    const wrapper = shallow(<SlideTutorialContainer stepWithMedium={{}} />)
    expect(wrapper.contains(<Paragraph>SlideTutorial.error</Paragraph>)).to.be.true()
  })

  it('should render an error message if props.stepWithMedium is an empty object', function () {
    const wrapper = shallow(<SlideTutorialContainer stepWithMedium={{}} />)
    expect(wrapper.contains(<Paragraph>SlideTutorial.error</Paragraph>)).to.be.true()
  })
})
