import { shallow } from 'enzyme'
import React from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import en from './locales/en'
import ConfusedWith, { StyledDropButton } from './ConfusedWith'

const KUDU = mockTask.choices.KD

describe('Component > ConfusedWith', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <ConfusedWith
        choices={mockTask.choices}
        confusions={KUDU.confusions}
        confusionsOrder={KUDU.confusionsOrder}
        images={mockTask.images}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a section title', function () {
    expect(wrapper.find(SpacedHeading).children().text()).to.equal(en.ConfusedWith.confused)
  })

  it('should render the appropriate StyledDropButtons', function () {
    const dropButtons = wrapper.find(StyledDropButton)
    expect(dropButtons).to.have.lengthOf(2)
    expect(dropButtons.at(0).props().label).to.equal('Eland')
    expect(dropButtons.at(1).props().label).to.equal('Hartebeest')
  })
})
