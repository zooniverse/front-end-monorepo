import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Button, Heading } from 'grommet'
import { Markdownz, Media } from '@zooniverse/react-components'
import StepNavigation from './components/StepNavigation'
import SlideTutorial from './SlideTutorial'

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
    const wrapper = shallow(<SlideTutorial stepWithMedium={() => ({ step })} />)
    expect(wrapper).to.be.ok()
  })

  it('should render markdown from the step content', function () {
    const wrapper = shallow(<SlideTutorial stepWithMedium={() => ({ step })} />)
    expect(wrapper.find(Markdownz)).to.have.lengthOf(1)
  })

  it('should render StepNavigation component', function () {
    const wrapper = shallow(<SlideTutorial stepWithMedium={() => ({ step })} />)
    expect(wrapper.find(StepNavigation)).to.have.lengthOf(1)
  })

  it('should not render Media if there is not an attached medium', function () {
    const wrapper = shallow(<SlideTutorial stepWithMedium={() => ({ step })} />)
    expect(wrapper.find(Media)).to.have.lengthOf(0)
  })

  it('should render Media if an attached medium exists', function () {
    step.medium = medium.id
    const wrapper = shallow(<SlideTutorial stepWithMedium={() => ({ step, medium })} />)
    expect(wrapper.find(Media)).to.have.lengthOf(1)
  })

  it('should render the Heading on the first step', function () {
    const wrapper = shallow(
      <SlideTutorial
        activeStep={0}
        stepWithMedium={() => ({ step, medium })}
        steps={[{ step, medium }, { step, medium }]}
      />
    )
    expect(wrapper.find(Heading)).to.have.lengthOf(1)
  })

  it('should not render the Heading on the second step', function () {
    const wrapper = shallow(
      <SlideTutorial
        activeStep={1}
        stepWithMedium={() => ({ step, medium })}
        steps={[{ step, medium }, { step, medium }]}
      />
    )
    expect(wrapper.find(Heading)).to.have.lengthOf(0)
  })

  it('should render the Get Started button on the last step', function () {
    const wrapper = shallow(
      <SlideTutorial
        activeStep={1}
        stepWithMedium={() => ({ step, medium })}
        steps={[{ step, medium }, { step, medium }]}
      />
    )
    expect(wrapper.find(Button)).to.have.lengthOf(1)
  })

  it('should not render the Get Started button on the first step', function () {
    const wrapper = shallow(
      <SlideTutorial
        activeStep={0}
        stepWithMedium={() => ({ step, medium })}
        steps={[{ step, medium }, { step, medium }]}
      />
    )
    expect(wrapper.find(Button)).to.have.lengthOf(0)
  })

  it('should call props.onClick when Get Started is clicked', function () {
    const onClick = sinon.spy()
    const wrapper = shallow(
      <SlideTutorial
        activeStep={1}
        onClick={onClick}
        stepWithMedium={() => ({ step, medium })}
        steps={[{ step, medium }, { step, medium }]}
      />
    )
    wrapper.find(Button).simulate('click')
    expect(onClick).to.have.been.calledOnce()
  })
})
