import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import FieldGuideButton, { ButtonLabel } from './FieldGuideButton'
import { FieldGuideFactory, FieldGuideMediumFactory } from '../../../../../../../test/factories'

const medium = FieldGuideMediumFactory.build()
const items = [
  {
    title: 'Cat',
    icon: medium.id,
    content: 'lorem ipsum'
  },
  {
    title: 'Dog',
    content: 'Foo bar'
  },
  { title: 'Iguana', content: 'hello' },
  { title: 'Koala', content: '' },
  { title: 'Dragon', content: 'Why is this here?' }
]
const fieldGuide = FieldGuideFactory.build({ items })
const fieldGuideWithoutItems = FieldGuideFactory.build()

describe('Component > FieldGuideButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideButton.wrappedComponent
        fieldGuide={fieldGuide}
        setModalVisibility={() => {}}
      />)
    expect(wrapper).to.be.ok()
  })

  it('should disable the button if there isn\'t a field guide', function () {
    const wrapper = shallow(
      <FieldGuideButton.wrappedComponent
        setModalVisibility={() => { }}
      />)
    expect(wrapper.props().disabled).to.be.true()
  })

  it('should disable the button if the field guide doesn\'t have items', function () {
    const wrapper = shallow(
      <FieldGuideButton.wrappedComponent
        fieldGuide={fieldGuideWithoutItems}
        setModalVisibility={() => { }}
      />)
    expect(wrapper.props().disabled).to.be.true()
  })

  it('should enable the button if the field guide has items', function () {
    const wrapper = shallow(
      <FieldGuideButton.wrappedComponent
        fieldGuide={fieldGuide}
        setModalVisibility={() => { }}
      />)
    expect(wrapper.props().disabled).to.be.false()
  })

  it('should render a ButtonLabel for the label', function () {
    const wrapper = shallow(
      <FieldGuideButton.wrappedComponent
        fieldGuide={fieldGuide}
        setModalVisibility={() => { }}
      />)

    expect(wrapper.props().label.type).to.equal(ButtonLabel)
  })

  it('should call setModalVisibility on click', function () {
    const setModalVisibilitySpy = sinon.spy()
    const wrapper = shallow(
      <FieldGuideButton.wrappedComponent
        fieldGuide={fieldGuide}
        setModalVisibility={setModalVisibilitySpy}
      />)

    wrapper.simulate('click')
    expect(setModalVisibilitySpy).to.have.been.calledOnceWith(true)
  })

  describe('Component > ButtonLabel', function () {
    it('should render without crashing', function () {
      const wrapper = shallow(<ButtonLabel />)
      expect(wrapper).to.be.ok()
    })
  })
})
