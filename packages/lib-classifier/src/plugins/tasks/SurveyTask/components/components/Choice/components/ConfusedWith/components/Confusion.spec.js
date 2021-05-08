import { shallow } from 'enzyme'
import { Button, Carousel, Paragraph } from 'grommet'
import React from 'react'
import sinon from 'sinon'
import { PrimaryButton, SpacedHeading } from '@zooniverse/react-components'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import en from '../locales/en'
import Confusion from './Confusion'
import { expect } from 'chai'

const ELAND = mockTask.choices.LND
const HUMAN = mockTask.choices.HMN

describe('Component > Confusion', function () {
  let wrapper, handleChoiceSpy, onCloseSpy

  before(function () {
    handleChoiceSpy = sinon.spy()
    onCloseSpy = sinon.spy()
    wrapper = shallow(
      <Confusion
        confusion={ELAND}
        confusionId='LND'
        confusionText='Test confusion text.'
        handleChoice={handleChoiceSpy}
        images={mockTask.images}
        onClose={onCloseSpy}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a section title', function () {
    expect(wrapper.find(SpacedHeading).children().text()).to.equal(ELAND.label)
  })

  it('should not render Carousel with choice without images', function () {
    wrapper.setProps({ confusion: HUMAN, confusionId: 'HMN' })
    expect(wrapper.find(Carousel)).to.have.lengthOf(0)
  })

  it('should render Carousel with choice with images', function () {
    wrapper.setProps({ confusion: ELAND, confusionId: 'LND' })
    expect(wrapper.find(Carousel)).to.have.lengthOf(1)
  })

  it('should render confusion text', function () {
    expect(wrapper.find(Paragraph).text()).to.equal('Test confusion text.')
  })

  it('should render a "Cancel" button', function () {
    expect(wrapper.find(Button)).to.have.lengthOf(1)
    expect(wrapper.find(Button).props().label).to.equal(en.ConfusedWith.cancel)
  })

  it('should call onClose when the Cancel button is clicked', function () {
    expect(onCloseSpy).to.not.have.been.called()
    wrapper.find(Button).simulate('click')
    expect(onCloseSpy).to.have.been.calledOnce()
  })

  it('should render a "I think it\'s this" button', function () {
    expect(wrapper.find(PrimaryButton)).to.have.lengthOf(1)
    expect(wrapper.find(PrimaryButton).props().label).to.equal(en.ConfusedWith.itsThis)
  })

  it('should call handleChoice with confusion ID when the "I think it\'s this" button is clicked', function () {
    expect(handleChoiceSpy).to.not.have.been.called()
    wrapper.find(PrimaryButton).simulate('click')
    expect(handleChoiceSpy).to.have.been.calledOnceWith('LND')
  })
})
