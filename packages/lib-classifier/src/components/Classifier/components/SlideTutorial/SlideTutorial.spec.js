import React from 'react'
import { shallow } from 'enzyme'
import { Markdownz, Media } from '@zooniverse/react-components'
import { Paragraph } from 'grommet'
import StepNavigation from './components/StepNavigation'
import SlideTutorial from './SlideTutorial'
import en from './locales/en'

const step = {
  content: '# Welcome'
}

const medium = {
  content_type: 'image/gif',
  external_link: false,
  href: '/tutorials/20/attached_images/47564',
  id: '47564',
  media_type: 'tutorial_attached_image',
  metadata: { filename: 'card1-hello.gif' },
  src: 'https://panoptes-uploads.zooniverse.org/staging/tutorial_attached_image/1ab2bd93-b422-4d10-a700-fa34d4e7e716.gif'
}

describe('SlideTutorial', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SlideTutorial.wrappedComponent stepWithMedium={{}} />)
    expect(wrapper).to.be.ok
  })

  it('should render an error message if props.stepWithMedium is not defined', function () {
    const wrapper = shallow(<SlideTutorial.wrappedComponent stepWithMedium={{}} />)
    expect(wrapper.contains(<Paragraph>{en.SlideTutorial.error}</Paragraph>)).to.be.true
  })

  it('should render an error message if props.stepWithMedium is an empty object', function () {
    const wrapper = shallow(<SlideTutorial.wrappedComponent stepWithMedium={{}} />)
    expect(wrapper.contains(<Paragraph>{en.SlideTutorial.error}</Paragraph>)).to.be.true
  })

  it('should render markdown from the step content', function () {
    const wrapper = shallow(<SlideTutorial.wrappedComponent stepWithMedium={{ step }} />)
    expect(wrapper.find(Markdownz)).to.have.lengthOf(1)
  })

  it('should render StepNavigation component', function () {
    const wrapper = shallow(<SlideTutorial.wrappedComponent stepWithMedium={{ step }} />)
    expect(wrapper.find(StepNavigation)).to.have.lengthOf(1)
  })

  it('should not render Media if there is not an attached medium', function () {
    const wrapper = shallow(<SlideTutorial.wrappedComponent stepWithMedium={{ step }} />)
    expect(wrapper.find(Media)).to.have.lengthOf(0)
  })

  it('should render Media if an attached medium exists', function () {
    step.medium = medium.id
    const wrapper = shallow(<SlideTutorial.wrappedComponent stepWithMedium={{ step, medium }} />)
    expect(wrapper.find(Media)).to.have.lengthOf(1)
  })
})
